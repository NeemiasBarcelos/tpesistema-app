import { authenticateUser } from '@/src/services/auth/authenticate-user'
import type { NextApiRequest, NextApiResponse } from 'next'

import { z } from 'zod'

const authenticateBodySchema = z.object({
  email: z.string().email({ message: 'Informe um e-mail válido.' }),
  password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const parseResult = authenticateBodySchema.safeParse(req.body)

  if (!parseResult.success) {
    return res.status(400).json({
      error: 'Erro de validação',
      issues: parseResult.error.flatten().fieldErrors,
    })
  }

  const { email, password } = parseResult.data

  try {
    const user = await authenticateUser(email, password)

    return res.status(200).json({ user })
  } catch (err: any) {
    console.error('❌ Erro na autenticação:', err)
    return res.status(401).json({ error: err.message || 'Não autorizado' })
  }
}
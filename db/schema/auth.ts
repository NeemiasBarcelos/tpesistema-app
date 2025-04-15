import { z } from 'zod'

export const authenticateBodySchema = z.object({
  email: z.string().email({ message: 'Informe um email válido.' }),
  password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres.' }),
})

export type AuthenticateBody = z.infer<typeof authenticateBodySchema>

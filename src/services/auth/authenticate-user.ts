import { db } from '@/db/connection'
import { eq } from 'drizzle-orm'
import { compare } from 'bcryptjs'
import { users } from '@/db/schema/users'

export async function authenticateUser(email: string, password: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email))
  
  if (!user) {
    throw new Error('Usuário não encontrado')
  }

  const isPasswordValid = await compare(password, user.passwordHash!)

  if (!isPasswordValid) {
    throw new Error('Senha incorreta')
  }

  return {
    username: user.username,
    role: user.role,
    avatarUrl: user.avatarUrl ?? 'https://source.unsplash.com/100x100/?avatar',
  }
}
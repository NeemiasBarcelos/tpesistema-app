import { db } from './connection'
import { users } from './schema/users'
import { hashPassword } from '@/lib/handle-password-hash'
import { eq } from 'drizzle-orm'

async function seed() {
  try {
    const [existing] = await db.select().from(users).where(eq(users.email, 'admin@gmail.com'))

    if (existing) {
      console.log('ℹ️ Usuário admin já existe. Nenhuma ação foi tomada.')
      process.exit(0)
    }

    const hashedPassword = await hashPassword('123456')

    await db.insert(users).values({
      username: 'Admin',
      email: 'admin@gmail.com',
      passwordHash: hashedPassword,
      role: 'admin',
    })

    console.log('✅ Usuário Admin criado com sucesso!')
  } catch (error) {
    console.error('❌ Erro ao inserir usuário:', error)
  } finally {
    process.exit(0)
  }
}

seed()
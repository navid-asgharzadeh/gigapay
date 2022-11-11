import { Member, Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../utility/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Member | { error: string }>
) {
  if (req.method === 'POST') {
    const { name, email, country, phone } = req.body
    if (!email) return res.status(400).json({ error: 'Email is required' })

    try {
      const member = await prisma.member.create({
        data: {
          name,
          email,
          country,
          phone,
        },
      })

      return res.status(200).json(member)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          return res.status(400).json({ error: 'Email already exists' })
        }
      }
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

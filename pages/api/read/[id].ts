import { Member } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utility/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Member | { error: string }>
) {
  const { id } = req.query as { id: string }

  if (req.method === 'GET') {
    try {
      const member = await prisma.member.findUnique({
        where: {
          id,
        },
      })
      if (!member) return res.status(404).json({ error: 'Member not found' })
      return res.status(200).json(member)
    } catch (error) {
      return res.status(500).json({ error: "Couldn't get member" })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

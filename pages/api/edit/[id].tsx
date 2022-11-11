import { Member } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteEmptyKeys } from 'utility/deleteEmptyKeys'
import { prisma } from '../../../utility/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Member | { error: string }>
) {
  const { id } = req.query as { id: string }

  const data = deleteEmptyKeys(req.body)

  if (req.method === 'PUT') {
    const member = await prisma.member.update({
      where: {
        id,
      },
      data,
    })

    if (!member) {
      return res.status(400).json({ error: 'Something went wrong' })
    }

    return res.status(201).json(member)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

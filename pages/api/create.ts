// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MemberProps } from '../../utility/Interface'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MemberProps>
) {
  console.log(req)
  res.status(200).json(req.body)
}

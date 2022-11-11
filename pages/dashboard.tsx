import { Member } from '@prisma/client'
import Dashboard from 'components/Dashboard'
import { prisma } from '../utility/db'

function dashboard({ members }: { members: Member[] }) {
  return <Dashboard members={members} />
}

export async function getServerSideProps() {
  const members = await prisma.member.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
  return {
    props: {
      members: JSON.parse(JSON.stringify(members)),
    },
  }
}

export default dashboard

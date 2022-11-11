import { Member } from '@prisma/client'
import SingleMember from 'components/SingleMember'
import { prisma } from '../../utility/db'

function singleMember({ member }: { member: Member }) {
  return <SingleMember {...member} />
}

export async function getServerSideProps({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const member = await prisma.member.findUnique({
    where: {
      id,
    },
  })

  return {
    props: {
      member: JSON.parse(JSON.stringify(member)),
    },
  }
}

export default singleMember

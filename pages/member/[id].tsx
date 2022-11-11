import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import SingleMember from 'components/SingleMember'
import { useRouter } from 'next/router'
import { getMember } from 'utility/apiCalls'
import { prisma } from '../../utility/db'

function MySingleMember() {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { data: member } = useQuery({
    queryKey: ['member'],
    queryFn: () => getMember(id),
  })

  return <SingleMember {...member!} />
}

export async function getServerSideProps({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const member = () =>
    prisma.member.findUnique({
      where: {
        id,
      },
    })

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['member'], member)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default MySingleMember

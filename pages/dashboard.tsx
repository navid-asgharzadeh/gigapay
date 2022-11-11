import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import Dashboard from 'components/Dashboard'
import { getAllMembers } from 'utility/apiCalls'
import { prisma } from '../utility/db'

function MyDashboard() {
  const { data: members } = useQuery({
    queryKey: ['members'],
    queryFn: getAllMembers,
  })

  return <Dashboard members={members!} />
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  const members = () => prisma.member.findMany()

  await queryClient.prefetchQuery(['members'], members)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default MyDashboard

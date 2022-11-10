import Login from 'components/Login'

import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Gigapay code challenge</title>
        <meta
          name="description"
          content="This is a code challenge for Gigapay"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Login />
    </div>
  )
}

export default Home

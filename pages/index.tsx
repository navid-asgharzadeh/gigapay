import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gigapay code challenge</title>
        <meta
          name="description"
          content="This is a code challenge for Gigapay"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Hello from Gigapay</h1>
    </div>
  )
}

export default Home

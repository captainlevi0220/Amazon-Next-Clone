import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import ProductFeed from '../components/ProductFeed'

function Home({ products }) {
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      {/* HEADER */}
      <Header />

      <main className='max-w-screen-2xl mx-auto'>
        <Banner />

        <ProductFeed products={products} />
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch('https://fakestoreapi.com/products')
  const products = await res.json()

  return {
    props: { products },
  }
}

export default Home

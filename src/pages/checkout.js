import React from 'react'
import Header from '../components/Header'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { selectItems } from '../slices/basketSlice'
import CheckoutProduct from '../components/CheckoutProduct'
import Currency from 'react-currency-formatter'

function Checkout() {
  const items = useSelector(selectItems)
  return (
    <div className='bg-gray-100'>
      <Header />

      <main className='lg:flex max-w-screen-2xl mx-auto'>
        {/* Left  */}
        <Image
          src='https://links.papareact.com/ikj'
          width={1020}
          height={250}
          objectFit='contain'
        />

        <div className='flex flex-col p-5 space-y-10 bg-white'>
          <h1 className='text-3xl border-b pb-4'>Your Shopping Basket</h1>
          {items.length === 0
            ? 'Your Amazon basket is empty.'
            : 'Shopping Basket'}

          {items.map((item, i) => (
            <CheckoutProduct
              key={i}
              id={item.id}
              title={item.title}
              rating={item.rating}
              price={item.price}
              description={item.description}
              category={item.category}
              image={item.image}
              hasPrime={item.hasPrime}
            />
          ))}
        </div>
        {/* Right  */}
        <div></div>
      </main>
    </div>
  )
}

export default Checkout

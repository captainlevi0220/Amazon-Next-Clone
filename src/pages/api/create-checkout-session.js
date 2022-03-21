const secretKey = `${process.env.STRIPE_SECRET_KEY}`
const stripe = require('stripe')(secretKey)

async function CreateStripeSession(req, res) {
  //
  //
  const { items, email } = req.body

  const transformedItems = items.map((item) => ({
    description: item.description,
    quantity: 1,
    price_data: {
      currency: 'usd',
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }))

  const successURL = `${process.env.HOST}/success`
  const cancelURL = `${process.env.HOST}/checkout`
  const stringifiedImages = JSON.stringify(items.map((item) => item.image))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_rates: ['shr_1KfmEOF8AcROOH4DjTDYfffX'],
    shipping_address_collection: {
      allowed_countries: ['GB', 'US', 'CA'],
    },
    line_items: transformedItems,
    mode: 'payment',
    success_url: successURL,
    cancel_url: cancelURL,
    metadata: {
      email,
      images: stringifiedImages,
    },
  })

  res.status(200).json({ id: session.id })
}

export default CreateStripeSession

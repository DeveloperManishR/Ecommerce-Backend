import Stripe from "stripe";
import userModel from "../../models/User/user.model.js";
import { successResponseWithData } from "../../helpers/apiResponse.js";

const stripe = new Stripe(
  "sk_test_51R76PKFRg7lrnDfloUGzBYNlIF7laQNVTfhdQzA0cY15xbOq1Afl14qCK3eOuvuu57S1LIHuIcI7bTPemWEM5tjf00ximWz1x8"
);
const YOUR_DOMAIN = "http://localhost:5173";

const product = [
  {
    description: "High-quality noise-canceling headphones with Bluetooth 5.0",
    price: 150,
    quantity: 1,
  },
  {
    description: "Adjustable aluminum stand for smartphones and tablets",
    price: 20,
    quantity: 2,
  },
  {
    description: "Water-resistant neoprene laptop sleeve with a soft interior",
    price: 25,
    quantity: 1,
  },
];
/*
export const checkoutSession = async (req, res) => {
  const userid = req.userid;

  try {
    const getUserDetails = await userModel.findById(userid);
    if (!getUserDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    let stripeCustomerId = getUserDetails.customerId;

    if (!stripeCustomerId) {
      const stripeCustomer = await stripe.customers.create({
        email: getUserDetails.email,
        name: `${getUserDetails.fname} ${getUserDetails.lname}`,
        address: {
          line1: '123 Main St',
          line2: 'Apt 456',
          city: 'Sample City',
          state: 'SC',
          postal_code: '12345',
          country: 'US',
        },
        shipping: {
          name: `${getUserDetails.fname} ${getUserDetails.lname}`,
          address: {
            line1: '123 Main St',
            line2: 'Apt 456',
            city: 'Sample City',
            state: 'SC',
            postal_code: '12345',
            country: 'US',
          },
        },
      });
      getUserDetails.customerId = stripeCustomer.id;
      stripeCustomerId = stripeCustomer.id;
      await getUserDetails.save();
    }

    const totalAmount = product.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
      customer: stripeCustomerId,
      description: 'Payment for order from Counselling Conversations',
      automatic_payment_methods: { enabled: true },
      metadata: { userId: userid },
    });

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items: product.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.description,
            description: item.description,
            images: ['https://via.placeholder.com/150'],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    res.send({ clientSecret: paymentIntent.client_secret, checkoutUrl: session.url });
  } catch (error) {
    console.error("Error creating Stripe customer or session:", error);
    res.status(500).json({ message: "Error processing checkout", error: error.message });
  }
};
*/

export const checkoutSession = async (req, res) => {
  const userid = req.userid;
  try {
    const { product, totalAmount } = req.body;

    // console.log("productsdsd",product)

    const getUserDetails = await userModel.findById(userid);

    let stripeCustomerId = getUserDetails?.customerId;

    if (!stripeCustomerId) {
      const stripeCustomer = await stripe.customers.create({
        email: getUserDetails.email,
        name: `${getUserDetails.fname} ${getUserDetails.lname}`,
        phone: getUserDetails.phoneno,
      });
      getUserDetails.customerId = stripeCustomer.id;
      stripeCustomerId = stripeCustomer.id;
      await getUserDetails.save();
    }

    const extractingItems = await product.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.title,
          description: item.product.description,
          images: item.product.images,
        },
        unit_amount: Math.round(item.product.price * 100), // ✅ Fixed here
      },
      quantity: item.quantity,
    }));
    

  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: extractingItems,
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/canceled`,
      // metadata:{
      //   getUserDetails?.email,
      // }
    });

    return successResponseWithData(
      res,
      "Checkout Session Created Sucessfully",
      session.id
    );

    
  } catch (error) {
    console.log(error);
  }
};

import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./config/index.js";
import allRoutes from "./routes/index.js";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
dotenv.config();

ConnectDB();
const app = express();
app.use(express.json());
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
//app.use(bodyParser.urlencoded({ extended: false }));
const endpointSecret = "whsec_b5eb13648ba2bc1cd8a716681d242feab6bdb82ca4713594157329e68be6d0bb";

app.use(express.urlencoded({ extended: false, limit: 1000 }));
app.use(cors("*"));
app.use(express.raw({type: 'application/json'}))

app.use("/api", allRoutes);
app.use('/public', express.static("public"));

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  let event = request.body;

  console.log("eveerere",event)
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

// app.listen(process.env.PORT, () => {
//   console.log(`app is Listen on ${process.env.PORT}`);
// });

app.get("/", (req, res) => {
  res.send(`<h1>Server is running on Port ${process.env.PORT}</h1>`);
});
export default app
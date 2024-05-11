// Inside app.js
const express = require("express");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
// This razorpayInstance will be used to
// access any resource from razorpay

dotenv.config();
const razorpayInstance = new Razorpay({
  // Replace with your key_id
  key_id: process.env.RAZORPAY_KEY,

  // Replace with your key_secret
  key_secret: process.env.RAZORPAY_SECRET,
});
const app = express();
const PORT = process.env.PORT || "5000";
app.use(express.static("public"));
// Here we will create two routes one
// /createOrder and other /verifyOrder
// Replace these comments with the code
// provided later in step 2 & 8 for routes
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log("Server is Listening on Port ", `http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.render("razorpay");
});

app.post("/create-order", async (req, res) => {
  try {
    console.log("working or not in server side");
    // STEP 1:
    const { amount } = req.body;
  
    const currency = "INR"; // Indian Rupee
   const receipt = "ORD_1234567890"; // Example receipt ID
    const notes = { "description": "New order", "customer": "John Doe" }; // Example notes
    
    // STEP 2:
    const order = await razorpayInstance.orders.create({
      amount,
      currency,
      receipt,
      notes,
    });
    console.log(order);

    // STEP 3 & 4:
    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



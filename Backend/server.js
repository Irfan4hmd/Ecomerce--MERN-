const express=require('express');
const path=require('path');
const app=express();
const cookieparser= require('cookie-parser');
const cors=require('cors')
const order=require('./routes/order')
const products= require('./routes/product');
const bodyparser= require('body-parser')
const cloudinary= require('cloudinary')
const fileUpload= require('express-fileupload')
const review=require('./routes/review')

const connectdb = require('./config/db')
const hostname = '127.0.0.1';
const port = 4000;
const newroute = require('./routes/newroute')
const errorMiddleware = require('./middlewares/error');
const auth = require('./routes/auth')
const stripe=require('stripe')("sk_test_51LMx3DL1YzgC3DzGR0vEpIZyJoxoxDBTEKh7HbBXNdpCDC5x5eBKsAROo0JaaLopcLe73qmVFr6riQ93TQOR5JGc00cAnQHCOd")

process.on('uncaughtException',err=>{
  console.log(`Error:${err.stack}`);
 console.log('Shutting down server due to uncaught exceptions');
 process.exit(1); 
})

app.use(cors({ origin: true }));
const server = app.listen(process.env.PORT || 4000,  () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});
process.on('unhandledRejection',err=>{
  console.log(`Error:${err.message}`);
  console.log("shutting down the server due to unhandled promise rejections")
  server.close(()=>{
    process.exit(1);
  })
})
const dotenv = require('dotenv');
app.use(express.json({limit: '50mb'}));

app.use(bodyparser.urlencoded({extended:true}))
app.use(cookieparser())
app.use(fileUpload());
cloudinary.config({
  cloud_name: 'mohdevah',
  api_key: '762624449369437',
  api_secret: 'RRAqRRKRIM6qZiDeFB8F6v46EL0'
})
dotenv.config({path:'ecommerce-back/backend/config/config.env'});
connectdb();


app.use('/api/v1',auth)
app.use('/api/v1',products)
app.use('/api/v1',order)
app.use('/api/v1',review)
app.use('/api/v1',newroute)

app.use(errorMiddleware)
if (process.env.NODE_ENV === 'production') {  
  app.use(express.static(path.join(__dirname, "/public")));
  app.get("/", (_, res) => {
    res.setHeader("Access-Control-Allow-Credentials","true");
   res.send("Backned Running");
  });
}
app.post('/payments/create',async(request,response)=>{
  const total= request.query.total;

  const paymentIntent = await stripe.paymentIntents.create({
      amount:total,
      currency: "usd",
  })

  response.status(201).send({
      clientsecret: paymentIntent.client_secret,
      paymentIntent: paymentIntent
  })
  
})

import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import {notFound, errorHandler} from './middlewares/errorMiddleware.js'
import morgan from 'morgan'


dotenv.config();

const app = express();
app.use(express.json());//系统提供的中间件，解析发送过来的json文件
app.use(morgan("dev"));

connectDB();

app.get('/', (req,res)=>{
    res.send('API is running!');
})
const PORT = process.env.PORT || 5000;

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);

app.get('/api/config/paypal',(req,res)=>
    res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use(notFound);

app.use(errorHandler);

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
  );

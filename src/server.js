import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

//Middleware
import { connectDB } from './config/database.js';
import errorHandler from './middlewares/error-handler.middleware.js';
// import { form } from './libs/fileupload.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(form);
//Routes
import routerPayment from './routes/payment.js';
import file from './routes/fileupload.js';
import routerToPayment from './routes/topayment.js';
import drinkRouter from './routes/drinks.js';
import milliyRoute from './routes/milliyFoods.js';
import orderRouter from './routes/order.js';
import pizzaRouter from './routes/pizzas.js';
import saladRouter from './routes/salads.js';
import authRouter from './routes/auth.js';

app.use('/api/payment', routerPayment);
app.use('/api/file', file);
app.use('/api/to/payment', routerToPayment);
app.use('/api/drink', drinkRouter);
app.use('/api/milliyFood', milliyRoute);
app.use('/api/pizza', pizzaRouter);
app.use('/api/salad', saladRouter);
app.use('/api/order', orderRouter);
app.use('/api/auth', authRouter);

app.use(errorHandler);
const PORT = process.env.PORT || 3000;

connectDB();
app.listen(PORT, () => console.log(`Server started on the port ${PORT}`));

import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Connection string for MongoDB Atlas
const connectionString = process.env.MongoDB_Url;
mongoose.connect(connectionString)
.then(() =>
{
    console.log("Database connected Successfully !");
})
.catch(() =>
{
    console.log("Database connection failed !");
})

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api/users', userRouter);



// Middleware to verify JWT token for protected routes
app.use((req, res, next) =>
{
    let token = req.headers['authorization'];

    if (token == null) {
        res.json({ message: "Token not found!" });
        return;
    }

    token = token.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>
    {
        if(!decoded)
        {
            res.json({ message: "Unauthorized Access !" });
            return;
        }

        req.user = decoded;
        next();
    })
})

app.use('/api/products', productRouter);

// Start the server
app.listen(3000, () =>{
        console.log("Server is Running on port 3000 !");
});
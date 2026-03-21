import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';


const app = express();

// Connection string for MongoDB Atlas
const connectionString = "";
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

app.use('/users', userRouter);



// Middleware to verify JWT token for protected routes
app.use((req, res, next) =>
{
    let token = req.headers['authorization'];

    if (token == null) {
        res.json({ message: "Token not found!" });
        return;
    }

    token = token.replace("Bearer ", "");

    jwt.verify(token, "jwt secret", (err, decoded) =>
    {
        if(decoded == null)
        {
            res.json({ message: "Unauthorized Access !" });
            return;
        }
        else
        {
            req.user = decoded;
            next();
        }
    })
})

app.use('/products', productRouter);

// Start the server
app.listen(3000, () =>{
        console.log("Server is Running on port 3000 !");
});
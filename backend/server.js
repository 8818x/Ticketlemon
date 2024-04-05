import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Database Connected');
    })
    .catch((err) => {
        console.log(err.message);
    });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});


const port = process.env.PORT || 9002;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
})
const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser');

const date = new Date();
const gmtPlus7 = date.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });

dotenv.config();

const app = express();


app.use(bodyParser.json());


app.use(cors());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Database Connected');
    })
    .catch((err) => {
        console.log(err.message);
    });

// Create a schema for your data
const purchaseSchema = new mongoose.Schema({
    description: {
        account: { type: String },
        tkid: { type: Number },
        ocid: { type: Number },
        name: { type: String },
        seat: { type: Number },
        cost: { type: Number },
        date: { type: String },
        time: { type: String },
        location: { type: String },
        image: { type: String }
    },
    paidAt: { type: String },
}, {
    timestamps: true,
});

// Create a model based on the schema
const Purchase = mongoose.model('Purchase', purchaseSchema);

// API endpoint to handle POST request for saving data
app.post('/api/purchases', async (req, res) => {
    try {
        if (!req.body || !req.body.description) {
            return res.status(400).send('Invalid request body');
        }

        const newPurchase = new Purchase({
            description: req.body.description,
            paidAt: gmtPlus7
        });
        // Save the new purchase to MongoDB
        await newPurchase.save();
        res.status(201).json(newPurchase);
    } catch (error) {
        console.error('Error saving purchase:', error);
        res.status(500).send('Error saving purchase');
    }
});

app.get('/api/purchases/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid receipt ID' });
    }
    try {
        const purchase = await Purchase.findById(req.params.id);
        if (!purchase) {
            return res.status(404).json({ error: 'Receipt not found' });
        }
        res.json(purchase);
    } catch (error) {
        console.error('Error fetching receipt data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

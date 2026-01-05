const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({ path: '../.env' }); // Load from root .env

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const { generateWorkoutPlan } = require('./workoutLogic');
const { generateDietPlan } = require('./dietLogic');

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.post('/ai/workout-plan', (req, res) => {
    try {
        const plan = generateWorkoutPlan(req.body);
        res.json(plan);
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate plan' });
    }
});

app.post('/ai/diet-plan', (req, res) => {
    try {
        const plan = generateDietPlan(req.body);
        res.json(plan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate diet plan' });
    }
});

const Razorpay = require('razorpay');

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_1DP5mmOlF5G5ag',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 's41414324124214',
});

app.post('/create-order', async (req, res) => {
    try {
        const options = {
            amount: req.body.amount * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_" + Math.random().toString(36).substring(7),
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error(error);
        // Mock response if keys are invalid for demo
        res.json({
            id: "order_mock_" + Math.random().toString(36).substring(7),
            currency: "INR",
            amount: req.body.amount * 100
        });
    }
});

app.post('/verify-payment', (req, res) => {
    res.json({ status: 'success' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

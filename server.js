require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');                    // for DB
const nodemailer = require('nodemailer');                  // help for email notify
const FailedRequest = require('./models/FailedRequest');     // import module   
const metricsRoute = require('./routes/metrics');          // import from route


const app = express();
app.use(bodyParser.json());


// Connection to DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("connected to MongoDB" ))
.catch(err => console.log("MongoDB connection error:", err ));


const TIME_WINDOW = 10 * 60 * 1000; // 10 minutes
const FAILURE_THRESHOLD = 5;
const failedAttempts = {}; // Fixed variable name


app.post('/api/submit', async (req, res) => {
    const ip = req.ip;
    const{ headers } = req;
    const validToken = process.env.ACCESS_TOKEN;

    if (!headers['x-access-token'] || headers['x-access-token'] !== validToken) {
        const reason = !headers['x-access-token'] ? "Missing token" : "Invalid token";

        // Log failed attempt in DB
        await FailedRequest.create({ ip, timestamp: new Date(), reason });

        // Track failed attempts
        if (!failedAttempts[ip]) failedAttempts[ip] = [];
        failedAttempts[ip].push(Date.now());
        failedAttempts[ip] = failedAttempts[ip].filter(time => Date.now() - time < TIME_WINDOW);

        // Trigger alert if threshold exceeded
        if (failedAttempts[ip].length >= FAILURE_THRESHOLD) {
            sendAlert(ip, failedAttempts[ip].length);
            failedAttempts[ip] = []; // Reset counter after alert
        }

        return res.status(400).json({ error: reason });
    }

    res.status(200).json({ message: "Request successful" });
});

// for alert email
async function sendAlert(ip, attempts) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.ALERT_EMAIL,
        subject: `Alert: High Failed Requests from ${ip}`,
        text: `The IP ${ip} has made ${attempts} failed attempts in the last ${TIME_WINDOW / 60000} minutes.`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Alert email sent to ${process.env.ALERT_EMAIL}`);
    } catch (err) {
        console.error("Error sending email:", err);
    }
}

// Metrics endpoint
app.use('/api/metrics', metricsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
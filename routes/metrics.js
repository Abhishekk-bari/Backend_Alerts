const express = require('express');
const FailedRequest = require('../models/FailedRequest');
const router = express.Router();

// Fetch metrics
router.get('/', async (req, res) => {
    try {
        const metrics = await FailedRequest.find();
        res.status(200).json(metrics);
    } catch (err) {
        res.status(500).json({ error: "Error fetching metrics" });
    }
});

module.exports = router;

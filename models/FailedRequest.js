const mongoose = require('mongoose');

const failedRequestSchema = new mongoose.Schema({
    ip: String,
    timestamp: Date,
    reason: String
});

module.exports = mongoose.model('FailedRequest', failedRequestSchema);

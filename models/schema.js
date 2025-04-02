import mongoose from 'mongoose';

const EmailOpenSchema = new mongoose.Schema({
    emailId: String,
    ip: String,
    userAgent: String,
    location: Object,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.EmailOpen || mongoose.model('EmailOpen', EmailOpenSchema);

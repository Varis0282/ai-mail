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
}, { timestamps: true });


const emailSchema = new mongoose.Schema({
    emailId: String,
    subject: String,
    body: String,
    recipient: String
}, { timestamps: true });

export const EmailOpen = mongoose.models.EmailOpen || mongoose.model('EmailOpen', EmailOpenSchema);
export const Email = mongoose.models.Email || mongoose.model('Email', emailSchema);

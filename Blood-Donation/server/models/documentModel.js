import mongoose from "mongoose";

const documentSchema = mongoose.Schema(
    {
        month: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

export const Donation = mongoose.model('Donation',documentSchema);

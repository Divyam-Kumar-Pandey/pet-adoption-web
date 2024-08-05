import mongoose from "mongoose";

const petListingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: false,
    },
    breed: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    imgURL: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
});

const PetListing = mongoose.model("PetListing", petListingSchema);

export default PetListing;
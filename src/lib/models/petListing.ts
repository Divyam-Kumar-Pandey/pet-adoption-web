import {Schema, model, models} from 'mongoose';

const petListingSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    type: {
        type: String,
        required: [true, "Type is required"],
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
        required: [true, "Location is required"],
    },
    contact: {
        type: String,
        required: [true, "Contact is required"],
    },
    createdAt: { type: Date, default: Date.now },
});

const PetListing = models.PetListing || model("PetListing", petListingSchema);

export default PetListing;
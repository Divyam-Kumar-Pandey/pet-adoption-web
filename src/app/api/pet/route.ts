import connect from "@/lib/db";
import PetListing from "@/lib/models/petListing";
import { checkAuth } from "@/lib/services/auth";

export async function GET(req: Request) {
    if (checkAuth(req) === false) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        await connect();
    } catch (e) {
        return new Response("Error connecting to MongoDB", { status: 500 });
    }

    const params = new URL(req.url).searchParams;
    const breed = params.get("breed");
    const type = params.get("type");
    const location = params.get("location");
    const age = parseInt(params.get("age") || "-1");

    // Get all pet listings
    const petListings = await PetListing.find();
    let filteredPetListings = petListings;
    if (!petListings) {
        return new Response("No pet listings found", { status: 404 });
    }
    if (breed) {
        filteredPetListings = filteredPetListings.filter((petListing) => petListing.breed === breed);
    }
    if (type) {
        filteredPetListings = filteredPetListings.filter((petListing) => petListing.type === type);
    }
    if (location) {
        filteredPetListings = filteredPetListings.filter((petListing) => petListing.location === location);
    }
    if (age !== -1) {
        filteredPetListings = filteredPetListings.filter((petListing) => petListing.age === age);
    }
    return new Response(JSON.stringify(filteredPetListings), { status: 200 });
}

export async function POST(req: Request) {
    if (checkAuth(req) === false) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        await connect();
    } catch (e) {
        return new Response("Error connecting to MongoDB", { status: 500 });
    }

    /*
          Sample request body:
          {
              "name": "Fluffy",
              "type": "Cat",
              "age": 3,
              "breed": "Siamese",
              "description": "A very fluffy cat",
              "imgURL": "https://example.com/fluffy.jpg",
              "location": "New York, NY",
              "contact": "1234567890",
          }
      */

    const data = await req.json();

    // validate the request body
    if (!data.name || !data.type || !data.location || !data.contact) {
        return new Response("Name, type, location, and contact are required", { status: 400 });
    }

    // Check if the pet listing already exists
    const existingPetListing = await PetListing.findOne({ name: data.name, type: data.type, location: data.location, contact: data.contact });

    if (existingPetListing) {
        return new Response("Pet listing already exists", { status: 409 });
    }

    // Check if the age is a number
    if (data.age && isNaN(data.age)) {
        return new Response("Age must be a number", { status: 400 });
    }

    try {
        const petListing = new PetListing(data);
        await petListing.save();
        return new Response("Pet listing created", { status: 201 });
    } catch (e) {
        return new Response(`Error creating pet listing: ${e}`, { status: 500 });
    }
}

import connect from "@/lib/db";
import PetListing from "@/lib/models/petListing";

export default async function GET(req: Request) {
    await connect();

    const params = new URL(req.url).searchParams;
    const breed = params.get("breed");
    const type = params.get("type");
    const location = params.get("location");
    const age = parseInt(params.get("age") || "-1");


    
    // Get all pet listings
    const petListings = await PetListing.find();
    let filteredPetListings = petListings;
    if(!petListings) {
        return new Response("No pet listings found", { status: 404 });
    }
    if(breed) {
        filteredPetListings = filteredPetListings.filter(petListing => petListing.breed === breed);
    }
    if(type) {
        filteredPetListings = filteredPetListings.filter(petListing => petListing.type === type);
    }
    if(location) {
        filteredPetListings = filteredPetListings.filter(petListing => petListing.location === location);
    }
    if(age !== -1) {
        filteredPetListings = filteredPetListings.filter(petListing => petListing.age === age);
    }
    return new Response(JSON.stringify(filteredPetListings), { status: 200 });
}

export async function POST(req: Request) {
    await connect();

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

    // Create a new pet listing
    const petListing = new PetListing(data);

    await petListing.save();

    return new Response("Pet listing created", { status: 201 });

    return 
}
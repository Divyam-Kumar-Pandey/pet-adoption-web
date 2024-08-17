# Pet Listing API

## Get Pet Listings

Retrieve a list of pet listings, optionally filtered by breed, type, location, or age.

### Request

- **Method:** GET
- **URL:** `/api/pet?breed=<breed>&type=<type>&location=<location>&age=<age>`
- **Headers:**
  - API_KEY: `<api_key>`
- **Query Parameters (Optional):**
  - `breed`: Filter by the breed of the pet.
  - `type`: Filter by the type of pet (e.g., Cat, Dog).
  - `location`: Filter by the location where the pet is listed.
  - `age`: Filter by the age of the pet.

### Response

- **Status: 200 OK**
- **Body:**
  ```json
  [
    {
      "_id": "unique-pet-id",
      "name": "Fluffy",
      "type": "Cat",
      "age": 3,
      "breed": "Siamese",
      "description": "A very fluffy cat",
      "imgURL": "https://example.com/fluffy.jpg",
      "location": "New York, NY",
      "contact": "1234567890",
      "createdAt": "2024-08-14T00:00:00.000Z",
      "updatedAt": "2024-08-14T00:00:00.000Z",
      "__v": 0
    },
    ...
  ]
  ```

### Error Responses

- **Unauthorized Access**
  - **Status: 401 Unauthorized**
  - **Body:**
    ```text
    Unauthorized
    ```

- **No Pet Listings Found**
  - **Status: 404 Not Found**
  - **Body:**
    ```text
    No pet listings found
    ```

- **Database Connection Error**
  - **Status: 500 Internal Server Error**
  - **Body:**
    ```text
    Error connecting to MongoDB
    ```

### Code Overview

The code defines an asynchronous GET request handler to retrieve a list of pet listings with optional filtering.

1. The `checkAuth` function verifies the user's authentication based on the API KEY in the request headers.
2. If authentication fails, a 401 Unauthorized response is returned.
3. A connection to the MongoDB database is established.
4. The code retrieves all pet listings from the `PetListing` collection.
5. Optional filters (breed, type, location, age) are applied to the list of pet listings.
6. The filtered list of pet listings is returned in the response.
7. Appropriate error responses are returned for unauthorized access, no pet listings found, or database connection issues.

---

## Create Pet Listing

Create a new pet listing.

### Request

- **Method:** POST
- **URL:** `/api/pet`
- **Headers:**
  - API_KEY: `<api_key>`
- **Body:**
  ```json
  {
    "name": "Fluffy",                           (required)
    "type": "Cat",                              (required)         
    "age": 3,                                   (optional)
    "breed": "Siamese",                         (optional)
    "description": "A very fluffy cat",         (optional)
    "imgURL": "https://example.com/fluffy.jpg", (optional)
    "location": "New York, NY",                 (required)
    "contact": "1234567890"                     (required)
  }
  ```

### Response

- **Status: 201 Created**
- **Body:**
  ```text
  Pet listing created
  ```

### Error Responses

- **Unauthorized Access**
  - **Status: 401 Unauthorized**
  - **Body:**
    ```text
    Unauthorized
    ```

- **Validation Error**
  - **Status: 400 Bad Request**
  - **Body:**
    ```text
    Name, type, location, and contact are required
    ```
  - **Another 400 Response:**
    ```text
    Age must be a number
    ```

- **Duplicate Listing**
  - **Status: 409 Conflict**
  - **Body:**
    ```text
    Pet listing already exists
    ```

- **Database Connection Error**
  - **Status: 500 Internal Server Error**
  - **Body:**
    ```text
    Error connecting to MongoDB
    ```

- **Server Error**
  - **Status: 500 Internal Server Error**
  - **Body:**
    ```text
    Error creating pet listing: <error details>
    ```

### Code Overview

The code defines an asynchronous POST request handler to create a new pet listing.

1. The `checkAuth` function verifies the user's authentication based on the API KEY in the request headers.
2. If authentication fails, a 401 Unauthorized response is returned.
3. A connection to the MongoDB database is established.
4. The request body is parsed to retrieve the pet listing details.
5. The code validates that the required fields (`name`, `type`, `location`, `contact`) are present.
6. If validation fails, a 400 Bad Request response is returned with an appropriate error message.
7. The code checks if a pet listing with the same name, type, location, and contact already exists.
8. If a duplicate listing is found, a 409 Conflict response is returned.
9. The code validates that the `age` field (if present) is a valid number.
10. If validation passes, a new pet listing is created and saved to the database.
11. The response indicates that the pet listing was successfully created.
12. Appropriate error responses are returned for unauthorized access, validation errors, duplicate listings, database connection issues, or server errors.

---
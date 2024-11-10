const express = require('express');         // Import the Express framework
const { readItems } = require('./files');   // Import the readItems function from files.js

const app = express();                      // Create an instance of the Express application
const PORT = process.env.PORT || 3000;      // Set the port to 3000 or environment variable

// Define a GET /users endpoint to return the list of users
app.get('/users', async (req, res) => {
    try {
        const data = await readItems();     // Use the readItems function to retrieve user data
        res.status(200).json(data);         // Send the data as a JSON response with a 200 OK status
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve user list." }); // Send a 500 error if read fails
    }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
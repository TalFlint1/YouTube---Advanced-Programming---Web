// server.js

const express = require('express');
const app = express();
const { connectToMongoDB, client } = require('./db'); // Adjust the path as needed

// Middleware and routes setup
app.use(express.json()); // Example middleware for JSON parsing

// Example route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;

async function startServer() {
    await connectToMongoDB(); // Connect to MongoDB before starting the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer();

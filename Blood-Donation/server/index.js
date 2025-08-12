import express from 'express'
import { serverLocalhostPort } from './config.js';

const app = express();

app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Backend Message : Welcome to the Root of your API.')
})

// Your normal routes here...

// Catch-all for unknown routes
app.use((req, res) => {
    res.status(404).json('Server error: Ups! API Route not found. Make sure the URL is correct.');
});

app.listen(serverLocalhostPort, () => {
    console.log(`Backend Message: Your server is running on Localhost Port ${serverLocalhostPort}`);
})
import express from 'express'
import { serverLocalhostPort } from './config.js';
import { connectDB } from './connectDB.js';
import customApiRoutes from './routes/customApiRoutes.js';

import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Backend Message : Welcome to the Root of your API.')
})

// CUSTOM API ROUTES
app.use('/blood-donations',customApiRoutes);

// Your normal routes here...

// Catch-all for unknown routes
app.use((req, res) => {
    res.status(404).json('Server error: Ups! API Route not found. Make sure the URL is correct.');
});

app.listen(serverLocalhostPort, () => {
    console.log(`Backend Message: Your server is running on Localhost Port ${serverLocalhostPort}`);
})
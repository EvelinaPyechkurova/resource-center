const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectToDb } = require('./config/db');
const subjectRoutes = require('./routes/subjectRoutes');
const lessonRoutes  = require('./routes/lessonRoutes');
const userRoutes  = require('./routes/userRoutes');

const server = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

server.use(cors());
server.use(express.json());
server.use('/subjects', subjectRoutes);
server.use('/lessons', lessonRoutes);
server.use('/users', userRoutes);

const startServer = async () => {
    try {
        await connectToDb(MONGO_URI);

        server.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });

    } catch (error) {
        console.error('Failed to start server due to DB connection error:', error);
        process.exit(1); // terminate process if DB fails
    }
};

startServer();
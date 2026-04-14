const mongoose = require('mongoose');

const connectToDb = async (mongoUri) => {
    try {
        await mongoose.connect(mongoUri)
        console.log('Successfully connected to MongoDB!')
        return mongoose.connection;
    } catch (error) {
        console.error(`Error occurred while connecting to MongoDB: ${error}`);
        throw error;
    }
}

module.exports = { connectToDb };
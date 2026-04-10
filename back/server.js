const express = require('express');
const cors = require('cors');
require('dotenv').config();

const server = express();
const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});
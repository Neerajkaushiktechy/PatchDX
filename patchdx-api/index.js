const express = require('express');
const cors = require("cors");
const routes = require("./routes");
const ConnectDb = require("./server");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Parse JSON bodies
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
    res.send('Welcome to My Node API');
});

app.use('/api', routes)
app.listen(PORT, () => {
    ConnectDb();
    console.log(`Server is running on http://localhost:${PORT}`);
});
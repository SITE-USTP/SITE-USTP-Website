const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const imageRoutes = require('./routes/imageRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow all CORS for now, can be restricted to frontend domain later
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', imageRoutes);

app.get('/', (req, res) => {
    res.send('Site USTP Officer Backend Running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

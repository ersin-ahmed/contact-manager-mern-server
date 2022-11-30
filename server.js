const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middlewares/errorMiddleware');
const connectDB = require('./config/db');
const cors = require('cors');
const port = process.env.PORT || 5000;

// Connects to MongoDb Atlas Database
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.use(cors({ origin: true, credentials: true }));

// Routes
// app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRouters'));

app.listen(port, () => console.log(`Listening on port ${port}`));

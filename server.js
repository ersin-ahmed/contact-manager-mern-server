const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middlewares/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

// Connects to MongoDb Atlas Database
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

// Routes
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/users', require('./routes/userRouters'));

app.listen(port, () => console.log(`Listening on port ${port}`));

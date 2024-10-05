require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const connectDB= require('./db');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');

connectDB();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://server-c9rg0g50a-officialbidishas-projects.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // add the methods you need
  allowedHeaders: ['Content-Type', 'Authorization'], // add any custom headers you may use
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/login', loginRoutes);
app.use('/api/register', registerRoutes);

app.use("/", (req, res) => {
  res.send("Server running.");
});

//port
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
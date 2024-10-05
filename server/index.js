require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const connectDB= require('./db');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');

connectDB();
app.use(cors({origin:'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/login', loginRoutes);
app.use('/api/register', registerRoutes);

app.use("/", (req, res) => {
  console.log(req);
  res.send("Server running.");
});

//port
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
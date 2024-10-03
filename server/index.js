require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const connectDB= require('./db');

connectDB();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", (req, res) => {
  res.send("Server running.");
});

// app.use('/api/users', require('./routes/users'));
// app.use('/api/posts', require('./routes/posts'));

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
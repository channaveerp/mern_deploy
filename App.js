const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const router = require('./routers/router');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use(router);

app.get('/', (req, res) => {
  return res.send('Hello World!');
});

// Corsplocy

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`${err} did not connect`);
  });

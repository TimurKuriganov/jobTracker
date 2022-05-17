const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/config');
const PORT = process.env.PORT || 5000;
const ExpressError = require('./utils/expressError');
const { errorHandler } = require('./middleware/errorMiddleware');

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/register', require('./routes/register'));

app.all('*', (req, res, next) => {
  const err = new ExpressError('Page not found', 'error');
  res.status(404);
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server stated on port ${PORT}`);
});

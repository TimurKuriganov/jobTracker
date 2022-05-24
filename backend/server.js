const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/config');
const PORT = process.env.PORT || 5000;
const morgan = require('morgan');
const ExpressError = require('./utils/expressError');
const { errorHandler } = require('./middleware/errorMiddleware');

connectDB();
const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/register', require('./routes/register'));

app.all('*', (req, res, next) => {
  const err =  new ExpressError('Page not found', 404);
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server stated on port ${PORT}`);
});

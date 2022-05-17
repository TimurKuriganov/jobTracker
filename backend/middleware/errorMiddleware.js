const errorHandler = (err, req, res, next) => {
  console.log('err.name', err.name);
  const { status = 'error', message = 'Something went wrong' } = err;
  const statusCode = res.statusCode ? res.statusCode : 500;
  if (err.name === 'TypeError') {
    res.status(statusCode);
    res.json({
      message,
      status,
      errName: err.name
    });
  } else {
    res.status(statusCode);
    res.json({
      message: message,
      status: status,
    });
  }
};

module.exports = { errorHandler };



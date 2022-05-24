const errorHandler = (err, req, res, next) => {
  const { message = 'Something went wrong', statusCode = 500,  } = err;
  if (err.name === 'TypeError') {
    res.status(400);
    res.json({
      message: err.errors.name.message,
      errName: err.name
    });
  } else if (err.name === 'ValidationError') {
    // console.log('err_message', err.errors.name.message)
    res.status(400)
    res.json({ 
      message: `Invalid credentials ${err?.errors?.name?.message}`,
      errName: err.name,
    })
  } else {
    res.status(statusCode);
    res.json({
      message: message,
      errName: 'ExpressError',
    });
  }
};

module.exports = { errorHandler };



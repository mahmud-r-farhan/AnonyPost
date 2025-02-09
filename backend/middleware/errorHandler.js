const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ 
      message: 'Invalid JSON payload',
      error: err.message 
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      error: err.message
    });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
};

module.exports = errorHandler;

/**
 * Global Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  console.error(`[${timestamp}] Internal Error:`, err.stack || err.message);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;

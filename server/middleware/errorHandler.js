function errorHandler(err, _req, res, _next) {
  const status = Number(err?.status || err?.response?.status || 500);
  const message = err?.message || 'Unexpected server error';
  const details = err?.response?.data || null;

  res.status(status).json({
    success: false,
    error: {
      message,
      status,
      details,
    },
  });
}

module.exports = {
  errorHandler,
};

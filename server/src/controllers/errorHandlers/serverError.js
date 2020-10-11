const createError = require('../../utils/createError');

// eslint-disable-next-line no-unused-vars
const serverError = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err);

  const errorMessage = err.statusCode
    ? err
    : createError(
        500,
        'Internal Server Error',
        'Something went wrong, please try again later'
      );

  res.status(err.statusCode || 500).json(errorMessage);
};

module.exports = serverError;

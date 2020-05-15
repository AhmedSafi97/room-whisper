const createError = require('../../utils/createError');

// eslint-disable-next-line no-unused-vars
const serverError = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err);
  const errorResponse = createError(
    500,
    'Internal Server Error',
    'Something went wrong, please try again later'
  );
  res.status(500).json(errorResponse);
};

module.exports = serverError;

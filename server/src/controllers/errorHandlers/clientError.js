const createError = require('../../utils/createError');

const clientError = (req, res) => {
  const errorResponse = createError(404, 'Not Found', 'The page was not found');
  res.status(404).json(errorResponse);
};

module.exports = clientError;

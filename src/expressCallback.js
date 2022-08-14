/**
 * @description expressCallback is an adapter that takes our controllers and turns them into expressjs style callbacks
 * @param {function} fn a controller function that takes req and res as parameters
 * @return {*} HTTP response
 */

const expressCallback = (controller) => async (req, res) => {
  const httpRequest = {
    user: res.locals.user,
    body: req.body,
    query: req.query,
    params: req.params,
    method: req.method,
    path: req.path,
    cookies: req.cookies,
    headers: {
      'Content-Type': req.get('Content-Type'),
      'User-Agent': req.get('User-Agent'),
    },
  };
  try {
    const httpResponse = await controller(httpRequest);
    return res.status(httpResponse.statusCode).send(httpResponse.body);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = expressCallback;

'use strict';
const {UserDomain} = require('../models/domain/UserDomain');

const requireLogin = async (req, res, next) => {
  const authHeader = req.header('authorization');
  if (!authHeader) return res.status(401).json({error: {message: 'Authorization header not found'}});
  const splitHeader = authHeader.split(' ');

  if (splitHeader.length !== 2) {
    return res.status(401).json({error: {message: 'Bad Authorization header'}});
  }
  // Check that its a bearer token
  if (splitHeader[0].trim() !== 'Bearer') {
    return res.status(401).json({error: {message: 'Authorization header not found'}});
  }
  const token = splitHeader[1].trim();

  // Get data from redis and set as user field
  const user = await UserDomain.getTokenUser(token);
  if (!user) return res.status(401).json({error: {message: 'Invalid Token'}});
  if (!req.context) req.context = {};
  req.context.user = user;
  next();
};

module.exports = requireLogin;

'use strict';

const UserDomain = require('../models/domain/UserDomain');

exports.registerAction = async (req, res) => {
  const email = req.body.email
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).json({error: {message: 'Missing required email/password'}});
  }

  try {
    const user = await UserDomain.registerUser(email, password);
    return res.status(200).json({
      data: {token: user.token},
    });
  } catch (e) {
    if (e.message === '409') {
      return res.status(409).json({error: {message: 'Email address already used'}});
    }
    console.log('error: ', e);
    return res.status(500).json({error: {message: 'Internal error in processing the request'}});
  }
};

exports.loginAction = async (req, res) => {
  const email = req.body.email
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).json({error: {message: 'Missing required email/password'}});
  }

  try {
    const authenticated = await UserDomain.authenticateUser(email, password);
    if (!authenticated) {
      return res.status(401).json({error: {message: 'Incorrect email/password'}});
    }

    const user = await UserDomain.getUser(email);
    return res.status(200).json({
      data: {token: user.token},
    });
  } catch (e) {
    if (e.message === '404') {
      return res.status(404).json({error: {message: 'Incorrect email'}});
    }
    console.log('error: ', e);
    return res.status(500).json({error: {message: 'Internal error in processing the request'}});
  }

};

exports.currentAction = async (req, res) => {
  const user = req.context.user;

  return res.status(200).json({
    data: {current: user.sequence_num},
  });
};

exports.nextAction = async (req, res) => {
  const user = req.context.user;
  const current = user.sequence_num;

  await UserDomain.incrementNumber(user);
  return res.status(200).json({
    data: {current: current+1},
  });
};

exports.resetCurrentAction = async (req, res) => {
  const user = req.context.user;
  const newVal = parseInt(req.body.current);
  if (isNaN(newVal)) {
    return res.status(400).json({error: {message: 'Bad value for current'}});
  }

  await UserDomain.resetNumber(user, newVal);
  return res.status(200).json({
    data: {current: newVal},
  });
};

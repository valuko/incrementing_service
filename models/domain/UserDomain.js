'use strict';
const bcrypt = require('bcryptjs');
const {v4: uuidv4} = require('uuid');
const User = require('../data/UserModel');
const {UserRepository} = require('../repositories/UserRepository');

class UserDomain {
  static getTokenUser(token) {
    return UserRepository.findByToken(token);
  }

  static async registerUser(email, password) {
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('409');
    }

    const hashPassword = this.encryptPassword(password);
    const user = new User();
    user.email = email;
    user.password = hashPassword;
    user.token = uuidv4();

    return UserRepository.saveObject(user);
  }

  /**
   * Encrypts the provided password with a random salt
   * @param {String} password
   * @return {Promise<string>}
   */
  static encryptPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
  /**
   * Compare plain and encrypted password
   * @param {String} plainPassword
   * @param {String} encPassword
   * @return {Promise<boolean>}
   */
  static async validatePassword(plainPassword, encPassword) {
    return bcrypt.compare(plainPassword, encPassword);
  }

  /**
   * Authenticates the email and password pair
   * @param {String} email
   * @param {String} password
   * @return {Promise<boolean>}
   */
  static async authenticateUser(email, password) {
    const passwordUser = await UserRepository.fetchUserPassword(email);
    if (!passwordUser) {
      throw new Error('404');
    }
    return this.validatePassword(password, passwordUser.password);
  }

  /**
   * Gets the user by the provided email address
   * @param {String} email
   * @return {Promise<User>}
   * @throws NotFoundError
   */
  static async getUser(email) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error('404');
    return user;
  }

  static incrementNumber(user) {
    return UserRepository.updateObject(user, {'$inc': {sequence_num: 1}});
  }

  static resetNumber(user, value) {
    return UserRepository.updateObject(user, {sequence_num: value});
  }
}

module.exports = UserDomain;

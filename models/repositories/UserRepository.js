'use strict';
const User = require('../data/UserModel');

class UserRepository {

  /**
   * Handles saving the data object
   * @param {User} dataObj
   * @return {Promise<User>}
   */
  static saveObject(dataObj) {
    return dataObj.save();
  }

  /**
   * Updates the data object using the passed in params
   * @param {User} dataObj
   * @param {Object} params
   * @return {Promise<{ok: Number, nModified: Number, n: Number}>}
   */
  static updateObject(dataObj, params) {
    return dataObj.updateOne(params);
  }

  /**
   * Finds a User by the provided Email address
   * @param {String} email
   * @return {Promise<User|null>}
   */
  static findByEmail(email) {
    return User.findOne({email});
  }

  static findByToken(token) {
    return User.findOne({token});
  }

  /**
   * Fetch the User entity with the password
   * @param {String} email
   * @return {Promise<User|null>}
   */
  static fetchUserPassword(email) {
    return User.findOne({email}, 'password');
  }
}

module.exports = {UserRepository};

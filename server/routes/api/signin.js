'use strict';

const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

const camelcaseToSentenceCase = require('../../lib/camelcase-to-sentence-case');
const validateEmailAddress = require('../../lib/validate-email-address');

module.exports = (app) => {
  // app.get('/api/counters', (req, res, next) => {
  //   Counter.find()
  //     .exec()
  //     .then((counter) => res.json(counter))
  //     .catch((err) => next(err));
  // });

  // app.post('/api/counters', function (req, res, next) {
  //   const counter = new Counter();

  //   counter.save()
  //     .then(() => res.json(counter))
  //     .catch((err) => next(err));
  // });

  // Sign Up
  app.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    const {
      firstName,
      lastName,
      email,
      password
    } = body;

    [firstName, lastName, email, password].forEach((key) => {
      if (!key || typeof key !== string) {
        const sentencizedKey = camelcaseToSentenceCase(key);
        res.end({
          success: false,
          message: `Error: ${sentencizedKey} is required.`
        })
      }
    });

    // always ensure the email is lowercase
    email = email.toLowerCase();

    // validate email is a properly formatted email address
    if (!validateEmailAddress(email)) {
      res.end({
        success: false,
        message: 'Error: Email address formatted incorrectly. Should be email@provider.com',
      });
    };

    // Verify an account with the provided email doesn't exist
    User.find({
      email,
    }, (err, previousUsers) => {
      if (err) {
        res.end({
          success: false,
          message: 'Error: Server error',
        });
      } else if (previousUsers.length > 0) {
        res.end({
          success: false,
          message: 'Error: An account with that email already exists.',
        });
      }

      // Save the new user
      const newUser = new User();

      Object.assign(newUser, {
        email,
        firstName,
        lastName,
        password: newUser.generateHash(password),
      });

      newUser.save((err, user) => {
        if (err) {
          res.end({
            success: false,
            message: 'Error: Server error',
          });
        }
        // if no error, save and success
        res.end({
          success: true,
          message: 'Signed up',
        });
      });
    });
  });
};

import regeneratorRuntime from 'regenerator-runtime'; // eslint-disable-line
import bcrypt from 'bcrypt';

import {
  requiresAuth,
  requiresAdmin,
} from './permissions';
import { refreshTokens, tryLogin } from './auth';
import { welcomeEmail, passwordEmail } from './mail';

export default {
  Query: {
    allUsers: (parent, args, { models }) => models.User.findAll(),
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    getUserByEmail: (parent, { email }, { models }) => models.User.findOne({ where: { email } }),
    me: requiresAuth.createResolver((parent, _, { models, user }) => (
      models.User.findOne({ where: { id: user && user.id } })
    )),
  },

  Mutation: {
    // Public functions
    register: async (parent, args, { models, SECRET }) => (
      bcrypt.hash(args.password, 12).then(encryptedPassword => (
        models.User.create(Object.assign({}, args, { password: encryptedPassword }))
          .then((user) => {
            welcomeEmail(user.get({ plain: true }));
            return tryLogin(args.email, args.password, models, SECRET);
          })
      ))
    ),
    login: async (parent, { email, password }, { models, SECRET }) =>
      tryLogin(email, password, models, SECRET),
    refreshTokens: (parent, { token, refreshToken }, { models, SECRET }) =>
      refreshTokens(token, refreshToken, models, SECRET),
    setPassword: (parent, { activation, password }, { models, SECRET }) => (
      models.User.findOne({ where: { passwordActivation: activation } })
        .then((user) => {
          if (!user) {
            throw new Error('Não encontramos sua conta. Por favor, verifique o link no email recebido.');
          } else {
            return bcrypt.hash(password, 12).then((encryptedPassword) => {
              const toUpdate = {
                password: encryptedPassword,
                passwordActivation: null,
                emailConfirmed: true,
              };

              return models.User.update(toUpdate, { where: { id: user.id } })
                .then(() => tryLogin(user.email, password, models, SECRET));
            });
          }
        })
    ),
    retrievePassword: (parent, { email }, { models }) => {
      const toUpdate = {
        passwordActivation: Math.random().toString(36).slice(-19),
      };

      return models.User.update(toUpdate, { where: { email } })
        .then((resp) => {
          models.User.findAll({ where: { email } })
            .then((users) => {
              users.map(user => passwordEmail(user.get({ plain: true })));
            });
          return resp;
        })
        .catch((err) => {
          console.log(err);
          return new Error('Não encontramos sua conta. Por favor, verifique seu email.');
        });
    },

    createUser: async (parent, args, { models }) => {
      const user = args;
      user.passwordActivation = Math.random().toString(36).slice(-19);

      return models.User.create(user)
        .then((resp) => {
          welcomeEmail(user.get({ plain: true }));
          return resp;
        });
    },

    // Restricted user functions
    updateAccount: requiresAuth.createResolver((parent, args, { models, user }) => (
      models.User.update(args, { where: { id: user.id } })
    )),

    // Admin User functions
    updateUser: requiresAdmin.createResolver((parent, args, { models }) => (
      models.User.update(args, { where: { id: args.id } })
    )),
    deleteUser: requiresAdmin.createResolver((parent, args, { models }) => (
      models.User.destroy({ where: args })
    )),

  },
};

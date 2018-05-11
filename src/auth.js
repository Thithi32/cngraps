import regeneratorRuntime from 'regenerator-runtime'; // eslint-disable-line
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import message from './helpers/message';

const createTokens = async (user, secret) => {
  const createToken = jwt.sign(
    {
      user: _.pick(user, ['id', 'name', 'email', 'isAdmin']),
    },
    secret,
    {
      expiresIn: '20m',
    },
  );

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, 'id'),
    },
    secret,
    {
      expiresIn: '30d',
    },
  );

  return Promise.all([createToken, createRefreshToken]);
};

export const refreshTokens = async (token, refreshToken, models, SECRET) => {
  let userId = -1;
  try {
    const { user: { id } } = jwt.verify(refreshToken, SECRET);
    userId = id;
  } catch (err) {
    return {};
  }

  const user = await models.User.findOne({ where: { id: userId }, raw: true });

  const [newToken, newRefreshToken] = await createTokens(user, SECRET);
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};

export const tryLogin = async (email, password, models, SECRET) => {
  const user = await models.User.findOne({ where: { email }, raw: true });
  if (!user) {
    throw new Error('Não encontramos sua conta com este email');
  }

  const valid = await bcrypt.compare(password, user.password || 'justincasepasswordisnull');
  if (!valid) {
    throw new Error('Sua senha parece incorreta');
  }

  const [token, refreshToken] = await createTokens(user, SECRET);

  message(`New login for ${user.email}`);

  return {
    token,
    refreshToken,
  };
};
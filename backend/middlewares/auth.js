import UnauthorizedError from '../errors/UnauthorizedError.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants/jwt.js';

export const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError());
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    next(new UnauthorizedError());
    return;
  }
  req.user = payload;
  next();
};

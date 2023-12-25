import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET =
  process.env.NODE_ENV === 'production'
    ? process.env.JWT_SECRET
    : 'rttyuyuhxsbcjb';
export const JWT_EXPIRES = '7d';

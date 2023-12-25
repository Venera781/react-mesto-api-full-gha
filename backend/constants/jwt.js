export const JWT_SECRET =
  process.env.NODE_ENV === 'production'
    ? process.env.JWT_SECRET
    : 'rttyuyuhxsbcjb';
export const JWT_EXPIRES = '7d';

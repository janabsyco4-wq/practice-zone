import jwt from 'jsonwebtoken';

export const generateToken = (payload: { id: string; email: string; role: string }) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '24h',
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

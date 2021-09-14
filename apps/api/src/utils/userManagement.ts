import { AuthenticationError } from 'apollo-server-express';
import jwt_decode from 'jwt-decode';

interface AuthUser {
  'cognito:id': string;
  email: string;
}

const decodeToken = (token: string): AuthUser => {
  try {
    const decoded: { email: string; 'cognito:username': string } = jwt_decode(token);

    return {
      'cognito:id': decoded['cognito:username'],
      email: decoded.email,
    };
  } catch (error) {
    throw new AuthenticationError('Invalid token.');
  }
};

export const getUser = (token: string | string[]): AuthUser | undefined => {
  if (!token || typeof token !== 'string') return;

  const user = decodeToken(token);

  return user;
};

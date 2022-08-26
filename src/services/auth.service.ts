import { instance } from './api';

export const signIn = async (username: string, password: string) => {
  const result = await instance({
    url: '/auth/login',
    method: 'post',
    data: { username, password },
  });

  return result?.data;
};

export const signUp = async (username: string, email: string, password: string) => {
  const result = await instance({
    url: '/auth/register',
    method: 'post',
    data: { username, email, password },
  });

  return result?.data;
};

export const verify = async (authorization: string) => {
  const result = await instance({
    url: '/auth/verify',
    method: 'get',
    params: { authorization },
  });

  return result?.data;
};
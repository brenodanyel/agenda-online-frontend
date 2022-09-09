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

export const verify = async (token: string) => {
  const result = await instance({
    url: '/auth/verify',
    method: 'get',
    headers: { authorization: `Bearer ${token}` },
  });

  return result?.data;
};

export const sendPasswordResetCode = async (username: string) => {
  const result = await instance({
    url: '/auth/password/send',
    method: 'post',
    data: { username },
  });

  return result?.data;
};

export const resetPassword = async (username: string, password: string, code: string) => {
  const result = await instance({
    url: '/auth/password/reset',
    method: 'post',
    data: { username, password, code },
  });

  return result?.data;
};

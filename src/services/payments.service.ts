import { instance } from './api';

export const findByUser = async (token: string) => {
  const result = await instance({
    url: '/payments/me',
    method: 'get',
    headers: { authorization: `Bearer ${token}` },
  });

  return result?.data;
};

export const deleteByUser = async (token: string, id: string) => {
  const result = await instance({
    url: `/payments/me/${id}`,
    method: 'delete',
    headers: { authorization: `Bearer ${token}` },
  });

  return result?.data;
};

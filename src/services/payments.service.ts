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

export const createByUser = async (token: string, customer: string, installments: number, price: number) => {
  const result = await instance({
    url: '/payments/me',
    method: 'post',
    headers: { authorization: `Bearer ${token}` },
    data: { customer, installments, price }
  });

  return result?.data;
};

export const editByUser = async (token: string, id: string, customer: string, installments: number, price: number) => {
  const result = await instance({
    url: `/payments/me/${id}`,
    method: 'patch',
    headers: { authorization: `Bearer ${token}` },
    data: { customer, installments, price }
  });

  return result?.data;
};

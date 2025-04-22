import { redirect } from "next/navigation";

const BASE_URL = 'http://localhost:5000/api';

const getPublicHeaders = (): HeadersInit => ({
  'Content-Type': 'application/json',
});

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const fetchPublic = async ({
  url,
  options = {},
  revalidate,
}: {
  url: string;
  options?: RequestInit;
  revalidate?: number;
}): Promise<any> => {
  const res = await fetch(url, {
    ...options,
    headers: getPublicHeaders(),
    ...(revalidate ? { next: { revalidate } } : {}),
  });
  const data = await res.json();
  return data.data || data;
};

const fetchPrivate = async ({
  url,
  options = {},
  revalidate,
}: {
  url: string;
  options?: RequestInit;
  revalidate?: number;
}): Promise<any> => {
  const res = await fetch(url, {
    ...options,
    headers: getAuthHeaders(),
    ...(revalidate ? { next: { revalidate } } : {}),
  });
  const data = await res.json();
  if (res?.status === 401) {
    redirect('/products');
  }
  return data.data || data;
};

export const registerUser = async (data: any) =>
  fetchPublic({
    url: `${BASE_URL}/auth/register`,
    options: {
      method: 'POST',
      body: JSON.stringify(data),
    },
  });

export const loginUser = async (data: any) =>
  fetchPublic({
    url: `${BASE_URL}/auth/login`,
    options: {
      method: 'POST',
      body: JSON.stringify(data),
    },
  });

export const getProducts = async () =>
  fetchPublic({ url: `${BASE_URL}/products`, revalidate: 60 });

export const getProductById = async (id: string) =>
  fetchPublic({ url: `${BASE_URL}/products/${id}` });

export const getCart = async () => fetchPrivate({ url: `${BASE_URL}/cart` });

export const updateCart = async (items: Array<any>) =>
  fetchPrivate({
    url: `${BASE_URL}/cart`,
    options: {
      method: 'PUT',
      body: JSON.stringify({ items }),
    },
  });

export const checkout = async () =>
  fetchPrivate({
    url: `${BASE_URL}/orders/checkout`,
    options: {
      method: 'POST',
    },
  });

export const getCategorySales = async () =>
  fetchPrivate({ url: `${BASE_URL}/reports/category-sales`, revalidate: 60 });

export const getTopSpenders = async () =>
  fetchPrivate({ url: `${BASE_URL}/reports/top-spenders`, revalidate: 60 });

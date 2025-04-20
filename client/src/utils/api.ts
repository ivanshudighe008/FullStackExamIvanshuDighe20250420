const BASE_URL = 'http://localhost:5000/api';

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
});

export const registerUser = async (data: any) =>
  fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const loginUser = async (data: any) =>
  fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const getProducts = async () =>
  fetch(`${BASE_URL}/products`, { headers: headers() })
    .then((res) => res.json())
    .then((res) => res.data);

export const getProductById = async (id: string) =>
  fetch(`${BASE_URL}/products/${id}`, { headers: headers() })
    .then((res) => res.json())
    .then((res) => res.data);

export const getCart = async () =>
  fetch(`${BASE_URL}/cart`, { headers: headers() })
    .then((res) => res.json())
    .then((res) => res.data);

export const updateCart = async (items: Array<any>) =>
  fetch(`${BASE_URL}/cart`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify({ items }),
  })
    .then((res) => res.json())
    .then((res) => res.data);

export const checkout = async () =>
  fetch(`${BASE_URL}/orders/checkout`, {
    method: 'POST',
    headers: headers(),
  }).then((res) => res.json());

export const getCategorySales = async () =>
  fetch(`${BASE_URL}/reports/category-sales`, { headers: headers() })
    .then((res) => res.json())
    .then((res) => res.data);

export const getTopSpenders = async () =>
  fetch(`${BASE_URL}/reports/top-spenders`, { headers: headers() })
    .then((res) => res.json())
    .then((res) => res.data);

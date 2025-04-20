'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/authSlice';
import { registerUser } from '@/utils/api';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email && password) {
      const data = await registerUser({ email, password });
      if (data.token) {
        localStorage.setItem('token', data.token);
        dispatch(setUser(data.token));
        router.push('/products');
      } else {
        alert('Invalid credentials!');
      }
    } else {
      alert('Please provide valid credentails!');
    }
  };

  return (
    <div>
      <h2 className='text-xl font-semibold'>Register</h2>
      <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
      <input
        type='password'
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className='bg-blue-500 text-white px-4 py-2 mt-2'
      >
        Register
      </button>
    </div>
  );
}

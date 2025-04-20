'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/authSlice';
import { loginUser } from '@/utils/api';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email && password) {
      const data = await loginUser({ email, password });
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
      <h2 className='text-xl font-semibold'>Login</h2>
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
        Login
      </button>
      <div className='mt-4'>
        <button
          className='bg-blue-500 text-white px-4 py-2 mt-2'
          onClick={() => router.push('/register')}
        >
          Click to Register
        </button>
      </div>
    </div>
  );
}

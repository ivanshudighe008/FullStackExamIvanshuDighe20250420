'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import {
  fetchCartFromServer,
  selectCartItems,
  toggleCartDrawer,
} from '@/redux/slices/cartSlice';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectUser } from '@/redux/slices/authSlice';
import { setUser } from '@/redux/slices/authSlice';
import { AppDispatch } from '@/redux/store';

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectUser);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartFromServer());
    }
  }, [dispatch, user]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setUser(token));
    }
  }, []);

  return (
    <nav className='flex items-center justify-between px-6 py-4 bg-white shadow'>
      <Link href='/' className='text-xl font-bold'>
        MyShop
      </Link>
      <div className='flex items-center gap-6'>
        <Link href='/products' className='hover:underline'>
          Products
        </Link>
        <Link href='/reports' className='hover:underline'>
          Reports
        </Link>
        {!user ? (
          <Link href='/login' className='hover:underline'>
            Login
          </Link>
        ) : (
          <>
            <button
              className='cursor-pointer'
              onClick={() => dispatch(logoutUser())}
            >
              Logout
            </button>
            <button
              className='relative cursor-pointer'
              onClick={() => dispatch(toggleCartDrawer(true))}
            >
              <ShoppingCartIcon className='h-6 w-6' />
              {cartCount > 0 && (
                <span className='absolute -top-2 -right-2 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full'>
                  {cartCount}
                </span>
              )}
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

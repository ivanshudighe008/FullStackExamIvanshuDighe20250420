'use client';

import React from 'react';
import { RootState } from '@/redux/store';
import { Product, toggleCartDrawer } from '@/redux/slices/cartSlice';
import { XMarkIcon } from '@heroicons/react/24/outline';
import CartItemCard from '@/components/CartItemCard';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { isDrawerOpen, items } = useSelector((state: RootState) => state.cart);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 ${
        isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className='flex justify-between items-center p-4 border-b'>
        <h2 className='text-lg font-semibold'>Your Cart</h2>
        <button onClick={() => dispatch(toggleCartDrawer(false))}>
          <XMarkIcon className='h-6 w-6' />
        </button>
      </div>

      <div className='p-4 flex flex-col gap-4 overflow-y-auto flex-grow'>
        {items.length === 0 ? (
          <p className='text-gray-500'>Your cart is empty.</p>
        ) : (
          items.map((item) => {
            const product = item.productId as Product;
            return (
              <CartItemCard
                key={product._id}
                productId={product}
                quantity={item.quantity}
              />
            );
          })
        )}
      </div>

      {items.length > 0 && (
        <div className='p-4 border-t'>
          <Link href='/checkout'>
            <button
              onClick={() => dispatch(toggleCartDrawer(false))}
              className='w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-900'
            >
              Go to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;

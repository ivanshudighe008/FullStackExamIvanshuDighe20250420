'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, clearCart, Product } from '@/redux/slices/cartSlice';
import { redirect } from 'next/navigation';
import { checkout } from '@/utils/api';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

function OrderSuccess() {
  return (
    <div className='p-8 text-center'>
      <h1 className='flex text-3xl font-bold text-green-600 justify-center items-center'>
        <CheckCircleIcon className='h-6 w-6' />
        <p className='ml-2'>Order Successful!</p>
      </h1>
      <p className='mt-2'>Thank you for your purchase.</p>
      <Link href='/products' className='underline'>
        Go to Products
      </Link>
    </div>
  );
}

const CheckoutPage = () => {
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    setShowOrderSuccess(true);

    try {
      const data = await checkout();
      if (data?.success) {
        dispatch(clearCart());
        setShowOrderSuccess(true);
      } else {
        alert('Checkout failed.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (showOrderSuccess) return <OrderSuccess />;
  if(!cartItems.length) return redirect('/products')

  return (
    <div className='max-w-3xl mx-auto py-10 px-4'>
      <h2 className='text-2xl font-bold mb-4'>Confirm Checkout</h2>
      <ul className='space-y-2'>
        {cartItems.map((item) => {
          const product = item.productId as Product;
          return (
            <li
              key={product._id}
              className='flex justify-between border-b py-1'
            >
              <span>
                {product.name} x {item.quantity}
              </span>
              <span>${product.price}</span>
            </li>
          );
        })}
      </ul>
      <button
        onClick={handleCheckout}
        className='mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700'
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;

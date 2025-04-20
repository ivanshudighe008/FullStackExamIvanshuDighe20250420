'use client';

import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, clearCart, Product } from '@/redux/slices/cartSlice';
import { useRouter } from 'next/navigation';
import { checkout } from '@/utils/api';

const CheckoutPage = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const data = await checkout();
      if (data?.success) {
        dispatch(clearCart());
        router.push('/order-success');
      } else {
        alert('Checkout failed.');
      }
    } catch (err) {
      console.error(err);
    }
  };

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

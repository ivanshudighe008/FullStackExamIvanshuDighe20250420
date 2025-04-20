'use client';

import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import {
  addToCart,
  Product,
  removeFromCart,
  selectCartItems,
} from '@/redux/slices/cartSlice';
import { selectUser } from '@/redux/slices/authSlice';

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cartItems = useSelector(selectCartItems);
  const isInCart = cartItems.some((item) => {
    const cartProduct = item.productId as Product;
    return cartProduct._id === product._id;
  });

  const handleAdd = () => {
    dispatch(
      addToCart({
        productId: {
          _id: product._id,
          name: product.name,
          price: product.price,
        },
        quantity: 1,
      })
    );
  };

  const handleRemove = () => {
    dispatch(removeFromCart(product._id));
  };

  return (
    <div className='border p-4 rounded-md shadow hover:shadow-lg transition'>
      <h2 className='text-lg font-bold mt-2'>{product.name}</h2>
      <p className='text-gray-600'>${product.price.toFixed(2)}</p>
      <div className='mt-3 flex justify-between items-center'>
        <Link
          href={`/products/${product._id}`}
          className='text-blue-600 hover:underline'
        >
          View
        </Link>
        {user && (
          <>
            {isInCart ? (
              <button
                className='bg-red-500 text-white px-3 py-1 rounded'
                onClick={handleRemove}
              >
                Remove
              </button>
            ) : (
              <button
                className='bg-green-600 text-white px-3 py-1 rounded'
                onClick={handleAdd}
              >
                Add
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

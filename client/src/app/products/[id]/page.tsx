'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  selectCartItems,
} from '@/redux/slices/cartSlice';
import { getProductById } from '@/utils/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const isInCart = cartItems.some((item) => item.productId._id === id);

  useEffect(() => {
    if (typeof id === 'string') {
      getProductById(id).then(setProduct);
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAdd = () =>
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
  const handleRemove = () => dispatch(removeFromCart(product._id));

  return (
    <div className='max-w-3xl mx-auto mt-10'>
      <h1 className='text-2xl font-bold mt-4'>{product.name}</h1>
      <p className='text-gray-700 mt-2'>{product.description}</p>
      <p className='text-xl font-semibold mt-2'>${product.price}</p>
      <div className='mt-4'>
        {isInCart ? (
          <button
            onClick={handleRemove}
            className='bg-red-600 text-white px-4 py-2 rounded'
          >
            Remove from Cart
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className='bg-blue-600 text-white px-4 py-2 rounded'
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;

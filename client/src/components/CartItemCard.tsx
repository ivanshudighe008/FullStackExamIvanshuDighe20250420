'use client';

import React, { useEffect } from 'react';
import {
  CartItem,
  removeFromCart,
  selectCartItems,
  updateCartOnServer,
  updateQuantity,
} from '@/redux/slices/cartSlice';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';

const CartItemCard = ({ productId: item, quantity }: CartItem) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (amount: number) => {
    const newQty = quantity + amount;
    if (newQty < 1) {
      dispatch(removeFromCart(item._id));
    } else {
      dispatch(updateQuantity({ id: item._id, quantity: newQty }));
    }
  };

  return (
    <div className='flex items-center gap-4'>
      <div className='flex-1'>
        <h4 className='font-semibold'>{item.name}</h4>
        <p className='text-sm text-gray-600'>${item.price.toFixed(2)}</p>
        <div className='flex items-center mt-2 space-x-2'>
          <button
            onClick={() => handleQuantityChange(-1)}
            className='px-2 py-1 border rounded'
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            className='px-2 py-1 border rounded'
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => dispatch(removeFromCart(item._id))}
        className='text-red-500'
      >
        <TrashIcon className='h-5 w-5' />
      </button>
    </div>
  );
};

export default CartItemCard;

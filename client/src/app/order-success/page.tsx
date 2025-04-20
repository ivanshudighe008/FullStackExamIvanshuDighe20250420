import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function OrderSuccess() {
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

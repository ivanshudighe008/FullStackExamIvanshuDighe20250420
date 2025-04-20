'use client';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/utils/api';

export default function ProductsPage() {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  if (!products) return <div>Loading...</div>;

  return (
    <div className='grid grid-cols-2 gap-4'>
      {products.map((product: any) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

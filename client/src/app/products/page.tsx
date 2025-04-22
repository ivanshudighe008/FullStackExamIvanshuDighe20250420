import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/utils/api';
import { Product } from '@/redux/slices/cartSlice';

export default async function ProductsPage() {
  const products: Product[] = await getProducts();

  return (
    <div className='grid grid-cols-2 gap-4'>
      {products.map((product: any) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

'use client';
import './globals.css';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Provider store={store}>
          <Navbar />
          <CartDrawer />
          <main className='px-4 py-6'>{children}</main>
        </Provider>
      </body>
    </html>
  );
}

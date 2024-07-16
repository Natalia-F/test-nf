'use client';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import './globals.css';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <html lang="es">
        <body>
          {children}
        </body>
      </html>
    </Provider>
  );
};

export default Layout;
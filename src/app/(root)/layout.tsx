import { ReactNode } from 'react';

// import StreamVideoProvider from '@/providers/StreamClientProvider';

const RootLayout = ({ children }:{ children: ReactNode }) => {
  return (
    <main>
        Navbar 
        {children}
        Footer 
    </main>
  );
};

export default RootLayout;
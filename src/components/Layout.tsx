import React from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  return <div className="bg-white w-full min-h-screen font-body overflow-x-hidden">
      <Header />
      <WhatsAppButton />
      <main className="pt-16 sm:pt-20 w-full bg-blue-950/80">
        {children}
      </main>
      <Footer />
    </div>;
};
export default Layout;
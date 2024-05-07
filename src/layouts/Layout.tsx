import Footer from '@/components/Footer';
import Header from '@/components/Header';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className='flex flex-col min-h-screen bg-background'>
      <Header />
      <main className='container flex-1 py-10 flex flex-col justify-center'>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

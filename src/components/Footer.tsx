import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-primary py-6 text-secondary'>
      <div className='container flex flex-col items-center justify-between md:flex-row gap-5 md:gap-0'>
        <Link to='/' className='text-3xl font-bold tracking-tight'>
          Yummy.de
        </Link>

        <ul className='flex flex-wrap items-center text-sm font-medium text-secondary'>
          <li>
            <Link to='/about' className='hover:underline me-4 md:me-6'>
              About
            </Link>
          </li>
          <li>
            <Link to='/' className='hover:underline me-4 md:me-6'>
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to='/licensing' className='hover:underline me-4 md:me-6'>
              Licensing
            </Link>
          </li>
          <li>
            <Link to='/contact' className='hover:underline'>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

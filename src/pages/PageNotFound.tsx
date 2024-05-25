import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import PageNotFoundImg from '../../public/undraw_page_not_found_re_e9o6.svg';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='border h-screen flex justify-center items-center'>
      <div className='flex flex-col gap-5 justify-center items-center h-[600px] w-[700px]'>
        <AspectRatio ratio={19 / 9}>
          <img
            src={PageNotFoundImg}
            alt='page not found'
            className='w-full h-full'
          />
        </AspectRatio>
        <h1>Oops Page Not found !</h1>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    </div>
  );
};

export default PageNotFound;

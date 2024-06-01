import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { useLoginUser } from '@/api/UserApi';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

interface ErrorResponse {
  response?: {
    status?: number;
  };
}

const Login = () => {
  const { LoginUser, isLoading, isSuccess, isError, error } = useLoginUser();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [exceedingLimitTimer, setExceedingLimitTimer] = useState<number>(() => {
    const savedTimer = localStorage.getItem('exceedingLimitTimer');
    return savedTimer ? parseInt(savedTimer, 10) : 0;
  });

  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    LoginUser(data);
    setErrorMessage('');
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
      form.reset();
    }

    if (isError) {
      const typedError = error as ErrorResponse;

      if (typedError?.response?.status === 401) {
        setErrorMessage('Email or Password are not correct');
      }
      if (typedError?.response?.status === 429) {
        setErrorMessage('');
        setExceedingLimitTimer(60);
        localStorage.setItem('exceedingLimitTimer', '60');
      }
    }
  }, [isSuccess, form, navigate, isError, error]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (exceedingLimitTimer > 0) {
      timer = setInterval(() => {
        setExceedingLimitTimer((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem('exceedingLimitTimer', newTime.toString());
          return newTime;
        });
      }, 1000);
    } else {
      localStorage.removeItem('exceedingLimitTimer');
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [exceedingLimitTimer]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='container space-y-4 border rounded-md shadow-md p-10 max-w-[600px]'
      >
        <div>
          <h2 className='text-2xl font-bold'>Login</h2>
        </div>

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} className='focus:border-none' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className='focus:border-none'
                  type='password'
                />
              </FormControl>
              <FormMessage />
              {errorMessage && (
                <div className='text-red-500 mt-1 text-sm'>{errorMessage}</div>
              )}

              {exceedingLimitTimer > 0 && (
                <p className='text-red-500 mb-5 text-sm'>
                  Too many Login requests, please try again after{' '}
                  {exceedingLimitTimer}
                </p>
              )}
            </FormItem>
          )}
        />

        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button
            variant='primary'
            size='sm'
            type='submit'
            disabled={exceedingLimitTimer > 0}
          >
            Login
          </Button>
        )}

        <p className='mt-2 text-sm'>
          Don't have an account ?
          <Link to='/sign-up' className='ml-2 hover:underline'>
            Sign Up
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default Login;

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
import { useCreateUser } from '@/api/UserApi';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const signUpSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    firstName: z.string().min(2, 'Must be 2 or more characters long'),
    lastName: z.string().min(2, 'Must be 2 or more characters long'),
    password: z.string().min(8, 'Must be 8 or more characters long'),
    confirmPassword: z.string().min(8, 'Must be 8 or more characters long'),
    address: z.object({
      street: z.string().min(4, 'Street is required'),
      city: z.string().min(4, { message: 'City is required' }),
      country: z.string().min(4, 'Country is required'),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, isLoading, isSuccess } = useCreateUser();

  const navigate = useNavigate();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    createUser(data);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
      form.reset();
    }
  }, [isSuccess, form, navigate]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='container space-y-4 border rounded-md shadow-md p-10 max-w-[600px]'
      >
        <div>
          <h2 className='text-2xl font-bold'>SingUp</h2>
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

        <div className='flex flex-col md:flex-row gap-4'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} className='focus:border-none' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} className='focus:border-none' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col md:flex-row gap-4'>
          <FormField
            control={form.control}
            name='address.street'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input {...field} className='focus:border-none' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='address.city'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} className='focus:border-none' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='address.country'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} className='focus:border-none' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col md:flex-row gap-4'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      {...field}
                      className='pr-10'
                      type={showPassword ? 'text' : 'password'}
                    />
                    {showPassword ? (
                      <EyeOff
                        className='fa-solid fa-eye-slash cursor-pointer text-primary absolute right-2 top-1/2 transform -translate-y-1/2'
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <Eye
                        onClick={() => setShowPassword(!showPassword)}
                        className='fa-solid fa-eye cursor-pointer text-primary absolute right-2 top-1/2 transform -translate-y-1/2'
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      {...field}
                      className='pr-10'
                      type={showPassword ? 'text' : 'password'}
                    />
                    {showPassword ? (
                      <EyeOff
                        className='fa-solid fa-eye-slash cursor-pointer text-primary absolute right-2 top-1/2 transform -translate-y-1/2'
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <Eye
                        onClick={() => setShowPassword(!showPassword)}
                        className='fa-solid fa-eye cursor-pointer text-primary absolute right-2 top-1/2 transform -translate-y-1/2'
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button
            variant='primary'
            size='sm'
            type='submit'
            disabled={form.formState.isSubmitting}
          >
            SignUp
          </Button>
        )}

        <p className='mt-2 text-sm'>
          Don't have an account ?
          <Link to='/login' className='ml-2 hover:underline'>
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignUp;

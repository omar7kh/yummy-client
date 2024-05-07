import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { User } from '@/types';
import { useEffect } from 'react';

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(4, 'Must be 4 or more characters long'),
  address: z.object({
    street: z.string().min(4, 'Street is required'),
    city: z.string().min(4, { message: 'City is required' }),
    country: z.string().min(4, 'Country is required'),
  }),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  currentUser: User;
};

const UserProfileForm = ({ onSave, isLoading, currentUser }: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });

  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className='space-y-4 md:border md:rounded-md md:p-10 md:shadow-md'
      >
        <div>
          <h2 className='text-2xl font-bold'>Profile</h2>
          <FormDescription>View and change your profile</FormDescription>
        </div>

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} className='focus:border-none' disabled />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
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
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button variant='primary' size='sm' type='submit'>
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserProfileForm;

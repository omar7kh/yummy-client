export type User = {
  _id: string;
  email: string;
  name: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
};

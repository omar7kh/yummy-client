import { useNavigate } from 'react-router-dom';
import SearchBar, { SearchForm } from './SearchBar';

const Search = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  return (
    <div className='rounded-md text-center p-3 md:border md:shadow-md lg:px-32'>
      <h1 className='font-bold text-primary tracking-tight text-4xl mb-5 md:mb-10'>
        Yummy is the best
      </h1>
      <SearchBar placeHolder='Search by City' onSubmit={handleSearchSubmit} />
    </div>
  );
};

export default Search;

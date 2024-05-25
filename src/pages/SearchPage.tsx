import { useSearchRestaurants } from '@/api/RestaurantApi';
import CuisineFilter from '@/components/CuisineFilter';
import PaginationSelector from '@/components/PaginationSelector';
import SearchBar, { SearchForm } from '@/components/search/SearchBar';
import SearchResultCard from '@/components/search/SearchResultCard';
import SearchResultInfo from '@/components/search/SearchResultInfo';
import SortOptionDropdown from '@/components/SortOptionDropdown';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: '',
    page: 1,
    selectedCuisines: [],
    sortOption: 'bestMatch',
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const navigate = useNavigate();

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: '',
      page: 1,
    }));
  };

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!results?.data || !city) {
    return (
      <div className='h-[calc(100vh-86px)] flex flex-col justify-center items-center gap-5'>
        <span>{`There is no Restaurant in ${city} found`}</span>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 flex-1'>
      <div id='cuisines-list'>
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>

      <div id='main-content' className='flex flex-col gap-10 md:gap-5'>
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder='Search by Cuisine or Restaurant'
          onReset={resetSearch}
        />

        <div className='flex justify-between flex-col gap-3 lg:flex-row'>
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>

        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}

        {results.data.length >= 1 && (
          <PaginationSelector
            page={results.pagination.page}
            pages={results.pagination.pages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;

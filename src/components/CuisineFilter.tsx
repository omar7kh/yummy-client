import { cuisineList } from '@/config/restaurant_options_config';
import { Label } from './ui/label';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { ChangeEvent } from 'react';
import { Button } from './ui/button';

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const CuisineFilter = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handleCuisinesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = e.target.value;
    const isChecked = e.target.checked;

    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCuisinesList);
  };

  const handleCuisinesReset = () => onChange([]);

  return (
    <>
      <div className='flex justify-between items-center px-2'>
        <div className='text-md font-semibold mb-2'>Filter By Cuisine</div>
        <div
          onClick={handleCuisinesReset}
          className='text-sm font-semibold mb-2 underline cursor-pointer text-blue-500 hover:text-blue-600'
        >
          Reset Filters
        </div>
      </div>

      <div className='space-y-2 flex flex-col'>
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine);

            return (
              <div className='flex'>
                <input
                  id={`cuisine_${cuisine}`}
                  type='checkbox'
                  className='hidden'
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisinesChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-md px-4 py-2 font-semibold ${
                    isSelected
                      ? 'border border-primary text-primary'
                      : 'border border-slate-300'
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}

        <Button
          onClick={onExpandedClick}
          variant='link'
          className='mt-4 flex-1'
        >
          {isExpanded ? (
            <span className='flex items-center'>
              View Less <ChevronUp />
            </span>
          ) : (
            <span className='flex items-center'>
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default CuisineFilter;

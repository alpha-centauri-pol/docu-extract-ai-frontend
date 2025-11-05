import React from 'react';

interface CategoryProgressCardProps {
  category: string;
  amount: number;
  total: number;
}

const CategoryProgressCard: React.FC<CategoryProgressCardProps> = ({ category, amount, total }) => {
  const percent = total > 0 ? (amount / total) * 100 : 0;
  
  return (
    <div className="flex flex-col gap-md p-lg bg-card-dark rounded-sm overflow-hidden items-center">
      <div className="flex items-center gap-5 w-full">
        <div className="inline-block font-neue-montreal font-medium uppercase text-sm leading-[1] text-tertiary">
          TOP CATEGORY
        </div>
        <div className="flex flex-1 items-center gap-3">
          <div 
            role="progressbar" 
            className="relative h-2 overflow-hidden rounded-full bg-primary/20 w-full"
          >
            <div 
              className="h-full w-full flex-1 bg-secondary transition-all" 
              style={{ transform: `translateX(-${100 - percent}%)` }}
            ></div>
          </div>
          <div className="inline-block font-neue-montreal font-normal text-[18px] leading-[1] text-primary">
            {percent.toFixed(0)}%
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center w-full">
        <div className="inline-block font-neuebit font-bold text-6xl lg:text-8xl leading-[1] text-primary truncate px-2">
          {category}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center w-full overflow-hidden">
        <div className="flex flex-col gap-0.5 overflow-hidden font-neue-montreal text-sm items-center">
          <span className="truncate text-lg font-medium text-primary">₹{amount.toFixed(2)}</span>
          <span className="truncate font-medium uppercase tracking-tight text-primary-inactive/50">Spent</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryProgressCard;
import React from 'react';

interface CategoryDonutCardProps {
  topCategoryName: string;
  topCategoryAmount: number;
  totalAmount: number;
}

const CategoryDonutCard: React.FC<CategoryDonutCardProps> = ({ topCategoryName, topCategoryAmount, totalAmount }) => {
  const otherAmount = totalAmount - topCategoryAmount;
  const topPercent = totalAmount > 0 ? (topCategoryAmount / totalAmount) * 100 : 0;

  return (
    <div className="flex flex-col gap-md p-lg bg-card-dark rounded-sm overflow-hidden items-center row-span-2">
      <div className="inline-block font-neue-montreal font-medium uppercase text-sm leading-[1] text-tertiary">
        Spending Breakdown
      </div>
      <div className="flex flex-1 items-center justify-center w-full">
        
        <div className="relative aspect-square w-full max-w-[250px] mx-auto">
          <div className="aspect-square w-full bg-transparent rounded-full border-2 border-tertiary/20 absolute inset-0"></div>
          <div 
            className="aspect-square w-full rounded-full absolute inset-0" 
            style={{ 
              background: `conic-gradient(from 0deg, #C684F6 0% ${topPercent}%, #6B7280 ${topPercent}% 100%)`,
            }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xs bg-primary px-sm py-0.5 font-neue-montreal font-bold text-lg text-primary-dark"
          >
            {topPercent.toFixed(1)}%
          </div>
        </div>

      </div>
      <div className="flex gap-2 items-center w-full justify-around">
        <div className="flex flex-col items-center">
          <div className="inline-block font-neue-montreal font-medium uppercase text-sm leading-[1] text-primary-inactive/50">
            {topCategoryName}
          </div>
          <div className="flex items-baseline justify-center gap-1 leading-[1]">
            <span className="font-neue-montreal font-bold text-[32px] lg:text-[42px] text-secondary">₹</span>
            <span className="inline-block font-neuebit font-bold text-[40px] lg:text-[54px] leading-[1G] text-secondary">
              {topCategoryAmount.toFixed(0)}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="inline-block font-neue-montreal font-medium uppercase text-sm leading-[1] text-primary-inactive/50">
            Other
          </div>
          <div className="flex items-baseline justify-center gap-1 leading-[1]">
            <span className="font-neue-montreal font-bold text-[32px] lg:text-[42px] text-primary">₹</span>
            <span className="inline-block font-neuebit font-bold text-[40px] lg:text-[54px] leading-[1] text-primary">
              {otherAmount.toFixed(0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDonutCard;
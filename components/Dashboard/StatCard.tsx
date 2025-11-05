import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext: string;
  prefix?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtext, prefix }) => {
  return (
    <div className="flex flex-col gap-md p-lg bg-card-dark rounded-sm overflow-hidden items-center">
      <div className="inline-block font-neue-montreal font-medium uppercase text-sm leading-[1] text-tertiary">
        {title}
      </div>
      <div className="flex flex-1 items-baseline justify-center w-full gap-1">
        {prefix && (
          <span className="font-neue-montreal font-bold text-[64px] leading-[1] text-primary">
            {prefix}
          </span>
        )}
        <div className="inline-block font-neuebit font-bold text-[106px] leading-[1] text-primary">
          {value}
        </div>
      </div>
      <div className="inline-block font-neue-montreal font-medium uppercase text-sm leading-[1] text-primary-inactive/50">
        {subtext}
      </div>
    </div>
  );
};

export default StatCard;
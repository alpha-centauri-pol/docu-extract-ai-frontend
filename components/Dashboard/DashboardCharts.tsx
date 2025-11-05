'use client';
import React from 'react';
import { ProcessedDocument } from '../../app/types';
import { 
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

interface ChartProps {
  documents: ProcessedDocument[];
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="font-neue-montreal text-sm">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const DashboardCharts: React.FC<ChartProps> = ({ documents }) => {

  const spendingByCategory = documents.reduce((acc, doc) => {
    const category = doc.data.category || 'Other';
    const amount = parseFloat(doc.data.totalAmount || '0');
    
    const existing = acc.find(item => item.name === category);
    if (existing) {
      existing.amount += amount;
    } else {
      acc.push({ name: category, amount: amount });
    }
    return acc;
  }, [] as { name: string; amount: number; }[]);

  const categoryColors = {
    'Food & Dining': '#97F0E5', // tertiary
    'Entertainment': '#C684F6', // secondary
    'Other': '#A0A0A0', // primary-inactive
    'Groceries': '#3B82F6',
    'Utilities': '#F59E0B',
  };

  const getSafeColor = (name: string) => {
    return (categoryColors as Record<string, string>)[name] || '#A0A0A0';
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
      {/* BAR CHART */}
      <div className="flex flex-col gap-md p-lg bg-card-dark rounded-sm overflow-hidden items-center">
        <div className="inline-block font-neue-montreal font-medium uppercase text-sm leading-[1] text-tertiary">
          Spending by Category
        </div>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={spendingByCategory} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#FFFFFF" strokeOpacity={0.1} />
              <XAxis dataKey="name" stroke="#A0A0A0" tick={{ fill: '#A0A0A0', fontFamily: 'neue-montreal', fontSize: 12 }} />
              <YAxis stroke="#A0A0A0" tick={{ fill: '#A0A0A0', fontFamily: 'neue-montreal', fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: '#FFFFFF', fillOpacity: 0.1 }}
                contentStyle={{ 
                  backgroundColor: '#0C0F1D', 
                  borderColor: '#97F0E5',
                  borderRadius: '0.25rem',
                  fontFamily: 'neue-montreal',
                }}
                labelStyle={{ color: '#FFFFFF' }}
              />
              <Bar dataKey="amount" fill="#97F0E5" radius={[4, 4, 0, 0]}>
                {spendingByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getSafeColor(entry.name)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* PIE CHART */}
      <div className="flex flex-col gap-md p-lg bg-card-dark rounded-sm overflow-hidden items-center">
        <div className="inline-block font-neue-montreal font-medium uppercase text-sm leading-[1] text-tertiary">
          Category Breakdown
        </div>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={spendingByCategory}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {spendingByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getSafeColor(entry.name)} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#0C0F1D', 
                  borderColor: '#97F0E5',
                  borderRadius: '0.25rem',
                  fontFamily: 'neue-montreal'
                }}
                labelStyle={{ color: '#FFFFFF' }}
              />
              <Legend 
                wrapperStyle={{ fontFamily: 'neue-montreal', fontSize: '14px', color: '#A0A0A0' }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
import React from 'react';
import { Filter } from 'lucide-react';

const categories = [
  { id: 'portraits', name: 'Portraits' },
  { id: 'products', name: 'Products' },
  { id: 'art', name: 'Art Styles' },
  { id: 'pets', name: 'Pets' },
  { id: 'food', name: 'Food' },
];

interface FilterPanelProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="w-full md:w-64 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 h-fit">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>
      
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(
              category.id === selectedCategory ? null : category.id
            )}
            className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
              category.id === selectedCategory
                ? 'bg-purple-600'
                : 'hover:bg-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};
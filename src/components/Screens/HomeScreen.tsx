import React from 'react';
import {
  Utensils,
  Coffee,
  ShoppingCart,
  Calendar,
  Cross,
  Building2,
} from 'lucide-react';
import { StylizedMap } from '../StylizedMap';
import { CategoryOption, FilterState } from '../../types';

interface HomeScreenProps {
  filters: FilterState;
  onOpenFilters: () => void;
  onNavigateToSagre: () => void;
  onSelectCategory: (category: CategoryOption) => void;
}

const HOME_CATEGORIES: Array<{
  id: CategoryOption;
  label: string;
  icon: React.FC<{ className?: string }>;
}> = [
  { id: 'ristoranti', label: 'Ristoranti', icon: Utensils },
  { id: 'bar', label: 'Bar', icon: Coffee },
  { id: 'supermercati', label: 'Supermercati', icon: ShoppingCart },
  { id: 'eventi', label: 'Eventi', icon: Calendar },
  { id: 'farmacie', label: 'Farmacie', icon: Cross },
  { id: 'hotel', label: 'Hotel', icon: Building2 },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  filters,
  onOpenFilters,
  onNavigateToSagre,
  onSelectCategory,
}) => {
  return (
    <div className="flex-1 w-full flex flex-col bg-white overflow-y-auto p-4 space-y-4">
      {/* Primary Section: Stylized Map replacing the Map button */}
      <div className="shrink-0">
        {/* Real stylized B&W vector map with filter button embedded inside! */}
        <StylizedMap
          onOpenFilters={onOpenFilters}
          activeFilters={filters}
          heightClass="h-56"
          distanzaMeters={filters.distanzaMeters}
        />
      </div>

      {/* Category Square Grid (2 columns, scrollable vertically) */}
      <div className="grid grid-cols-2 gap-3 pb-2">
        {HOME_CATEGORIES.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => {
                if (category.id === 'eventi') {
                  onNavigateToSagre();
                } else {
                  onSelectCategory(category.id);
                }
              }}
              className="aspect-square w-full border-2 border-black bg-zinc-50 hover:bg-black hover:text-white transition-colors p-3.5 flex flex-col justify-between text-left group shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
            >
              <div className="w-8 h-8 border-2 border-black bg-white text-black group-hover:border-white flex items-center justify-center">
                <IconComponent className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider leading-tight">
                {category.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

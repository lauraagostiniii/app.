import React from 'react';
import { Search, ChevronLeft } from 'lucide-react';

interface TopHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  onSearchClick: () => void;
  isSearchActive?: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  onSearchClick,
  isSearchActive = false,
}) => {
  return (
    <header className="w-full bg-white border-b-2 border-black px-4 py-2.5 flex items-center justify-between shrink-0 select-none z-30">
      {/* Left side: Back button or Logo mark */}
      <div className="flex items-center space-x-2">
        {showBack ? (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-tight py-1 px-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Indietro</span>
          </button>
        ) : (
          <div className="flex items-center space-x-1.5">
            <div className="w-4 h-4 border-2 border-black bg-black" />
            <div>
              <h1 className="text-sm font-black tracking-wider uppercase leading-none">{title}</h1>
              {subtitle && <p className="text-[9px] font-mono text-zinc-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
        )}
      </div>

      {showBack && (
        <div className="text-center font-black text-xs uppercase tracking-wider truncate max-w-[140px]">
          {title}
        </div>
      )}

      {/* Right side: CERCA IN ALTO A DESTRA (as explicitly required) */}
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={onSearchClick}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 border-2 border-black transition-all ${
            isSearchActive
              ? 'bg-black text-white shadow-[2px_2px_0px_#71717a]'
              : 'bg-white text-black hover:bg-black hover:text-white shadow-[2px_2px_0px_#000]'
          }`}
          title="Cerca"
          aria-label="Cerca"
        >
          <Search className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="text-[11px] font-bold uppercase tracking-wider">Cerca</span>
        </button>
      </div>
    </header>
  );
};

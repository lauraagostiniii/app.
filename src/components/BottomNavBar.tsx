import React from 'react';
import { Home, Bookmark, PlusCircle, User } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs: Array<{ id: TabType; label: string; icon: React.FC<{ className?: string }> }> = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'preferiti', label: 'Preferiti', icon: Bookmark },
    { id: 'aggiungi', label: 'Aggiungi', icon: PlusCircle },
    { id: 'profilo', label: 'Profilo', icon: User },
  ];

  return (
    <nav
      className="w-full bg-white border-t-2 border-black flex items-center justify-around py-1.5 px-2 shrink-0 select-none z-30"
      aria-label="Navigazione principale"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const IconComponent = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 transition-colors min-w-[64px] ${
              isActive ? 'text-black' : 'text-zinc-400 hover:text-black'
            }`}
          >
            <div
              className={`p-1 transition-all ${
                isActive ? 'border-2 border-black bg-black text-white shadow-[1px_1px_0px_#000]' : 'border border-transparent'
              }`}
            >
              <IconComponent className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span
              className={`text-[10px] mt-1 tracking-tight uppercase ${
                isActive ? 'font-black underline underline-offset-2' : 'font-semibold'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

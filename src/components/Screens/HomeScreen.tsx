import React from 'react';
import { Calendar, ChevronRight, ShieldCheck, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import { StylizedMap } from '../StylizedMap';
import { FilterState } from '../../types';

interface HomeScreenProps {
  filters: FilterState;
  onOpenFilters: () => void;
  onNavigateToSagre: () => void;
  onNavigateToSearch: () => void;
  onNavigateToFavorites: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  filters,
  onOpenFilters,
  onNavigateToSagre,
  onNavigateToSearch,
  onNavigateToFavorites,
}) => {
  return (
    <div className="flex-1 w-full flex flex-col bg-white overflow-y-auto p-4 space-y-4">
      {/* Flow Indicator Banner */}
      <div className="flex items-center justify-between border-2 border-black p-2 bg-zinc-50">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 bg-black" />
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
            Wireframe B&N • iPhone 13 Pro
          </span>
        </div>
        <span className="text-[9px] font-mono text-zinc-600 bg-white border border-black px-1.5 py-0.5">
          v1.0
        </span>
      </div>

      {/* Primary Section: Stylized Map replacing the Map button */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Mappa del Territorio</span>
          </label>
          <span className="text-[9px] font-mono text-zinc-500">
            [Filtri integrati nella mappa]
          </span>
        </div>

        {/* Real stylized B&W vector map with filter button embedded inside! */}
        <StylizedMap
          onOpenFilters={onOpenFilters}
          activeFilters={filters}
          heightClass="h-56"
          distanzaMeters={filters.distanzaMeters}
        />

        {/* Status bar showing current filter selection */}
        <div className="flex items-center justify-between border border-black bg-zinc-50 px-2.5 py-1.5 text-[10px]">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-bold uppercase">Contaminazione:</span>
            <span className="font-mono underline uppercase font-semibold">
              {filters.gradoContaminazione}
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenFilters}
            className="text-[9px] font-bold uppercase underline hover:bg-black hover:text-white px-1 transition-colors"
          >
            Modifica
          </button>
        </div>
      </div>

      {/* Flow 2: Eventi -> Sagre */}
      <div className="space-y-2 pt-1 border-t-2 border-black">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 stroke-[2.5]" />
            <h2 className="text-xs font-black uppercase tracking-wider">Eventi sul territorio</h2>
          </div>
          <span className="text-[9px] font-mono bg-black text-white px-1">FLOW 2</span>
        </div>

        {/* Eventi Card leading to Sagre */}
        <button
          type="button"
          onClick={onNavigateToSagre}
          className="w-full border-2 border-black p-3 bg-white hover:bg-zinc-100 transition-colors flex items-center justify-between group shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
        >
          <div className="text-left">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-black rounded-none" />
              <span className="text-xs font-black uppercase tracking-tight group-hover:underline">
                Sagre e Fiere Locali
              </span>
            </div>
            <p className="text-[10px] font-mono text-zinc-600 mt-1 pl-4">
              Visualizza programmazione sagre nel raggio selezionato
            </p>
          </div>
          <ChevronRight className="w-4 h-4 stroke-[2.5] text-black group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Direct Flow Quick Launchers (Clean wireframe shortcuts for flows from user's post-its) */}
      <div className="space-y-2 pt-1 border-t-2 border-black">
        <div className="flex items-center justify-between">
          <h2 className="text-[11px] font-black uppercase tracking-wider">Flussi Wireframe Post-it</h2>
          <span className="text-[9px] font-mono text-zinc-500">4 percorsi</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Flow 1 Shortcut */}
          <button
            type="button"
            onClick={onOpenFilters}
            className="border-2 border-black p-2 text-left bg-zinc-50 hover:bg-black hover:text-white transition-colors group"
          >
            <div className="text-[9px] font-mono text-zinc-500 group-hover:text-zinc-300">FLUSSO 1</div>
            <div className="text-xs font-bold uppercase mt-0.5 leading-tight">
              Mappa → Filtri Contaminazione
            </div>
          </button>

          {/* Flow 2 Shortcut */}
          <button
            type="button"
            onClick={onNavigateToSagre}
            className="border-2 border-black p-2 text-left bg-zinc-50 hover:bg-black hover:text-white transition-colors group"
          >
            <div className="text-[9px] font-mono text-zinc-500 group-hover:text-zinc-300">FLUSSO 2</div>
            <div className="text-xs font-bold uppercase mt-0.5 leading-tight">
              Eventi → Sagre in Programma
            </div>
          </button>

          {/* Flow 3 Shortcut */}
          <button
            type="button"
            onClick={onNavigateToFavorites}
            className="border-2 border-black p-2 text-left bg-zinc-50 hover:bg-black hover:text-white transition-colors group"
          >
            <div className="text-[9px] font-mono text-zinc-500 group-hover:text-zinc-300">FLUSSO 3</div>
            <div className="text-xs font-bold uppercase mt-0.5 leading-tight">
              Preferiti → Viaggio Vienna → Saker
            </div>
          </button>

          {/* Flow 4 Shortcut */}
          <button
            type="button"
            onClick={onNavigateToSearch}
            className="border-2 border-black p-2 text-left bg-zinc-50 hover:bg-black hover:text-white transition-colors group"
          >
            <div className="text-[9px] font-mono text-zinc-500 group-hover:text-zinc-300">FLUSSO 4</div>
            <div className="text-xs font-bold uppercase mt-0.5 leading-tight">
              Cerca → Ristoranti 100m
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

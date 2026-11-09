import React, { useState } from 'react';
import { Search, SlidersHorizontal, MapPin, AlertCircle, Utensils, X, ArrowRight } from 'lucide-react';
import { StylizedMap } from '../StylizedMap';
import { FilterState } from '../../types';

interface SearchFlowScreenProps {
  onOpenFilters: () => void;
  filters: FilterState;
  onUpdateFilters: (newFilters: FilterState) => void;
  onResetSearch: () => void;
}

export const SearchFlowScreen: React.FC<SearchFlowScreenProps> = ({
  onOpenFilters,
  filters,
  onUpdateFilters,
  onResetSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('Ristoranti');
  const is100m = filters.distanzaMeters === 100;
  const isRistoranti = filters.categoria === 'ristoranti' || searchQuery.toLowerCase().includes('ristoran');

  return (
    <div className="flex-1 w-full flex flex-col bg-white overflow-y-auto p-4 space-y-3 justify-between">
      <div className="space-y-3">
        {/* Breadcrumb Path for Flow 4 */}
        <div className="border border-black bg-zinc-50 p-2 flex items-center justify-between text-[10px] font-mono">
          <span className="font-bold">
            CERCA &gt; MAPPA &gt; FILTRI: RISTORANTI ({filters.distanzaMeters}m)
          </span>
          <span className="bg-black text-white px-1">FLOW 4</span>
        </div>

        {/* Search Input Bar (Top) */}
        <div className="relative w-full">
          <div className="flex border-2 border-black bg-white">
            <div className="w-10 flex items-center justify-center border-r-2 border-black bg-zinc-100">
              <Search className="w-4 h-4 stroke-[2.5]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cerca ristoranti, sagre..."
              className="flex-1 px-3 py-2 text-xs font-bold uppercase focus:outline-none placeholder:text-zinc-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-2 flex items-center justify-center hover:bg-zinc-100"
              >
                <X className="w-3.5 h-3.5 text-zinc-500" />
              </button>
            )}
          </div>
        </div>

        {/* Stylized Map View inside Search Flow with embedded filters icon */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="font-bold uppercase flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Mappa di ricerca
            </span>
            <span className="text-zinc-500">Raggio: {filters.distanzaMeters}m</span>
          </div>

          <StylizedMap
            onOpenFilters={onOpenFilters}
            activeFilters={filters}
            heightClass="h-44"
            distanzaMeters={filters.distanzaMeters}
            highlightDist100m={is100m}
          />
        </div>

        {/* Filter Chips Bar (Category + Distance) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={onOpenFilters}
            className="flex items-center gap-1 px-2 py-1 border-2 border-black bg-black text-white text-[10px] font-bold uppercase shrink-0"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Filtri attivi</span>
          </button>

          <button
            type="button"
            onClick={() => onUpdateFilters({ ...filters, categoria: 'ristoranti' })}
            className={`px-2 py-1 border-2 border-black text-[10px] font-mono uppercase font-bold shrink-0 ${
              filters.categoria === 'ristoranti' ? 'bg-zinc-200' : 'bg-white'
            }`}
          >
            Cat: Ristoranti
          </button>

          <button
            type="button"
            onClick={() => onUpdateFilters({ ...filters, distanzaMeters: is100m ? 1000 : 100 })}
            className={`px-2 py-1 border-2 border-black text-[10px] font-mono uppercase font-bold shrink-0 ${
              is100m ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            Dist: {filters.distanzaMeters}m
          </button>
        </div>

        {/* FLOW 4 RESULT:
            When category is "ristoranti" and distance is 100 m:
            "nessun ristorante trovato" (as strictly requested in sticky note!)
        */}
        {is100m ? (
          <div className="border-2 border-black p-5 bg-zinc-50 text-center space-y-3 my-2">
            {/* Wireframe Placeholder Empty Icon */}
            <div className="w-16 h-16 border-2 border-black bg-white mx-auto flex items-center justify-center relative">
              <Utensils className="w-7 h-7 text-zinc-400" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-0.5 bg-black rotate-45" />
              </div>
            </div>

            {/* Exact wording from sticky note */}
            <div>
              <h3 className="text-sm font-black uppercase tracking-wide text-black">
                Nessun ristorante trovato
              </h3>
              <p className="text-[11px] font-mono text-zinc-600 mt-1 max-w-[240px] mx-auto leading-tight">
                Non sono stati individuati ristoranti entro il raggio ristretto di 100 m.
              </p>
            </div>

            {/* Quick helper to expand search radius */}
            <button
              type="button"
              onClick={() => onUpdateFilters({ ...filters, distanzaMeters: 1000 })}
              className="py-2 px-3 border-2 border-black bg-white hover:bg-black hover:text-white text-[11px] font-bold uppercase transition-colors inline-flex items-center gap-1.5 shadow-[2px_2px_0px_#000]"
            >
              <span>Espandi raggio a 1 km</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ) : (
          /* When distance is greater, show simulated wireframe list of restaurants */
          <div className="space-y-2">
            <div className="text-[10px] font-mono text-zinc-500 uppercase">
              Risultati nel raggio di {filters.distanzaMeters} m (1 trovato)
            </div>
            <div className="border-2 border-black p-3 bg-white flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-black uppercase">Trattoria Tipica Senza Glutine</div>
                <div className="text-[10px] font-mono text-zinc-600">Distanza: 280 m • Via Roma 12</div>
                <div className="text-[9px] font-mono bg-zinc-100 border border-black inline-block px-1">
                  Certificato AIC • Zero contaminazione
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onUpdateFilters({ ...filters, distanzaMeters: 100 })}
              className="text-[10px] font-mono uppercase underline text-zinc-600 block mt-1"
            >
              [Testa Flow 4: Imposta distanza su 100 m]
            </button>
          </div>
        )}
      </div>

      {/* Screen Empty Status Confirmation */}
      <div className="border-t border-black pt-2 text-[9px] font-mono text-zinc-500 text-center">
        Wireframe Schermata Vuota • Elementi non richiesti rimossi
      </div>
    </div>
  );
};

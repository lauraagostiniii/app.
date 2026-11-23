import React, { useEffect, useState } from 'react';
import {
  Search,
  MapPin,
  Utensils,
  Coffee,
  ShoppingCart,
  Calendar,
  Cross,
  Building2,
  X,
  ArrowRight,
} from 'lucide-react';
import { StylizedMap } from '../StylizedMap';
import { CategoryOption, FilterState } from '../../types';

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
  const categoryLabels: Record<CategoryOption, string> = {
    tutti: 'Tutti',
    ristoranti: 'Ristoranti',
    sagre: 'Sagre',
    bar: 'Bar',
    supermercati: 'Supermercati',
    eventi: 'Eventi',
    farmacie: 'Farmacie',
    hotel: 'Hotel',
  };

  const emptyStateByCategory: Record<
    CategoryOption,
    { title: string; subtitle: string; icon: React.FC<{ className?: string }> }
  > = {
    ristoranti: {
      title: 'Nessun ristorante trovato',
      subtitle: 'Non sono stati individuati ristoranti entro il raggio ristretto di 100 m.',
      icon: Utensils,
    },
    bar: {
      title: 'Nessun bar trovato',
      subtitle: 'Non sono stati individuati bar entro il raggio ristretto di 100 m.',
      icon: Coffee,
    },
    supermercati: {
      title: 'Nessun supermercato trovato',
      subtitle: 'Non sono stati individuati supermercati entro il raggio ristretto di 100 m.',
      icon: ShoppingCart,
    },
    eventi: {
      title: 'Nessun evento trovato',
      subtitle: 'Non sono stati individuati eventi entro il raggio ristretto di 100 m.',
      icon: Calendar,
    },
    sagre: {
      title: 'Nessuna sagra trovata',
      subtitle: 'Non sono state individuate sagre entro il raggio ristretto di 100 m.',
      icon: Calendar,
    },
    farmacie: {
      title: 'Nessuna farmacia trovata',
      subtitle: 'Non sono state individuate farmacie entro il raggio ristretto di 100 m.',
      icon: Cross,
    },
    hotel: {
      title: 'Nessun hotel trovato',
      subtitle: 'Non sono stati individuati hotel entro il raggio ristretto di 100 m.',
      icon: Building2,
    },
    tutti: {
      title: 'Nessun risultato trovato',
      subtitle: 'Non sono stati individuati risultati entro il raggio ristretto di 100 m.',
      icon: Search,
    },
  };

  const sampleResultByCategory: Record<
    CategoryOption,
    { name: string; meta: string; badge: string }
  > = {
    ristoranti: {
      name: 'Trattoria Tipica Senza Glutine',
      meta: 'Distanza: 280 m • Via Roma 12',
      badge: 'Certificato AIC • Zero contaminazione',
    },
    bar: {
      name: 'Bar Caffetteria Senza Glutine',
      meta: 'Distanza: 220 m • C.so Italia 8',
      badge: 'Prodotti confezionati • Zero contaminazione',
    },
    supermercati: {
      name: 'Supermercato Reparto Senza Glutine',
      meta: 'Distanza: 350 m • V.le dei Tigli 24',
      badge: 'Corsia dedicata • Prodotti certificati',
    },
    farmacie: {
      name: 'Farmacia Centrale Senza Glutine',
      meta: 'Distanza: 310 m • Via Roma 45',
      badge: 'Alimenti erogabili • Zero contaminazione',
    },
    hotel: {
      name: 'Hotel Saker',
      meta: 'Distanza: 420 m • Philharmoniker Str. 4',
      badge: 'Cucina separata • Zero contaminazione',
    },
    eventi: {
      name: 'Evento Gastronomico Locale',
      meta: 'Distanza: 480 m • Piazza Centrale',
      badge: 'Stand dedicato • Zero contaminazione',
    },
    sagre: {
      name: 'Sagra Tradizionale Senza Glutine',
      meta: 'Distanza: 600 m • Parco Zona A',
      badge: 'Cucina dedicata • Certificato AIC',
    },
    tutti: {
      name: 'Trattoria Tipica Senza Glutine',
      meta: 'Distanza: 280 m • Via Roma 12',
      badge: 'Certificato AIC • Zero contaminazione',
    },
  };

  const [searchQuery, setSearchQuery] = useState(
    filters.categoria === 'tutti' ? '' : categoryLabels[filters.categoria]
  );

  useEffect(() => {
    setSearchQuery(filters.categoria === 'tutti' ? '' : categoryLabels[filters.categoria]);
  }, [filters.categoria]);

  const inferCategoryFromQuery = (query: string): CategoryOption => {
    const q = query.trim().toLowerCase();
    if (q.includes('supermercat')) return 'supermercati';
    if (q === 'bar' || q.startsWith('bar ') || q.includes(' bar')) return 'bar';
    if (q.includes('farmaci')) return 'farmacie';
    if (q.includes('hotel') || q.includes('alberg')) return 'hotel';
    if (q.includes('sagr')) return 'sagre';
    if (q.includes('event')) return 'eventi';
    if (q.includes('ristoran')) return 'ristoranti';
    return filters.categoria;
  };

  const [showMap, setShowMap] = useState(false);
  const effectiveCategory = inferCategoryFromQuery(searchQuery);
  const isRistoranti = effectiveCategory === 'ristoranti';
  const is100m = filters.distanzaMeters === 100;
  const activeEmptyState = emptyStateByCategory[effectiveCategory] ?? emptyStateByCategory.ristoranti;
  const activeSampleResult = sampleResultByCategory[effectiveCategory] ?? sampleResultByCategory.ristoranti;
  const EmptyStateIcon = activeEmptyState.icon;

  useEffect(() => {
    if (filters.categoria === 'ristoranti') {
      setShowMap(false);
    }
  }, [filters.categoria]);

  return (
    <div className="flex-1 w-full flex flex-col bg-white overflow-y-auto p-4 space-y-3 justify-between">
      <div className="space-y-3">
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
              placeholder="Cerca ristoranti, bar, supermercati..."
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
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono">
            {isRistoranti ? (
              <button
                type="button"
                onClick={() => setShowMap((prev) => !prev)}
                className={`w-10 h-8 border-2 border-black flex items-center justify-center transition-colors shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 ${
                  showMap
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-black hover:text-white'
                }`}
                title={showMap ? 'Nascondi mappa' : 'Mostra mappa'}
                aria-label={showMap ? 'Nascondi mappa' : 'Mostra mappa'}
                aria-expanded={showMap}
              >
                <MapPin className="w-4 h-4 stroke-[2.4]" />
              </button>
            ) : (
              <span />
            )}
            <span className="text-zinc-500">Raggio: {filters.distanzaMeters}m</span>
          </div>

          {(!isRistoranti || showMap) && (
            <StylizedMap
              onOpenFilters={onOpenFilters}
              activeFilters={filters}
              selectedCategory={effectiveCategory}
              heightClass="h-44"
              distanzaMeters={filters.distanzaMeters}
              highlightDist100m={is100m}
            />
          )}
        </div>

        {/* Category-specific Empty State or Results */}
        {is100m ? (
          <div className="border-2 border-black p-5 bg-zinc-50 text-center space-y-3 my-2">
            {/* Wireframe Placeholder Empty Icon */}
            <div className="w-16 h-16 border-2 border-black bg-white mx-auto flex items-center justify-center relative">
              <EmptyStateIcon className="w-7 h-7 text-zinc-400" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-0.5 bg-black rotate-45" />
              </div>
            </div>

            {/* Category-specific empty state wording */}
            <div>
              <h3 className="text-sm font-black uppercase tracking-wide text-black">
                {activeEmptyState.title}
              </h3>
              <p className="text-[11px] font-mono text-zinc-600 mt-1 max-w-[240px] mx-auto leading-tight">
                {activeEmptyState.subtitle}
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
          /* When distance is greater, show simulated wireframe result for active category */
          <div className="space-y-2">
            <div className="text-[10px] font-mono text-zinc-500 uppercase">
              Risultati nel raggio di {filters.distanzaMeters} m (1 {effectiveCategory === 'farmacie' || effectiveCategory === 'sagre' ? 'trovata' : 'trovato'})
            </div>
            <div className="border-2 border-black p-3 bg-white flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-black uppercase">{activeSampleResult.name}</div>
                <div className="text-[10px] font-mono text-zinc-600">{activeSampleResult.meta}</div>
                <div className="text-[9px] font-mono bg-zinc-100 border border-black inline-block px-1">
                  {activeSampleResult.badge}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onUpdateFilters({ ...filters, distanzaMeters: 100 })}
              className="text-[10px] font-mono uppercase underline text-zinc-600 block mt-1"
            >
              Imposta distanza su 100 m
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

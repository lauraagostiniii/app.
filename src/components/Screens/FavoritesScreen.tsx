import React, { useEffect, useState } from 'react';
import {
  Folder,
  FolderPlus,
  ChevronRight,
  Bookmark,
  Heart,
  MapPin,
  Building2,
  Utensils,
  ArrowLeft,
} from 'lucide-react';

type FavoritesSubView =
  | 'cartelle'
  | 'viaggio-vienna'
  | 'preferiti-generici'
  | 'ristoranti-milano'
  | 'hotel-saker';

interface FavoritesScreenProps {
  initialSubView?: 'cartelle' | 'viaggio-vienna' | 'hotel-saker';
}

const FOLDERS: Array<{
  id: 'viaggio-vienna' | 'preferiti-generici' | 'ristoranti-milano';
  label: string;
  countLabel: string;
  icon: React.FC<{ className?: string }>;
}> = [
  { id: 'viaggio-vienna', label: 'Viaggio Vienna', countLabel: '1 elemento', icon: Folder },
  { id: 'preferiti-generici', label: 'Preferiti Generici', countLabel: '0 elementi', icon: Heart },
  { id: 'ristoranti-milano', label: 'Ristoranti Milano', countLabel: '0 elementi', icon: Utensils },
];

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  initialSubView = 'cartelle',
}) => {
  const [subView, setSubView] = useState<FavoritesSubView>(initialSubView);

  useEffect(() => {
    setSubView(initialSubView);
  }, [initialSubView]);

  return (
    <div className="flex-1 w-full flex flex-col bg-white overflow-y-auto p-4 justify-between">
      <div>
        {/* View 1: Cartelle Square Grid */}
        {subView === 'cartelle' && (
          <div className="space-y-3">
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="w-8 h-8 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                title="Nuova cartella"
              >
                <FolderPlus className="w-4 h-4" />
              </button>
            </div>

            {/* 2-Column Square Folder Grid */}
            <div className="grid grid-cols-2 gap-3 pb-2">
              {FOLDERS.map((folder) => {
                const IconComponent = folder.icon;
                return (
                  <button
                    key={folder.id}
                    type="button"
                    onClick={() => setSubView(folder.id)}
                    className="aspect-square w-full border-2 border-black bg-zinc-50 hover:bg-black hover:text-white transition-colors p-3.5 flex flex-col justify-between text-left group shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
                  >
                    <div className="w-8 h-8 border-2 border-black bg-white text-black group-hover:border-white flex items-center justify-center">
                      <IconComponent className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase tracking-wider leading-tight">
                        {folder.label}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 mt-1">
                        {folder.countLabel}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* View 2A: Inside Folder "Viaggio Vienna" */}
        {subView === 'viaggio-vienna' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <button
                type="button"
                onClick={() => setSubView('cartelle')}
                className="flex items-center space-x-1 text-xs font-bold uppercase underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Cartelle</span>
              </button>
              <h2 className="text-xs font-black uppercase tracking-wide">Viaggio Vienna</h2>
            </div>

            <div className="border border-black bg-zinc-50 p-2.5">
              <div className="text-[10px] font-mono text-zinc-600">CARTELLA: VIAGGIO VIENNA</div>
              <div className="text-xs font-bold uppercase">Elementi salvati (1)</div>
            </div>

            {/* Item: Hotel Saker (Post-it requirement) */}
            <button
              type="button"
              onClick={() => setSubView('hotel-saker')}
              className="w-full border-2 border-black p-3 bg-white hover:bg-zinc-100 transition-all flex items-center justify-between shadow-[2px_2px_0px_#000]"
            >
              <div className="flex items-center space-x-3 text-left">
                <div className="w-10 h-10 border-2 border-black bg-black text-white flex items-center justify-center">
                  <Building2 className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-tight">Hotel Saker</div>
                  <div className="text-[10px] font-mono text-zinc-600 mt-0.5">Philharmoniker Str. 4, Vienna</div>
                  <div className="text-[9px] font-mono bg-zinc-100 border border-black inline-block px-1 mt-1">
                    Zero Contaminazione • Pasticceria &amp; Ristorante
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        )}

        {/* View 2B: Inside Folder "Preferiti Generici" or "Ristoranti Milano" */}
        {(subView === 'preferiti-generici' || subView === 'ristoranti-milano') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <button
                type="button"
                onClick={() => setSubView('cartelle')}
                className="flex items-center space-x-1 text-xs font-bold uppercase underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Cartelle</span>
              </button>
              <h2 className="text-xs font-black uppercase tracking-wide">
                {subView === 'preferiti-generici' ? 'Preferiti Generici' : 'Ristoranti Milano'}
              </h2>
            </div>

            <div className="border-2 border-black p-6 bg-zinc-50 text-center space-y-2 mt-6">
              <div className="w-12 h-12 border-2 border-black bg-white mx-auto flex items-center justify-center">
                {subView === 'preferiti-generici' ? (
                  <Heart className="w-5 h-5 stroke-[2]" />
                ) : (
                  <Utensils className="w-5 h-5 stroke-[2]" />
                )}
              </div>
              <div className="text-xs font-black uppercase tracking-wide">
                Nessun elemento salvato
              </div>
              <p className="text-[10px] font-mono text-zinc-600">
                Questa cartella è al momento vuota.
              </p>
            </div>
          </div>
        )}

        {/* View 3: Detail Screen "Hotel Saker" */}
        {subView === 'hotel-saker' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <button
                type="button"
                onClick={() => setSubView('viaggio-vienna')}
                className="flex items-center space-x-1 text-xs font-bold uppercase underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Viaggio Vienna</span>
              </button>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-black" />
                <span className="text-[10px] font-mono font-bold">SALVATO</span>
              </div>
            </div>

            {/* Hotel Wireframe Card */}
            <div className="border-2 border-black p-4 space-y-3 bg-white">
              {/* Wireframe Placeholder for Hotel Photo */}
              <div className="w-full h-32 border-2 border-black bg-zinc-100 relative flex items-center justify-center overflow-hidden">
                <svg className="absolute inset-0 w-full h-full text-zinc-300" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                </svg>
                <div className="z-10 bg-white border border-black px-2 py-1 text-[10px] font-mono uppercase font-bold">
                  [Immagine: Hotel Saker]
                </div>
              </div>

              {/* Title & Info */}
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="text-base font-black uppercase tracking-wide">Hotel Saker</h3>
                  <Bookmark className="w-5 h-5 fill-black text-black" />
                </div>
                <div className="flex items-center space-x-1 mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-mono text-zinc-700">Philharmoniker Str. 4, 1010 Wien</span>
                </div>
              </div>

              {/* Contamination protocol info */}
              <div className="border border-black bg-zinc-50 p-2.5 space-y-1">
                <div className="text-[10px] font-mono font-bold uppercase text-black">
                  Protocollo Contaminazione:
                </div>
                <div className="text-[11px] font-medium leading-snug">
                  Cucina separata per intolleranze &amp; celiachia. Famosa torta Sacher disponibile in versione dedicata senza contaminazione.
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  className="py-2 px-3 border-2 border-black text-xs font-bold uppercase bg-white hover:bg-zinc-100 text-center"
                >
                  Itinerario
                </button>
                <button
                  type="button"
                  className="py-2 px-3 border-2 border-black bg-black text-white text-xs font-bold uppercase text-center"
                >
                  Contatta
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

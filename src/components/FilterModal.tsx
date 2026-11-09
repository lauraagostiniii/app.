import React from 'react';
import { X, Check, ShieldAlert, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { FilterState } from '../types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onUpdateFilters: (newFilters: FilterState) => void;
  onApply: () => void;
  activeFlow?: string | null;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onUpdateFilters,
  onApply,
  activeFlow,
}) => {
  if (!isOpen) return null;

  const contaminationLevels: Array<{ id: FilterState['gradoContaminazione']; label: string; desc: string }> = [
    { id: 'zero', label: 'Zero contaminazione', desc: 'Ambiente/cucina 100% isolata e certificata' },
    { id: 'basso', label: 'Basso rischio', desc: 'Procedure di separazione e sanificazione attive' },
    { id: 'medio', label: 'Medio rischio', desc: 'Presenza di farine/allergeni nello stesso locale' },
    { id: 'alto', label: 'Alto rischio', desc: 'Nessun protocollo di non contaminazione' },
  ];

  const categories: Array<{ id: FilterState['categoria']; label: string }> = [
    { id: 'ristoranti', label: 'Ristoranti' },
    { id: 'sagre', label: 'Sagre' },
    { id: 'hotel', label: 'Hotel' },
    { id: 'bar', label: 'Bar' },
    { id: 'tutti', label: 'Tutti' },
  ];

  const distances = [100, 500, 1000, 5000];

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-[1px]">
      <div className="relative w-full bg-white border-t-2 border-black max-h-[92%] flex flex-col animate-in slide-in-from-bottom duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b-2 border-black bg-zinc-50">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-wide">Filtri Mappa</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            aria-label="Chiudi filtri"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 space-y-5 text-black">
          {/* Section 1: Grado di contaminazione (Post-it Flow 1) */}
          <div className="border-2 border-black p-3 bg-white">
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-black">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                Grado di contaminazione
              </span>
              <span className="text-[10px] font-mono bg-black text-white px-1">FLOW 1</span>
            </div>

            <div className="space-y-1.5">
              {contaminationLevels.map((lvl) => {
                const isSelected = filters.gradoContaminazione === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => onUpdateFilters({ ...filters, gradoContaminazione: lvl.id })}
                    className={`w-full text-left p-2 border transition-all flex items-start justify-between ${
                      isSelected
                        ? 'border-black bg-black text-white'
                        : 'border-zinc-300 hover:border-black bg-zinc-50 text-black'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold leading-tight">{lvl.label}</div>
                      <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                        {lvl.desc}
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 mt-0.5 border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-white bg-white text-black' : 'border-black bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Categoria (Post-it Flow 4) */}
          <div className="border-2 border-black p-3 bg-white">
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-black">
              <span className="text-xs font-bold uppercase tracking-wider">Categoria</span>
              <span className="text-[10px] font-mono bg-zinc-200 text-black px-1 border border-black">FLOW 4</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {categories.map((cat) => {
                const isSelected = filters.categoria === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onUpdateFilters({ ...filters, categoria: cat.id })}
                    className={`p-2 border text-center text-xs font-bold uppercase tracking-tight transition-all ${
                      isSelected
                        ? 'bg-black text-white border-black shadow-[1px_1px_0px_#000]'
                        : 'bg-white text-black border-zinc-300 hover:border-black'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Distanza (Post-it Flow 4: 100 m) */}
          <div className="border-2 border-black p-3 bg-white">
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-black">
              <span className="text-xs font-bold uppercase tracking-wider">
                Distanza: <span className="font-mono">{filters.distanzaMeters >= 1000 ? `${filters.distanzaMeters / 1000} km` : `${filters.distanzaMeters} m`}</span>
              </span>
              <span className="text-[10px] font-mono bg-zinc-200 text-black px-1 border border-black">
                {filters.distanzaMeters === 100 ? '100m = 0 TROVATI' : 'Raggio'}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {distances.map((dist) => {
                const isSelected = filters.distanzaMeters === dist;
                return (
                  <button
                    key={dist}
                    type="button"
                    onClick={() => onUpdateFilters({ ...filters, distanzaMeters: dist })}
                    className={`p-1.5 border text-center font-mono text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-black text-white border-black'
                        : 'bg-zinc-50 text-black border-zinc-300 hover:border-black'
                    }`}
                  >
                    {dist >= 1000 ? `${dist / 1000}km` : `${dist}m`}
                  </button>
                );
              })}
            </div>

            {filters.categoria === 'ristoranti' && filters.distanzaMeters === 100 && (
              <p className="mt-2 text-[10px] font-mono text-zinc-600 bg-zinc-100 p-1.5 border border-dashed border-black">
                Nota: nel raggio di 100 m non sono presenti ristoranti (produrrà l'empty state "Nessun ristorante trovato").
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t-2 border-black bg-zinc-50 flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              onUpdateFilters({
                gradoContaminazione: 'zero',
                categoria: 'tutti',
                distanzaMeters: 1000,
              })
            }
            className="px-3 py-2 border-2 border-black text-xs font-bold uppercase bg-white hover:bg-zinc-100"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onApply}
            className="flex-1 py-2 px-4 border-2 border-black bg-black text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-zinc-800 transition-colors shadow-[2px_2px_0px_#000]"
          >
            <span>Applica Filtri</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

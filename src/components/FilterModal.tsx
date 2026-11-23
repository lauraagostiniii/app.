import React, { useRef, useState } from 'react';
import { X, Check, ShieldAlert, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { CategoryOption, ContaminationLevel, FilterState } from '../types';

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
  const MIN_PRICE = 20;
  const MAX_PRICE = 200;
  const PRICE_STEP = 5;

  const trackRef = useRef<HTMLDivElement>(null);
  const [draggingThumb, setDraggingThumb] = useState<'min' | 'max' | null>(null);

  if (!isOpen) return null;

  const prezzoMin = filters.prezzoMin ?? MIN_PRICE;
  const prezzoMax = filters.prezzoMax ?? MAX_PRICE;

  const minPercent = ((prezzoMin - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  const maxPercent = ((prezzoMax - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;

  const getPriceFromClientX = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return MIN_PRICE;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const raw = MIN_PRICE + ratio * (MAX_PRICE - MIN_PRICE);
    return Math.round(raw / PRICE_STEP) * PRICE_STEP;
  };

  const updatePriceByThumb = (thumb: 'min' | 'max', clientX: number) => {
    const value = getPriceFromClientX(clientX);
    if (thumb === 'min') {
      const clamped = Math.max(MIN_PRICE, Math.min(value, prezzoMax - PRICE_STEP));
      onUpdateFilters({ ...filters, prezzoMin: clamped, prezzoMax });
    } else {
      const clamped = Math.min(MAX_PRICE, Math.max(value, prezzoMin + PRICE_STEP));
      onUpdateFilters({ ...filters, prezzoMin, prezzoMax: clamped });
    }
  };

  const handleTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const value = getPriceFromClientX(e.clientX);
    const distToMin = Math.abs(value - prezzoMin);
    const distToMax = Math.abs(value - prezzoMax);
    const thumb: 'min' | 'max' = distToMin <= distToMax ? 'min' : 'max';
    setDraggingThumb(thumb);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePriceByThumb(thumb, e.clientX);
  };

  const handleTrackPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingThumb) return;
    updatePriceByThumb(draggingThumb, e.clientX);
  };

  const handleTrackPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingThumb) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setDraggingThumb(null);
  };

  const contaminationLevels: Array<{ id: ContaminationLevel; label: string; desc: string }> = [
    { id: 'zero', label: 'Zero contaminazione', desc: 'Ambiente/cucina 100% isolata e certificata' },
    { id: 'basso', label: 'Basso rischio', desc: 'Procedure di separazione e sanificazione attive' },
    { id: 'medio', label: 'Medio rischio', desc: 'Presenza di farine/allergeni nello stesso locale' },
    { id: 'alto', label: 'Alto rischio', desc: 'Nessun protocollo di non contaminazione' },
  ];

  const categories: Array<{ id: CategoryOption; label: string }> = [
    { id: 'ristoranti', label: 'Ristoranti' },
    { id: 'bar', label: 'Bar' },
    { id: 'supermercati', label: 'Supermercati' },
    { id: 'eventi', label: 'Eventi' },
    { id: 'farmacie', label: 'Farmacie' },
    { id: 'hotel', label: 'Hotel' },
    { id: 'sagre', label: 'Sagre' },
    { id: 'tutti', label: 'Tutti' },
  ];

  const toggleContamination = (id: ContaminationLevel) => {
    const current = filters.gradiContaminazione;
    const exists = current.includes(id);
    const next = exists ? current.filter((item) => item !== id) : [...current, id];
    onUpdateFilters({
      ...filters,
      gradiContaminazione: next,
      gradoContaminazione: next[0] ?? 'zero',
    });
  };

  const toggleCategory = (id: CategoryOption) => {
    if (id === 'tutti') {
      onUpdateFilters({
        ...filters,
        categorie: ['tutti'],
        categoria: 'tutti',
      });
      return;
    }

    const withoutTutti = filters.categorie.filter((item) => item !== 'tutti');
    const exists = withoutTutti.includes(id);
    const next = exists ? withoutTutti.filter((item) => item !== id) : [...withoutTutti, id];
    const finalCategories: CategoryOption[] = next.length > 0 ? next : ['tutti'];

    onUpdateFilters({
      ...filters,
      categorie: finalCategories,
      categoria: finalCategories[0],
    });
  };

  const distances = [100, 500, 1000, 5000];

  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-50 flex items-center justify-center p-4 pt-10 pb-6 bg-black/65 backdrop-blur-[3px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full bg-white border-2 border-black shadow-[4px_4px_0px_#000] max-h-[82%] flex flex-col animate-in fade-in zoom-in-95 duration-200"
      >
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
            </div>

            <div className="space-y-1.5">
              {contaminationLevels.map((lvl) => {
                const isSelected = filters.gradiContaminazione.includes(lvl.id);
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => toggleContamination(lvl.id)}
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

          {/* Section 2: Categoria (Multi-select) */}
          <div className="border-2 border-black p-3 bg-white">
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-black">
              <span className="text-xs font-bold uppercase tracking-wider">Categoria</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {categories.map((cat) => {
                const isSelected = filters.categorie.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className={`p-2 border text-xs font-bold uppercase tracking-tight transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-black text-white border-black shadow-[1px_1px_0px_#000]'
                        : 'bg-white text-black border-zinc-300 hover:border-black'
                    }`}
                  >
                    <span className="truncate">{cat.label}</span>
                    <span
                      className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 ml-1 ${
                        isSelected ? 'border-white bg-white text-black' : 'border-black bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </span>
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
          </div>

          {/* Section 4: Prezzo (Dual-thumb wireframe slider 20 - 200) */}
          <div className="border-2 border-black p-3 bg-white">
            <div className="mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Prezzo</span>
            </div>

            <div className="px-2">
              {/* Interactive Track */}
              <div
                ref={trackRef}
                onPointerDown={handleTrackPointerDown}
                onPointerMove={handleTrackPointerMove}
                onPointerUp={handleTrackPointerUp}
                onPointerCancel={handleTrackPointerUp}
                className="relative h-7 flex items-center cursor-pointer touch-none select-none"
              >
                {/* Base Line */}
                <div className="w-full h-[1.5px] bg-zinc-300" />

                {/* Selected Range Line */}
                <div
                  className="absolute h-[2px] bg-black"
                  style={{
                    left: `${minPercent}%`,
                    width: `${maxPercent - minPercent}%`,
                  }}
                />

                {/* Min Thumb (Hollow circle with black stroke) */}
                <button
                  type="button"
                  role="slider"
                  aria-label="Prezzo minimo"
                  aria-valuemin={MIN_PRICE}
                  aria-valuemax={prezzoMax - PRICE_STEP}
                  aria-valuenow={prezzoMin}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    setDraggingThumb('min');
                    trackRef.current?.setPointerCapture(e.pointerId);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowLeft') {
                      onUpdateFilters({
                        ...filters,
                        prezzoMin: Math.max(MIN_PRICE, prezzoMin - PRICE_STEP),
                        prezzoMax,
                      });
                    } else if (e.key === 'ArrowRight') {
                      onUpdateFilters({
                        ...filters,
                        prezzoMin: Math.min(prezzoMax - PRICE_STEP, prezzoMin + PRICE_STEP),
                        prezzoMax,
                      });
                    }
                  }}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-black focus:outline-none focus:ring-2 focus:ring-black/30"
                  style={{ left: `${minPercent}%` }}
                />

                {/* Max Thumb (Hollow circle with black stroke) */}
                <button
                  type="button"
                  role="slider"
                  aria-label="Prezzo massimo"
                  aria-valuemin={prezzoMin + PRICE_STEP}
                  aria-valuemax={MAX_PRICE}
                  aria-valuenow={prezzoMax}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    setDraggingThumb('max');
                    trackRef.current?.setPointerCapture(e.pointerId);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowLeft') {
                      onUpdateFilters({
                        ...filters,
                        prezzoMin,
                        prezzoMax: Math.max(prezzoMin + PRICE_STEP, prezzoMax - PRICE_STEP),
                      });
                    } else if (e.key === 'ArrowRight') {
                      onUpdateFilters({
                        ...filters,
                        prezzoMin,
                        prezzoMax: Math.min(MAX_PRICE, prezzoMax + PRICE_STEP),
                      });
                    }
                  }}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-black focus:outline-none focus:ring-2 focus:ring-black/30"
                  style={{ left: `${maxPercent}%` }}
                />
              </div>

              {/* Min & Max Numeric Labels (20 — 200) */}
              <div className="flex items-center justify-between mt-1 text-sm font-medium tabular-nums text-black">
                <span>{prezzoMin}</span>
                <span>{prezzoMax}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t-2 border-black bg-zinc-50 flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              onUpdateFilters({
                gradoContaminazione: 'zero',
                gradiContaminazione: ['zero'],
                prezzoMin: MIN_PRICE,
                prezzoMax: MAX_PRICE,
                categoria: 'tutti',
                categorie: ['tutti'],
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

import React from 'react';
import { CalendarX2, ArrowLeft, RefreshCw } from 'lucide-react';

interface EventiSagreScreenProps {
  onBack: () => void;
}

export const EventiSagreScreen: React.FC<EventiSagreScreenProps> = ({ onBack }) => {
  return (
    <div className="flex-1 w-full flex flex-col bg-white overflow-y-auto p-4 justify-between">
      {/* Top Breadcrumb Path */}
      <div className="border border-black bg-zinc-50 p-2 flex items-center justify-between text-[10px] font-mono">
        <span className="font-bold">HOME &gt; EVENTI &gt; SAGRE</span>
        <span className="bg-black text-white px-1">FLOW 2</span>
      </div>

      {/* Main Empty State: "Nessuna sagra in programma" */}
      <div className="my-auto py-12 flex flex-col items-center text-center px-4">
        {/* Wireframe Placeholder Box with Diagonal Crossing (Classic Blueprint/Wireframe placeholder) */}
        <div className="relative w-28 h-28 border-2 border-black bg-zinc-50 mb-6 flex items-center justify-center overflow-hidden">
          {/* Diagonal lines */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-full text-zinc-300" viewBox="0 0 100 100">
              <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
          </div>
          <CalendarX2 className="w-10 h-10 stroke-[2] text-black z-10" />
        </div>

        {/* Exact phrase from user sticky note: "nessuna sagra in programma" */}
        <h2 className="text-base font-black uppercase tracking-wide text-black max-w-[240px]">
          Nessuna sagra in programma
        </h2>

        <p className="text-xs font-mono text-zinc-600 mt-2 max-w-[260px] leading-relaxed">
          Al momento non ci sono sagre o fiere gastronomiche pianificate per questo periodo nella zona selezionata.
        </p>

        {/* Wireframe Action Button */}
        <div className="mt-8 flex flex-col w-full max-w-[220px] space-y-2">
          <button
            type="button"
            onClick={onBack}
            className="w-full py-2.5 px-4 border-2 border-black bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-[2px_2px_0px_#000]"
          >
            Torna alla Home
          </button>
        </div>
      </div>

      {/* Bottom Technical Note */}
      <div className="border-t border-black pt-2 text-[9px] font-mono text-zinc-500 text-center">
        Wireframe Schermata Vuota • Elementi non richiesti rimossi
      </div>
    </div>
  );
};

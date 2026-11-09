import React, { useState } from 'react';
import { SlidersHorizontal, Plus, Minus, Navigation, MapPin } from 'lucide-react';
import { FilterState } from '../types';

interface StylizedMapProps {
  onOpenFilters?: () => void;
  activeFilters?: FilterState;
  heightClass?: string;
  showPinLabel?: boolean;
  selectedCategory?: string;
  distanzaMeters?: number;
  highlightDist100m?: boolean;
}

export const StylizedMap: React.FC<StylizedMapProps> = ({
  onOpenFilters,
  activeFilters,
  heightClass = 'h-64',
  showPinLabel = true,
  distanzaMeters,
  highlightDist100m = false,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedPin, setSelectedPin] = useState<string | null>(null);

  const filterCount = activeFilters
    ? (activeFilters.gradoContaminazione !== 'zero' ? 1 : 0) +
      (activeFilters.categoria !== 'tutti' ? 1 : 0) +
      (activeFilters.distanzaMeters === 100 ? 1 : 0)
    : 0;

  return (
    <div className={`relative w-full ${heightClass} border-2 border-black bg-white overflow-hidden select-none`}>
      {/* Background Cartography Grid & Streets */}
      <svg
        className="w-full h-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        style={{
          transform: `scale(${zoomLevel})`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <defs>
          {/* Wireframe diagonal hatching for parks / zones */}
          <pattern id="diagonalHatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="10" stroke="#d4d4d8" strokeWidth="1" />
          </pattern>
          {/* Wireframe dot grid */}
          <pattern id="dotGrid" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.75" fill="#a1a1aa" />
          </pattern>
        </defs>

        {/* Base dot grid */}
        <rect width="100%" height="100%" fill="url(#dotGrid)" />

        {/* Park / Green wireframe hatched area */}
        <polygon points="260,20 380,20 370,120 280,100" fill="url(#diagonalHatch)" stroke="#000" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="300" y="65" fontSize="8" fontFamily="monospace" fill="#71717a" textAnchor="middle">PARCO [ZONA A]</text>

        {/* River / Canal in B&W */}
        <path
          d="M -20,200 C 90,210 160,160 220,180 C 290,200 350,260 420,270"
          fill="none"
          stroke="#000000"
          strokeWidth="14"
        />
        <path
          d="M -20,200 C 90,210 160,160 220,180 C 290,200 350,260 420,270"
          fill="none"
          stroke="#ffffff"
          strokeWidth="11"
        />
        <path
          d="M -20,200 C 90,210 160,160 220,180 C 290,200 350,260 420,270"
          fill="none"
          stroke="#000000"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Urban Blocks (Wireframe Buildings) */}
        <rect x="25" y="30" width="55" height="45" fill="#f4f4f5" stroke="#000000" strokeWidth="1.5" />
        <rect x="95" y="30" width="70" height="45" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
        <rect x="180" y="30" width="60" height="35" fill="#f4f4f5" stroke="#000000" strokeWidth="1.5" />

        <rect x="25" y="90" width="65" height="50" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
        <rect x="105" y="90" width="55" height="50" fill="#f4f4f5" stroke="#000000" strokeWidth="1.5" />
        <rect x="175" y="80" width="75" height="60" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />

        <rect x="30" y="155" width="80" height="35" fill="#f4f4f5" stroke="#000000" strokeWidth="1.5" />
        <rect x="125" y="155" width="45" height="35" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />

        <rect x="250" y="195" width="60" height="40" fill="#f4f4f5" stroke="#000000" strokeWidth="1.5" />
        <rect x="325" y="175" width="55" height="55" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />

        {/* Main Road System */}
        {/* Horizontal Avenues */}
        <line x1="0" y1="80" x2="400" y2="80" stroke="#000000" strokeWidth="7" />
        <line x1="0" y1="80" x2="400" y2="80" stroke="#ffffff" strokeWidth="5" />
        <line x1="0" y1="80" x2="400" y2="80" stroke="#000000" strokeWidth="0.75" strokeDasharray="3 3" />

        <line x1="0" y1="145" x2="400" y2="145" stroke="#000000" strokeWidth="6" />
        <line x1="0" y1="145" x2="400" y2="145" stroke="#ffffff" strokeWidth="4" />

        {/* Vertical Streets */}
        <line x1="85" y1="0" x2="85" y2="300" stroke="#000000" strokeWidth="5" />
        <line x1="85" y1="0" x2="85" y2="300" stroke="#ffffff" strokeWidth="3" />

        <line x1="165" y1="0" x2="165" y2="300" stroke="#000000" strokeWidth="6" />
        <line x1="165" y1="0" x2="165" y2="300" stroke="#ffffff" strokeWidth="4" />
        <line x1="165" y1="0" x2="165" y2="300" stroke="#000000" strokeWidth="0.75" strokeDasharray="3 3" />

        <line x1="245" y1="0" x2="245" y2="300" stroke="#000000" strokeWidth="5" />
        <line x1="245" y1="0" x2="245" y2="300" stroke="#ffffff" strokeWidth="3" />

        {/* Diagonal Arterial Road */}
        <line x1="10" y1="280" x2="380" y2="20" stroke="#000000" strokeWidth="7" />
        <line x1="10" y1="280" x2="380" y2="20" stroke="#ffffff" strokeWidth="5" />
        <line x1="10" y1="280" x2="380" y2="20" stroke="#000000" strokeWidth="0.75" strokeDasharray="4 4" />

        {/* Street Names (Wireframe Typography) */}
        <text x="12" y="76" fontSize="7" fontFamily="sans-serif" fontWeight="700" fill="#000000">C.SO ITALIA</text>
        <text x="170" y="24" fontSize="7" fontFamily="sans-serif" fontWeight="700" fill="#000000" transform="rotate(90 170,24)">VIA ROMA</text>
        <text x="210" y="165" fontSize="6.5" fontFamily="sans-serif" fontWeight="700" fill="#000000" transform="rotate(-35 210,165)">V.LE DEI TIGLI</text>

        {/* User Location Pulse (Center) */}
        <circle cx="165" cy="145" r="14" fill="none" stroke="#000000" strokeWidth="1" strokeDasharray="2 2" className="animate-ping" />
        <circle cx="165" cy="145" r="5" fill="#000000" />
        <circle cx="165" cy="145" r="2" fill="#ffffff" />

        {/* 100m Radius Circle if selected/highlighted */}
        {(highlightDist100m || distanzaMeters === 100) && (
          <g>
            <circle cx="165" cy="145" r="32" fill="none" stroke="#000000" strokeWidth="1.5" strokeDasharray="3 3" />
            <rect x="178" y="137" width="46" height="14" fill="#000000" />
            <text x="201" y="147" fontSize="7" fontFamily="monospace" fontWeight="700" fill="#ffffff" textAnchor="middle">
              R: 100 m
            </text>
          </g>
        )}

        {/* Map Pins / Wireframe Points of Interest */}
        {/* Pin A: Hotel Saker zone */}
        <g
          className="cursor-pointer"
          onClick={() => setSelectedPin(selectedPin === 'saker' ? null : 'saker')}
        >
          <path d="M 285,115 C 285,108 295,108 295,115 C 295,124 290,132 290,132 C 290,132 285,124 285,115 Z" fill="#000000" stroke="#000000" strokeWidth="1" />
          <circle cx="290" cy="115" r="2.5" fill="#ffffff" />
          {selectedPin === 'saker' && (
            <g>
              <rect x="250" y="90" width="80" height="18" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
              <text x="290" y="102" fontSize="7.5" fontWeight="bold" fill="#000000" textAnchor="middle">Hotel Saker</text>
            </g>
          )}
        </g>

        {/* Pin B: Ristorante (beyond 100m radius e.g. at 280m) */}
        {(!highlightDist100m && distanzaMeters !== 100) && (
          <g
            className="cursor-pointer"
            onClick={() => setSelectedPin(selectedPin === 'ristorante' ? null : 'ristorante')}
          >
            <path d="M 125,55 C 125,48 135,48 135,55 C 135,64 130,72 130,72 C 130,72 125,64 125,55 Z" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="130" cy="55" r="2.5" fill="#000000" />
            {selectedPin === 'ristorante' && (
              <g>
                <rect x="90" y="30" width="80" height="18" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
                <text x="130" y="42" fontSize="7.5" fontWeight="bold" fill="#000000" textAnchor="middle">Ristorante Tipico</text>
              </g>
            )}
          </g>
        )}
      </svg>

      {/* Stylized Compass / Scale Bar in B&W */}
      <div className="absolute bottom-2 left-2 pointer-events-none flex items-center space-x-1.5 bg-white/90 px-1.5 py-0.5 border border-black text-[9px] font-mono">
        <span className="w-6 border-b-2 border-black inline-block text-center text-[7px] leading-tight">100m</span>
        <span className="text-zinc-600 font-bold">N ↑</span>
      </div>

      {/* Map Interactive Zoom Buttons (Stylized Wireframe) */}
      <div className="absolute bottom-2 right-2 flex flex-col space-y-1">
        <button
          type="button"
          onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2))}
          className="w-7 h-7 bg-white border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[1px_1px_0px_#000]"
          aria-label="Zoom in"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.8))}
          className="w-7 h-7 bg-white border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[1px_1px_0px_#000]"
          aria-label="Zoom out"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* CRITICAL USER REQUIREMENT:
          "al posto del tasto mappa metti una mappa vera molto stilizzata e all'interno un icona dei filtri."
          -> Inside the stylized map, we display the Filtri button/icon!
      */}
      <div className="absolute top-2.5 right-2.5 z-10">
        <button
          type="button"
          onClick={onOpenFilters}
          className="group flex items-center gap-1.5 bg-white text-black px-2.5 py-1.5 border-2 border-black hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
          title="Filtri mappa"
        >
          <SlidersHorizontal className="w-4 h-4 stroke-[2.2]" />
          <span className="text-[11px] font-bold tracking-tight uppercase">Filtri</span>
          {filterCount > 0 && (
            <span className="ml-0.5 w-4 h-4 rounded-none bg-black text-white text-[9px] font-mono flex items-center justify-center group-hover:bg-white group-hover:text-black border border-current">
              {filterCount}
            </span>
          )}
        </button>
      </div>

      {/* Map Wireframe Watermark Indicator */}
      <div className="absolute top-2.5 left-2.5 pointer-events-none bg-black text-white px-1.5 py-0.5 text-[8px] font-mono uppercase tracking-widest">
        Mappa Vettoriale B&N
      </div>
    </div>
  );
};

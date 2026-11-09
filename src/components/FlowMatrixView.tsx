import React from 'react';
import { ArrowRight, Play, Eye } from 'lucide-react';
import { FlowId, ScreenId } from '../types';

interface FlowMatrixViewProps {
  onSelectFlow: (flowId: FlowId, startScreen: ScreenId) => void;
}

export const FlowMatrixView: React.FC<FlowMatrixViewProps> = ({ onSelectFlow }) => {
  const flows = [
    {
      id: 'flow1' as FlowId,
      name: 'Flusso 1 (Azzurro): Mappa & Grado Contaminazione',
      colorBadge: 'bg-sky-100 text-sky-900 border-sky-400',
      postits: [
        { label: 'home', screen: 'home' as ScreenId },
        { label: 'mappa', screen: 'home' as ScreenId },
        { label: 'filtri', screen: 'home' as ScreenId },
        { label: 'grado di contaminazione', screen: 'home' as ScreenId },
      ],
      desc: 'Dalla Home, al posto del pulsante c’è la mappa stilizzata B&N. All’interno della mappa l’icona dei filtri apre il selettore del grado di contaminazione (Zero, Basso, Medio, Alto).',
    },
    {
      id: 'flow2' as FlowId,
      name: 'Flusso 2 (Verde): Eventi & Sagre',
      colorBadge: 'bg-emerald-100 text-emerald-900 border-emerald-400',
      postits: [
        { label: 'home', screen: 'home' as ScreenId },
        { label: 'eventi', screen: 'eventi' as ScreenId },
        { label: 'sagre', screen: 'sagre' as ScreenId },
        { label: 'nessuna sagra in programma', screen: 'sagre' as ScreenId },
      ],
      desc: 'Dalla Home si accede alla sezione Eventi, si selezionano le Sagre e viene mostrata la schermata vuota wireframe con la dicitura esatta "Nessuna sagra in programma".',
    },
    {
      id: 'flow3' as FlowId,
      name: 'Flusso 3 (Rosa): Preferiti & Viaggio Vienna',
      colorBadge: 'bg-pink-100 text-pink-900 border-pink-400',
      postits: [
        { label: 'home', screen: 'home' as ScreenId },
        { label: 'preferiti', screen: 'preferiti-cartelle' as ScreenId },
        { label: 'cartelle', screen: 'preferiti-cartelle' as ScreenId },
        { label: 'viaggio vienna', screen: 'viaggio-vienna' as ScreenId },
        { label: 'hotel saker', screen: 'hotel-saker' as ScreenId },
      ],
      desc: 'Dalla barra di navigazione inferiore si seleziona Preferiti > Cartelle, si apre la cartella "Viaggio Vienna" e si visualizza la scheda salvata dell’Hotel Saker.',
    },
    {
      id: 'flow4' as FlowId,
      name: 'Flusso 4 (Arancione): Cerca, Filtri & Ristoranti 100m',
      colorBadge: 'bg-orange-100 text-orange-900 border-orange-400',
      postits: [
        { label: 'home', screen: 'home' as ScreenId },
        { label: 'cerca', screen: 'cerca' as ScreenId },
        { label: 'mappa', screen: 'cerca' as ScreenId },
        { label: 'filtri', screen: 'cerca-mappa-filtri' as ScreenId },
        { label: 'ristoranti', screen: 'cerca-risultati-ristoranti' as ScreenId },
        { label: 'distanza (100 m)', screen: 'cerca-risultati-ristoranti' as ScreenId },
        { label: 'nessun ristorante trovato', screen: 'cerca-risultati-ristoranti' as ScreenId },
      ],
      desc: 'Pulsante Cerca in alto a destra > Mappa di ricerca > Filtro categoria Ristoranti e distanza 100 m > Schermata vuota: "Nessun ristorante trovato".',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Header Info */}
      <div className="border-2 border-black p-5 bg-white shadow-[4px_4px_0px_#000]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-black" />
              <h1 className="text-lg font-black uppercase tracking-wider">
                Mappa Architettura &amp; Wireframe dei Flussi
              </h1>
            </div>
            <p className="text-xs font-mono text-zinc-600 mt-1">
              Ricostruzione fedele dei 4 percorsi a post-it per iPhone 13 Pro in puro Bianco &amp; Nero (B&amp;N).
            </p>
          </div>
          <div className="flex items-center space-x-2 text-[11px] font-mono">
            <span className="border border-black px-2 py-1 bg-zinc-100">B&amp;N Wireframe</span>
            <span className="border border-black px-2 py-1 bg-black text-white">iPhone 13 Pro</span>
          </div>
        </div>
      </div>

      {/* 4 Flows Rendered as Post-it Sequences */}
      <div className="space-y-6">
        {flows.map((flow, idx) => (
          <div
            key={flow.id}
            className="border-2 border-black bg-white p-5 shadow-[4px_4px_0px_#000] space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black pb-3">
              <div>
                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 border ${flow.colorBadge} inline-block`}>
                  Post-it Flow #{idx + 1}
                </span>
                <h3 className="text-sm font-black uppercase tracking-wide mt-1">{flow.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => onSelectFlow(flow.id, flow.postits[flow.postits.length - 1].screen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-black bg-black text-white text-xs font-bold uppercase hover:bg-zinc-800 transition-colors shadow-[2px_2px_0px_#71717a]"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Simula Flusso su iPhone</span>
              </button>
            </div>

            {/* Post-it chain visualization */}
            <div className="flex items-center gap-2 overflow-x-auto py-2">
              {flow.postits.map((step, sIdx) => (
                <React.Fragment key={sIdx}>
                  <div className="shrink-0 w-32 sm:w-36 h-28 border-2 border-black bg-zinc-50 p-2.5 flex flex-col justify-between shadow-[2px_2px_0px_#000]">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">
                      Passo {sIdx + 1}
                    </span>
                    <div className="text-xs font-black uppercase leading-snug">
                      {step.label}
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectFlow(flow.id, step.screen)}
                      className="text-[9px] font-mono uppercase underline text-zinc-700 hover:text-black flex items-center gap-0.5"
                    >
                      <Eye className="w-2.5 h-2.5" />
                      <span>Apri schermata</span>
                    </button>
                  </div>
                  {sIdx < flow.postits.length - 1 && (
                    <ArrowRight className="w-4 h-4 shrink-0 text-black stroke-[2.5]" />
                  )}
                </React.Fragment>
              ))}
            </div>

            <p className="text-xs font-mono text-zinc-600 bg-zinc-50 p-2.5 border border-dashed border-black">
              {flow.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

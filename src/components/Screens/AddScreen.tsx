import React, { useState } from 'react';
import { PlusCircle, MapPin, Check, FileText } from 'lucide-react';

interface AddScreenProps {
  onSuccess: () => void;
}

export const AddScreen: React.FC<AddScreenProps> = ({ onSuccess }) => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex-1 w-full flex flex-col bg-white overflow-y-auto p-4 justify-between">
      <div className="space-y-4">
        {/* Breadcrumb Path */}
        <div className="border border-black bg-zinc-50 p-2 flex items-center justify-between text-[10px] font-mono">
          <span className="font-bold">AGGIUNGI &gt; NUOVO LUOGO / SEGNALAZIONE</span>
          <span className="bg-black text-white px-1">TAB AGGIUNGI</span>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-wider">Aggiungi Segnalazione</h2>
          <p className="text-[10px] font-mono text-zinc-500">Inserisci un nuovo locale o evento sicuro</p>
        </div>

        {submitted ? (
          <div className="border-2 border-black p-6 bg-zinc-50 text-center space-y-3">
            <div className="w-12 h-12 border-2 border-black bg-black text-white mx-auto flex items-center justify-center">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <div className="text-xs font-black uppercase">Segnalazione Salvata</div>
            <p className="text-[10px] font-mono text-zinc-600">
              La scheda è stata inserita nel wireframe del database.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="py-1.5 px-3 border border-black bg-white text-xs font-bold uppercase"
            >
              Nuovo inserimento
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-3"
          >
            {/* Field: Nome Locale */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wide">Nome Locale o Evento</label>
              <input
                type="text"
                placeholder="Es. Pasticceria Artigianale"
                className="w-full border-2 border-black p-2 text-xs font-bold focus:outline-none"
                required
              />
            </div>

            {/* Field: Indirizzo */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wide">Indirizzo o Coordinate</label>
              <div className="flex border-2 border-black">
                <input
                  type="text"
                  placeholder="Es. Via Garibaldi 14"
                  className="flex-1 p-2 text-xs font-mono focus:outline-none"
                  required
                />
                <button
                  type="button"
                  className="px-3 border-l-2 border-black bg-zinc-100 flex items-center justify-center text-xs font-bold uppercase"
                >
                  <MapPin className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Field: Livello Contaminazione */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wide">Grado di contaminazione</label>
              <select className="w-full border-2 border-black p-2 text-xs font-bold uppercase bg-white focus:outline-none">
                <option value="zero">Zero contaminazione (Cucina dedicata 100%)</option>
                <option value="basso">Basso rischio (Procedure separate)</option>
                <option value="medio">Medio rischio (Ambiente promiscuo)</option>
              </select>
            </div>

            {/* Field: Categoria */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wide">Categoria</label>
              <select className="w-full border-2 border-black p-2 text-xs font-bold uppercase bg-white focus:outline-none">
                <option value="ristorante">Ristorante</option>
                <option value="sagra">Sagra / Evento</option>
                <option value="hotel">Hotel / Alloggio</option>
                <option value="bar">Bar / Caffetteria</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-2.5 border-2 border-black bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-[2px_2px_0px_#000]"
            >
              Salva nei Preferiti / Territorio
            </button>
          </form>
        )}
      </div>

      <div className="border-t border-black pt-2 text-[9px] font-mono text-zinc-500 text-center">
        Wireframe Schermata Vuota da elementi non richiesti
      </div>
    </div>
  );
};

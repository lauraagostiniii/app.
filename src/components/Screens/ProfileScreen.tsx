import React from 'react';
import { User, Bell, Shield, Sliders, LogOut } from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  return (
    <div className="flex-1 w-full flex flex-col bg-white overflow-y-auto p-4 justify-between">
      <div className="space-y-4">
        {/* Breadcrumb Path */}
        <div className="border border-black bg-zinc-50 p-2 flex items-center justify-between text-[10px] font-mono">
          <span className="font-bold">PROFILO &gt; IMPOSTAZIONI UTENTE</span>
          <span className="bg-black text-white px-1">TAB PROFILO</span>
        </div>

        {/* User Wireframe Profile Header */}
        <div className="border-2 border-black p-4 bg-white flex items-center space-x-3">
          <div className="w-12 h-12 border-2 border-black bg-zinc-100 flex items-center justify-center shrink-0">
            <User className="w-6 h-6 stroke-[2]" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-black uppercase tracking-wide">Utente Wireframe</div>
            <div className="text-[10px] font-mono text-zinc-600">user.laura@wireframe.local</div>
            <div className="text-[9px] font-mono bg-zinc-100 border border-black inline-block px-1 mt-0.5">
              Profilo: Intolleranze &amp; Celiachia
            </div>
          </div>
        </div>

        {/* Preferences Wireframe Group */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono uppercase text-zinc-500 font-bold">Preferenze Ricerca</div>

          <div className="border-2 border-black divide-y-2 divide-black bg-white">
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 stroke-[2]" />
                <span className="text-xs font-bold uppercase">Filtro Zero Contaminazione</span>
              </div>
              <span className="text-[10px] font-mono bg-black text-white px-1.5 py-0.5">ATTIVO</span>
            </div>

            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 stroke-[2]" />
                <span className="text-xs font-bold uppercase">Notifiche Sagre &amp; Eventi</span>
              </div>
              <span className="text-[10px] font-mono border border-black px-1.5 py-0.5">DISATTIVO</span>
            </div>

            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sliders className="w-4 h-4 stroke-[2]" />
                <span className="text-xs font-bold uppercase">Raggio Predefinito</span>
              </div>
              <span className="text-[10px] font-mono font-bold">100 m</span>
            </div>
          </div>
        </div>

        {/* Log Out Wireframe Button */}
        <button
          type="button"
          className="w-full py-2.5 border-2 border-black bg-white hover:bg-zinc-100 text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Disconnetti</span>
        </button>
      </div>

      <div className="border-t border-black pt-2 text-[9px] font-mono text-zinc-500 text-center">
        Wireframe Schermata Vuota • Nessun elemento non richiesto
      </div>
    </div>
  );
};

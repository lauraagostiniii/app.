import React, { useState } from 'react';
import { Smartphone, LayoutGrid, RotateCcw, SlidersHorizontal, Info, ShieldCheck, Search, ChevronRight } from 'lucide-react';
import { TabType, ScreenId, FlowId, FilterState } from './types';
import { IPhone13ProFrame } from './components/IPhone13ProFrame';
import { TopHeader } from './components/TopHeader';
import { BottomNavBar } from './components/BottomNavBar';
import { FilterModal } from './components/FilterModal';
import { HomeScreen } from './components/Screens/HomeScreen';
import { EventiSagreScreen } from './components/Screens/EventiSagreScreen';
import { FavoritesScreen } from './components/Screens/FavoritesScreen';
import { SearchFlowScreen } from './components/Screens/SearchFlowScreen';
import { AddScreen } from './components/Screens/AddScreen';
import { ProfileScreen } from './components/Screens/ProfileScreen';
import { FlowMatrixView } from './components/FlowMatrixView';

export default function App() {
  // Navigation & Screen States
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [activeFlow, setActiveFlow] = useState<FlowId>(null);
  const [viewMode, setViewMode] = useState<'simulator' | 'matrix'>('simulator');
  const [showDeviceChassis, setShowDeviceChassis] = useState<boolean>(true);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

  // Filters State (Covers Flow 1: grado contaminazione, Flow 4: distanza 100m & ristoranti)
  const [filters, setFilters] = useState<FilterState>({
    gradoContaminazione: 'zero',
    categoria: 'ristoranti',
    distanzaMeters: 100, // Default 100m to demonstrate Flow 4 condition as requested
  });

  // Handle Tab Switch
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setCurrentScreen('home');
    } else if (tab === 'preferiti') {
      setCurrentScreen('preferiti-cartelle');
    } else if (tab === 'aggiungi') {
      setCurrentScreen('aggiungi');
    } else if (tab === 'profilo') {
      setCurrentScreen('profilo');
    }
  };

  // Quick Flow Activation
  const launchFlow = (flowId: FlowId, targetScreen?: ScreenId) => {
    setActiveFlow(flowId);
    setViewMode('simulator');

    if (flowId === 'flow1') {
      // Home -> Mappa -> Filtri -> Grado di contaminazione
      setActiveTab('home');
      setCurrentScreen('home');
      setIsFilterModalOpen(true);
    } else if (flowId === 'flow2') {
      // Home -> Eventi -> Sagre -> Nessuna sagra in programma
      setActiveTab('home');
      setCurrentScreen('sagre');
      setIsFilterModalOpen(false);
    } else if (flowId === 'flow3') {
      // Home -> Preferiti -> Cartelle -> Viaggio Vienna -> Hotel Saker
      setActiveTab('preferiti');
      setCurrentScreen(targetScreen || 'hotel-saker');
      setIsFilterModalOpen(false);
    } else if (flowId === 'flow4') {
      // Home -> Cerca -> Mappa -> Filtri -> Ristoranti -> Distanza (100 m) -> Nessun ristorante trovato
      setActiveTab('home');
      setCurrentScreen('cerca');
      setFilters((prev) => ({ ...prev, categoria: 'ristoranti', distanzaMeters: 100 }));
      setIsFilterModalOpen(false);
    }
  };

  // Reset entire prototype to Home
  const resetPrototype = () => {
    setActiveTab('home');
    setCurrentScreen('home');
    setActiveFlow(null);
    setIsFilterModalOpen(false);
    setFilters({
      gradoContaminazione: 'zero',
      categoria: 'ristoranti',
      distanzaMeters: 100,
    });
  };

  // Determine screen header title
  const getHeaderInfo = () => {
    switch (currentScreen) {
      case 'home':
        return { title: 'Home', subtitle: 'Territorio & Mappa B&N', showBack: false };
      case 'sagre':
        return { title: 'Sagre', subtitle: 'Eventi sul territorio', showBack: true };
      case 'preferiti-cartelle':
      case 'viaggio-vienna':
      case 'hotel-saker':
        return { title: 'Preferiti', subtitle: 'Cartelle & Luoghi', showBack: currentScreen !== 'preferiti-cartelle' };
      case 'cerca':
      case 'cerca-mappa-filtri':
      case 'cerca-risultati-ristoranti':
        return { title: 'Cerca', subtitle: 'Filtri e Distanze', showBack: true };
      case 'aggiungi':
        return { title: 'Aggiungi', subtitle: 'Nuova segnalazione', showBack: false };
      case 'profilo':
        return { title: 'Profilo', subtitle: 'Impostazioni utente', showBack: false };
      default:
        return { title: 'App Wireframe', subtitle: '', showBack: false };
    }
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className="min-h-screen bg-zinc-100 text-black flex flex-col font-sans">
      {/* Top Application Control Toolbar */}
      <header className="w-full bg-white border-b-2 border-black px-4 py-3 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
          
          {/* Logo / Branding */}
          <div className="flex items-center space-x-3 w-full lg:w-auto justify-between lg:justify-start">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-2 border-black bg-black flex items-center justify-center text-white text-xs font-black">
                W
              </div>
              <div>
                <h1 className="text-sm font-black uppercase tracking-wider">
                  iPhone 13 Pro Wireframe (B&amp;N)
                </h1>
                <p className="text-[10px] font-mono text-zinc-500">
                  Schermate essenziali • Mappa vettoriale con filtri integrati
                </p>
              </div>
            </div>

            {/* Mode Toggle Switch for Mobile */}
            <div className="flex items-center space-x-1 lg:hidden">
              <button
                type="button"
                onClick={() => setViewMode(viewMode === 'simulator' ? 'matrix' : 'simulator')}
                className="px-2 py-1 border-2 border-black text-xs font-bold uppercase bg-white hover:bg-black hover:text-white"
              >
                {viewMode === 'simulator' ? 'Tavole' : 'iPhone'}
              </button>
            </div>
          </div>

          {/* Quick Flow Jumpers (Matching the 4 Sticky Note Rows) */}
          <div className="flex items-center flex-wrap gap-1.5 w-full lg:w-auto justify-center">
            <span className="text-[10px] font-mono font-bold uppercase text-zinc-500 mr-1">
              Flussi Post-it:
            </span>
            <button
              type="button"
              onClick={() => launchFlow('flow1')}
              className={`px-2 py-1 text-[11px] font-bold uppercase border-2 border-black transition-all ${
                activeFlow === 'flow1'
                  ? 'bg-sky-200 border-black shadow-[1px_1px_0px_#000]'
                  : 'bg-white hover:bg-sky-50'
              }`}
              title="Home > Mappa > Filtri > Grado di contaminazione"
            >
              1. Mappa &amp; Filtri
            </button>
            <button
              type="button"
              onClick={() => launchFlow('flow2')}
              className={`px-2 py-1 text-[11px] font-bold uppercase border-2 border-black transition-all ${
                activeFlow === 'flow2'
                  ? 'bg-emerald-200 border-black shadow-[1px_1px_0px_#000]'
                  : 'bg-white hover:bg-emerald-50'
              }`}
              title="Home > Eventi > Sagre > Nessuna sagra in programma"
            >
              2. Sagre (Vuota)
            </button>
            <button
              type="button"
              onClick={() => launchFlow('flow3')}
              className={`px-2 py-1 text-[11px] font-bold uppercase border-2 border-black transition-all ${
                activeFlow === 'flow3'
                  ? 'bg-pink-200 border-black shadow-[1px_1px_0px_#000]'
                  : 'bg-white hover:bg-pink-50'
              }`}
              title="Home > Preferiti > Cartelle > Viaggio Vienna > Hotel Saker"
            >
              3. Preferiti &amp; Hotel Saker
            </button>
            <button
              type="button"
              onClick={() => launchFlow('flow4')}
              className={`px-2 py-1 text-[11px] font-bold uppercase border-2 border-black transition-all ${
                activeFlow === 'flow4'
                  ? 'bg-orange-200 border-black shadow-[1px_1px_0px_#000]'
                  : 'bg-white hover:bg-orange-50'
              }`}
              title="Home > Cerca > Mappa > Filtri > Ristoranti > Distanza 100m > Nessun ristorante trovato"
            >
              4. Cerca 100m (Vuota)
            </button>
          </div>

          {/* View Toggles & Reset */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className="flex border-2 border-black bg-white">
              <button
                type="button"
                onClick={() => setViewMode('simulator')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold uppercase transition-colors ${
                  viewMode === 'simulator' ? 'bg-black text-white' : 'hover:bg-zinc-100'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>iPhone 13 Pro</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('matrix')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold uppercase transition-colors ${
                  viewMode === 'matrix' ? 'bg-black text-white' : 'hover:bg-zinc-100'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Tavole Flusso</span>
              </button>
            </div>

            <button
              type="button"
              onClick={resetPrototype}
              className="p-1.5 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors"
              title="Ripristina Home"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col items-center justify-center p-2 sm:p-6 overflow-y-auto">
        {viewMode === 'matrix' ? (
          <FlowMatrixView
            onSelectFlow={(flowId, targetScreen) => {
              launchFlow(flowId, targetScreen);
            }}
          />
        ) : (
          <div className="w-full flex flex-col items-center">
            {/* Context Breadcrumb / Flow Badge */}
            <div className="mb-2 flex items-center space-x-2 text-xs font-mono">
              <span className="font-bold uppercase">Modalità:</span>
              <span className="border border-black px-1.5 py-0.5 bg-white">
                iPhone 13 Pro (390 x 844)
              </span>
              <button
                type="button"
                onClick={() => setShowDeviceChassis(!showDeviceChassis)}
                className="text-zinc-600 underline hover:text-black ml-2"
              >
                {showDeviceChassis ? 'Nascondi scocca telefono' : 'Mostra scocca telefono'}
              </button>
            </div>

            {/* iPhone 13 Pro Device Frame Container */}
            <IPhone13ProFrame showFrame={showDeviceChassis}>
              {/* Screen Top Header (contains title & CERCA in alto a destra) */}
              <TopHeader
                title={headerInfo.title}
                subtitle={headerInfo.subtitle}
                showBack={headerInfo.showBack}
                onBack={() => {
                  if (currentScreen === 'sagre') setCurrentScreen('home');
                  else if (currentScreen === 'hotel-saker') setCurrentScreen('viaggio-vienna');
                  else if (currentScreen === 'viaggio-vienna') setCurrentScreen('preferiti-cartelle');
                  else if (currentScreen === 'cerca') setCurrentScreen('home');
                  else setCurrentScreen('home');
                }}
                onSearchClick={() => {
                  setActiveTab('home');
                  setCurrentScreen('cerca');
                }}
                isSearchActive={currentScreen === 'cerca'}
              />

              {/* Viewport Dynamic Content */}
              <div className="flex-1 w-full flex flex-col relative overflow-hidden bg-white">
                {/* 1. Home Screen */}
                {currentScreen === 'home' && (
                  <HomeScreen
                    filters={filters}
                    onOpenFilters={() => setIsFilterModalOpen(true)}
                    onNavigateToSagre={() => setCurrentScreen('sagre')}
                    onNavigateToSearch={() => setCurrentScreen('cerca')}
                    onNavigateToFavorites={() => {
                      setActiveTab('preferiti');
                      setCurrentScreen('preferiti-cartelle');
                    }}
                  />
                )}

                {/* 2. Eventi -> Sagre Screen (Flow 2) */}
                {currentScreen === 'sagre' && (
                  <EventiSagreScreen onBack={() => setCurrentScreen('home')} />
                )}

                {/* 3. Preferiti -> Cartelle -> Viaggio Vienna -> Hotel Saker (Flow 3) */}
                {(currentScreen === 'preferiti-cartelle' ||
                  currentScreen === 'viaggio-vienna' ||
                  currentScreen === 'hotel-saker') && (
                  <FavoritesScreen
                    initialSubView={
                      currentScreen === 'hotel-saker'
                        ? 'hotel-saker'
                        : currentScreen === 'viaggio-vienna'
                        ? 'viaggio-vienna'
                        : 'cartelle'
                    }
                  />
                )}

                {/* 4. Cerca -> Mappa -> Filtri -> Ristoranti 100m (Flow 4) */}
                {currentScreen === 'cerca' && (
                  <SearchFlowScreen
                    filters={filters}
                    onOpenFilters={() => setIsFilterModalOpen(true)}
                    onUpdateFilters={(newFilters) => setFilters(newFilters)}
                    onResetSearch={() =>
                      setFilters((prev) => ({ ...prev, distanzaMeters: 100, categoria: 'ristoranti' }))
                    }
                  />
                )}

                {/* 5. Aggiungi Tab */}
                {currentScreen === 'aggiungi' && (
                  <AddScreen onSuccess={() => handleTabChange('preferiti')} />
                )}

                {/* 6. Profilo Tab */}
                {currentScreen === 'profilo' && <ProfileScreen />}

                {/* Filter Sheet Modal (Triggered by filtri icon inside stylized map) */}
                <FilterModal
                  isOpen={isFilterModalOpen}
                  onClose={() => setIsFilterModalOpen(false)}
                  filters={filters}
                  onUpdateFilters={(newFilters) => setFilters(newFilters)}
                  onApply={() => {
                    setIsFilterModalOpen(false);
                    // If in search mode, reflect filter application
                    if (currentScreen === 'cerca') {
                      // stays on search
                    }
                  }}
                  activeFlow={activeFlow}
                />
              </div>

              {/* Bottom Navigation Bar (Home, Preferiti, Aggiungi, Profilo) */}
              <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
            </IPhone13ProFrame>

            {/* Informative Guidance Card below Device */}
            <div className="max-w-md w-full bg-white border-2 border-black p-3.5 my-4 shadow-[3px_3px_0px_#000] text-xs space-y-2">
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 stroke-[2.5]" />
                <span className="font-black uppercase tracking-wider">
                  Specifiche Wireframe Rispettate:
                </span>
              </div>
              <ul className="text-[11px] font-mono space-y-1 text-zinc-700 list-disc list-inside">
                <li>
                  <strong className="text-black">Mappa stilizzata:</strong> Sostituisce il semplice pulsante con cartografia vettoriale B&amp;N e icona <span className="underline font-bold">Filtri</span> integrata all'interno.
                </li>
                <li>
                  <strong className="text-black">Cerca in alto a destra:</strong> Sempre accessibile dall'header per avviare la ricerca con raggio e filtri.
                </li>
                <li>
                  <strong className="text-black">Menu inferiore:</strong> Home, Preferiti, Aggiungi, Profilo in puro wireframe.
                </li>
                <li>
                  <strong className="text-black">Schermate vuote (empty states):</strong> &quot;Nessuna sagra in programma&quot; e &quot;Nessun ristorante trovato&quot; (100 m) prive di elementi non richiesti.
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

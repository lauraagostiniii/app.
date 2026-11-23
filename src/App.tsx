import React, { useState } from 'react';
import { TabType, ScreenId, FilterState } from './types';
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

export default function App() {
  // Navigation & Screen States
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

  // Filters State (Covers Flow 1: grado contaminazione, Flow 4: distanza 100m & ristoranti)
  const [filters, setFilters] = useState<FilterState>({
    gradoContaminazione: 'zero',
    gradiContaminazione: ['zero'],
    prezzoMin: 20,
    prezzoMax: 200,
    categoria: 'ristoranti',
    categorie: ['ristoranti'],
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

  // Determine screen header title
  const getHeaderInfo = () => {
    switch (currentScreen) {
      case 'home':
        return { title: 'Home', subtitle: '', showBack: false };
      case 'sagre':
        return { title: 'Sagre', subtitle: 'Eventi sul territorio', showBack: true };
      case 'preferiti-cartelle':
      case 'viaggio-vienna':
      case 'hotel-saker':
        return { title: 'Preferiti', subtitle: '', showBack: currentScreen !== 'preferiti-cartelle' };
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
      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col items-center justify-center p-2 sm:p-6 overflow-y-auto">
        <div className="w-full flex flex-col items-center">
          {/* iPhone 13 Pro Device Frame Container */}
          <IPhone13ProFrame
            showFrame={true}
            overlay={
              <FilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                filters={filters}
                onUpdateFilters={(newFilters) => setFilters(newFilters)}
                onApply={() => {
                  setIsFilterModalOpen(false);
                }}
              />
            }
          >
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
                showSearch={
                  currentScreen !== 'preferiti-cartelle' &&
                  currentScreen !== 'viaggio-vienna' &&
                  currentScreen !== 'hotel-saker' &&
                  currentScreen !== 'cartella-dettaglio'
                }
              />

              {/* Viewport Dynamic Content */}
              <div className="flex-1 w-full flex flex-col relative overflow-hidden bg-white">
                {/* 1. Home Screen */}
                {currentScreen === 'home' && (
                  <HomeScreen
                    filters={filters}
                    onOpenFilters={() => setIsFilterModalOpen(true)}
                    onNavigateToSagre={() => setCurrentScreen('sagre')}
                    onSelectCategory={(category) => {
                      setFilters((prev) => ({ ...prev, categoria: category, categorie: [category] }));
                      setCurrentScreen('cerca');
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
                      setFilters((prev) => ({
                        ...prev,
                        distanzaMeters: 100,
                        categoria: 'ristoranti',
                        categorie: ['ristoranti'],
                      }))
                    }
                  />
                )}

                {/* 5. Aggiungi Tab */}
                {currentScreen === 'aggiungi' && (
                  <AddScreen onSuccess={() => handleTabChange('preferiti')} />
                )}

                {/* 6. Profilo Tab */}
                {currentScreen === 'profilo' && <ProfileScreen />}
              </div>

              {/* Bottom Navigation Bar (Home, Preferiti, Aggiungi, Profilo) */}
              <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
            </IPhone13ProFrame>
          </div>
      </main>
    </div>
  );
}

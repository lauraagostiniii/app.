export type TabType = 'home' | 'preferiti' | 'aggiungi' | 'profilo';

export type ScreenId =
  | 'home'
  | 'eventi'
  | 'sagre'
  | 'preferiti-cartelle'
  | 'cartella-dettaglio'
  | 'viaggio-vienna'
  | 'hotel-saker'
  | 'cerca'
  | 'cerca-mappa-filtri'
  | 'cerca-risultati-ristoranti'
  | 'aggiungi'
  | 'profilo';

export type FlowId = 'flow1' | 'flow2' | 'flow3' | 'flow4' | null;

export type ContaminationOption =
  | 'solo-gluten-free'
  | 'due-cucine-separate'
  | 'stessa-cucina-angolo'
  | 'stessa-cucina';

export type CategoryOption =
  | 'tutti'
  | 'ristoranti'
  | 'sagre'
  | 'bar'
  | 'supermercati'
  | 'eventi'
  | 'farmacie'
  | 'hotel';

export type ContaminationLevel = 'zero' | 'basso' | 'medio' | 'alto';

export interface FilterState {
  gradoContaminazione: ContaminationLevel;
  gradiContaminazione: ContaminationLevel[];
  contaminazione?: ContaminationOption[];
  prezzoMin?: number;
  prezzoMax?: number;
  categoria: CategoryOption;
  categorie: CategoryOption[];
  distanzaMeters: number;
}

export interface SavedPlace {
  id: string;
  name: string;
  address: string;
  note: string;
}

export interface FavoriteFolder {
  id: string;
  name: string;
  places: SavedPlace[];
}

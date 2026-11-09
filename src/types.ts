export type TabType = 'home' | 'preferiti' | 'aggiungi' | 'profilo';

export type ScreenId =
  | 'home'
  | 'eventi'
  | 'sagre'
  | 'preferiti-cartelle'
  | 'viaggio-vienna'
  | 'hotel-saker'
  | 'cerca'
  | 'cerca-mappa-filtri'
  | 'cerca-risultati-ristoranti'
  | 'aggiungi'
  | 'profilo';

export type FlowId = 'flow1' | 'flow2' | 'flow3' | 'flow4' | null;

export interface FilterState {
  gradoContaminazione: 'zero' | 'basso' | 'medio' | 'alto';
  categoria: 'tutti' | 'ristoranti' | 'sagre' | 'hotel' | 'bar';
  distanzaMeters: number; // e.g. 100, 500, 1000, 5000
}

export interface StickyFlowStep {
  label: string;
  screenId: ScreenId;
  description: string;
}

export interface StickyFlow {
  id: FlowId;
  title: string;
  colorName: string;
  tagColor: string;
  steps: StickyFlowStep[];
}

import {
  createContext, createElement, useContext, useEffect, useMemo, useState,
  type Dispatch, type ReactNode, type SetStateAction,
} from 'react';

export type TripStep = { id: string; placeSlug: string; time?: string; note?: string };
export type TripDay = { id: string; title: string; steps: TripStep[] };
export type TripDraft = {
  version: 2;
  updatedAt: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  travellers: number;
  departure: string;
  budget: string;
  notes: string;
  transport: string;
  accommodation: string;
  activities: string;
  itinerary: string;
  preferences: string[];
  skipped: string[];
  days: TripDay[];
};

export const TRIP_STORAGE_KEY = 'voyagego.trip.ma.v2';
export const LEGACY_TRIP_STORAGE_KEY = 'marocogo.trip.v1';

export const emptyTrip = (): TripDraft => ({
  version: 2, updatedAt: new Date().toISOString(), title: '', destination: '', startDate: '', endDate: '',
  travellers: 1, departure: '', budget: '', notes: '', transport: '', accommodation: '', activities: '',
  itinerary: '', preferences: [], skipped: [], days: [{ id: crypto.randomUUID(), title: '', steps: [] }],
});

export function migrateTrip(value: unknown): TripDraft {
  const base = emptyTrip();
  if (!value || typeof value !== 'object') return base;
  const candidate = value as Partial<TripDraft>;
  return {
    ...base, ...candidate, version: 2, travellers: Math.max(1, Number(candidate.travellers) || 1),
    preferences: Array.isArray(candidate.preferences) ? candidate.preferences : [],
    skipped: Array.isArray(candidate.skipped) ? candidate.skipped : [],
    days: Array.isArray(candidate.days) && candidate.days.length ? candidate.days : base.days,
  };
}

function readTrip(): TripDraft {
  try {
    const current = localStorage.getItem(TRIP_STORAGE_KEY);
    if (current) return migrateTrip(JSON.parse(current));
    const legacy = localStorage.getItem(LEGACY_TRIP_STORAGE_KEY);
    return legacy ? migrateTrip(JSON.parse(legacy)) : emptyTrip();
  } catch {
    return emptyTrip();
  }
}

type TripContextValue = { trip: TripDraft; setTrip: Dispatch<SetStateAction<TripDraft>> };
const TripContext = createContext<TripContextValue | null>(null);

export function TripProvider({ children }: { children: ReactNode }) {
  const [trip, setTrip] = useState<TripDraft>(readTrip);
  useEffect(() => {
    localStorage.setItem(TRIP_STORAGE_KEY, JSON.stringify({ ...trip, updatedAt: new Date().toISOString() }));
  }, [trip]);
  const value = useMemo(() => ({ trip, setTrip }), [trip]);
  return createElement(TripContext.Provider, { value }, children);
}

export function useTrip() {
  const value = useContext(TripContext);
  if (!value) throw new Error('useTrip must be used inside TripProvider');
  return value;
}

export function addPlaceToTrip(trip: TripDraft, placeSlug: string): TripDraft {
  const days = trip.days.length ? trip.days : [{ id: crypto.randomUUID(), title: '', steps: [] }];
  if (days.some((day) => day.steps.some((step) => step.placeSlug === placeSlug))) return trip;
  return {
    ...trip,
    days: days.map((day, index) => index === 0
      ? { ...day, steps: [...day.steps, { id: crypto.randomUUID(), placeSlug }] }
      : day),
  };
}

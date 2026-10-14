import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export type TripStep = {
  id: string;
  placeSlug: string;
  time?: string;
  note?: string;
};
export type TripDay = { id: string; title: string; steps: TripStep[] };
export type TripDraft = {
  version: 1;
  updatedAt: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  travellers: number;
  departure: string;
  budget: string;
  notes: string;
  preferences: string[];
  skipped: string[];
  days: TripDay[];
};

const key = "marocogo.trip.v1";
export const emptyTrip = (): TripDraft => ({
  version: 1,
  updatedAt: new Date().toISOString(),
  title: "",
  destination: "",
  startDate: "",
  endDate: "",
  travellers: 1,
  departure: "",
  budget: "",
  notes: "",
  preferences: [],
  skipped: [],
  days: [{ id: crypto.randomUUID(), title: "", steps: [] }],
});

function readTrip(): TripDraft {
  try {
    const value = localStorage.getItem(key);
    return value ? { ...emptyTrip(), ...JSON.parse(value) } : emptyTrip();
  } catch {
    return emptyTrip();
  }
}

type TripContextValue = {
  trip: TripDraft;
  setTrip: Dispatch<SetStateAction<TripDraft>>;
};
const TripContext = createContext<TripContextValue | null>(null);

export function TripProvider({ children }: { children: ReactNode }) {
  const [trip, setTrip] = useState<TripDraft>(readTrip);
  useEffect(() => {
    localStorage.setItem(
      key,
      JSON.stringify({ ...trip, updatedAt: new Date().toISOString() }),
    );
  }, [trip]);
  const value = useMemo(() => ({ trip, setTrip }), [trip]);
  return createElement(TripContext.Provider, { value }, children);
}

export function useTrip() {
  const value = useContext(TripContext);
  if (!value) throw new Error("useTrip must be used inside TripProvider");
  return value;
}

export function addPlaceToTrip(trip: TripDraft, placeSlug: string): TripDraft {
  const days = trip.days.length
    ? trip.days
    : [{ id: crypto.randomUUID(), title: "", steps: [] }];
  if (
    days.some((day) => day.steps.some((step) => step.placeSlug === placeSlug))
  )
    return trip;
  return {
    ...trip,
    days: days.map((day, index) =>
      index === 0
        ? {
            ...day,
            steps: [...day.steps, { id: crypto.randomUUID(), placeSlug }],
          }
        : day,
    ),
  };
}

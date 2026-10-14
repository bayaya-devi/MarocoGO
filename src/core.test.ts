import { describe, expect, it } from 'vitest';
import { labels, supported } from './i18n';
import { places } from './data/places';
import { addPlaceToTrip, emptyTrip } from './lib/trip';

describe('internationalisation registry', () => {
  it('contains the same non-empty keys in all five locales', () => {
    const reference = Object.keys(labels.fr).sort();
    expect(supported).toEqual(['fr', 'ar', 'en', 'es', 'pt']);
    supported.forEach((locale) => {
      expect(Object.keys(labels[locale]).sort()).toEqual(reference);
      expect(Object.values(labels[locale]).every((value) => value.trim().length > 0)).toBe(true);
    });
  });
});

describe('place registry', () => {
  it('has unique slugs, valid Moroccan coordinates and five names', () => {
    expect(new Set(places.map((place) => place.slug)).size).toBe(places.length);
    places.forEach((place) => {
      expect(place.coordinates[0]).toBeGreaterThan(20);
      expect(place.coordinates[0]).toBeLessThan(37);
      expect(place.coordinates[1]).toBeGreaterThan(-18);
      expect(place.coordinates[1]).toBeLessThan(0);
      supported.forEach((locale) => expect(place.name[locale]).toBeTruthy());
    });
  });
});

describe('trip model', () => {
  it('adds a place once to the active day', () => {
    const trip = emptyTrip();
    const once = addPlaceToTrip(trip, 'fes');
    const twice = addPlaceToTrip(once, 'fes');
    expect(twice.days[0].steps).toHaveLength(1);
    expect(twice.days[0].steps[0].placeSlug).toBe('fes');
  });
});

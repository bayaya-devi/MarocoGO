import { describe, expect, it } from 'vitest';
import { countries } from './countries/registry';
import { moroccoPlaces } from './countries/ma/content';
import { labels, supported } from './i18n';
import { addPlaceToTrip, emptyTrip, migrateTrip } from './lib/trip';

describe('internationalisation registry', () => {
  it('contains the same non-empty keys in FR, EN and AR', () => {
    const reference = Object.keys(labels.fr).sort();
    expect(supported).toEqual(['fr', 'en', 'ar']);
    supported.forEach((locale) => {
      expect(Object.keys(labels[locale]).sort()).toEqual(reference);
      expect(Object.values(labels[locale]).every((value) => value.trim().length > 0)).toBe(true);
    });
  });
});

describe('country registry', () => {
  it('is extensible and publishes only Morocco', () => {
    expect(countries.length).toBeGreaterThan(3);
    expect(new Set(countries.map((country) => country.code)).size).toBe(countries.length);
    expect(countries.filter((country) => country.status === 'published').map((country) => country.code)).toEqual(['MA']);
    expect(countries.find((country) => country.code === 'MA')?.route).toBe('/ma');
    expect(countries.filter((country) => country.status === 'preview').every((country) => !country.route)).toBe(true);
  });

  it('only exposes reviewed media without people or animals', () => {
    countries.filter((country) => country.landscape).forEach((country) => {
      expect(country.landscape).toMatchObject({ reviewed: true, containsPeople: false, containsAnimals: false });
      expect(country.landscape?.sourceUrl).toMatch(/^https:\/\/commons\.wikimedia\.org\//);
    });
  });
});

describe('Morocco content', () => {
  it('has unique places with trilingual content and valid coordinates', () => {
    expect(new Set(moroccoPlaces.map((place) => place.slug)).size).toBe(moroccoPlaces.length);
    moroccoPlaces.forEach((place) => {
      expect(place.coordinates[0]).toBeGreaterThan(20);
      expect(place.coordinates[0]).toBeLessThan(37);
      expect(place.coordinates[1]).toBeGreaterThan(-18);
      expect(place.coordinates[1]).toBeLessThan(0);
      supported.forEach((locale) => expect(place.name[locale]).toBeTruthy());
    });
  });
});

describe('trip migration', () => {
  it('migrates a legacy draft without losing its core fields', () => {
    const migrated = migrateTrip({ version: 1, destination: 'fes', travellers: 3, notes: 'riad calme' });
    expect(migrated).toMatchObject({ version: 2, destination: 'fes', travellers: 3, notes: 'riad calme', transport: '' });
  });

  it('adds a place only once', () => {
    const once = addPlaceToTrip(emptyTrip(), 'fes');
    const twice = addPlaceToTrip(once, 'fes');
    expect(twice.days[0].steps).toHaveLength(1);
  });
});

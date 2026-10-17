import { describe, expect, it } from 'vitest';
import { countries } from '../countries/registry';
import { countryAtCoordinates, getCountryGeometry, latitudeLongitudeToVector } from './geography';

describe('3D globe geography', () => {
  it('binds every selectable country to an ISO Natural Earth polygon', () => {
    countries.forEach((country) => expect(getCountryGeometry(country.isoNumeric), country.code).toBeDefined());
  });

  it('resolves registry coordinates through country polygons rather than visual markers', () => {
    countries.forEach((country) => {
      const [latitude, longitude] = country.coordinates;
      expect(countryAtCoordinates(longitude, latitude, countries)?.code, country.code).toBe(country.code);
    });
    expect(countryAtCoordinates(-140, 0, countries)).toBeUndefined();
  });

  it('projects geographic coordinates onto the globe surface', () => {
    expect(latitudeLongitudeToVector(0, 0, 2)).toEqual([0, 0, 2]);
    const northPole = latitudeLongitudeToVector(90, 0, 2);
    expect(northPole[1]).toBeCloseTo(2);
  });
});

import { feature } from 'topojson-client';
import countriesAtlas from 'world-atlas/countries-110m.json';
import type { Feature, FeatureCollection, MultiPolygon, Polygon, Position } from 'geojson';
import type { Country } from '../countries/registry';

export type CountryGeometry = Feature<Polygon | MultiPolygon, { name?: string }> & { id?: string | number };

type AtlasTopology = Parameters<typeof feature>[0] & {
  objects: { countries: Parameters<typeof feature>[1] };
};

const topology = countriesAtlas as unknown as AtlasTopology;
const atlasFeatures = feature(topology, topology.objects.countries) as unknown as FeatureCollection<Polygon | MultiPolygon, { name?: string }>;

export const worldCountryFeatures = atlasFeatures.features as CountryGeometry[];

const geometryByIsoNumeric = new Map(
  worldCountryFeatures.map((countryFeature) => [String(countryFeature.id).padStart(3, '0'), countryFeature]),
);

export function getCountryGeometry(isoNumeric: string): CountryGeometry | undefined {
  return geometryByIsoNumeric.get(isoNumeric);
}

function ringContainsPoint(ring: Position[], longitude: number, latitude: number): boolean {
  const unwrappedLongitudes: number[] = [];
  ring.forEach((position, index) => {
    let value = position[0];
    const reference = index === 0 ? value : unwrappedLongitudes[index - 1];
    while (value - reference > 180) value -= 360;
    while (value - reference < -180) value += 360;
    unwrappedLongitudes.push(value);
  });
  let pointLongitude = longitude;
  const ringReference = unwrappedLongitudes[0] ?? longitude;
  while (pointLongitude - ringReference > 180) pointLongitude -= 360;
  while (pointLongitude - ringReference < -180) pointLongitude += 360;

  let inside = false;
  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index++) {
    const currentLongitude = unwrappedLongitudes[index];
    const previousLongitude = unwrappedLongitudes[previous];
    const currentLatitude = ring[index][1];
    const previousLatitude = ring[previous][1];
    const crossesLatitude = (currentLatitude > latitude) !== (previousLatitude > latitude);
    const boundaryLongitude = ((previousLongitude - currentLongitude) * (latitude - currentLatitude))
      / (previousLatitude - currentLatitude || Number.EPSILON) + currentLongitude;
    if (crossesLatitude && pointLongitude < boundaryLongitude) inside = !inside;
  }
  return inside;
}

function polygonContainsPoint(polygon: Position[][], longitude: number, latitude: number): boolean {
  if (!polygon[0] || !ringContainsPoint(polygon[0], longitude, latitude)) return false;
  return !polygon.slice(1).some((hole) => ringContainsPoint(hole, longitude, latitude));
}

export function geometryContainsPoint(geometry: Polygon | MultiPolygon, longitude: number, latitude: number): boolean {
  if (geometry.type === 'Polygon') return polygonContainsPoint(geometry.coordinates, longitude, latitude);
  return geometry.coordinates.some((polygon) => polygonContainsPoint(polygon, longitude, latitude));
}

export function countryAtCoordinates(
  longitude: number,
  latitude: number,
  countries: readonly Country[],
): Country | undefined {
  return countries.find((country) => {
    const countryGeometry = getCountryGeometry(country.isoNumeric);
    return countryGeometry ? geometryContainsPoint(countryGeometry.geometry, longitude, latitude) : false;
  });
}

export function latitudeLongitudeToVector(
  latitude: number,
  longitude: number,
  radius: number,
): readonly [number, number, number] {
  const latitudeRadians = latitude * Math.PI / 180;
  const longitudeRadians = longitude * Math.PI / 180;
  const latitudeRadius = Math.cos(latitudeRadians) * radius;
  return [
    latitudeRadius * Math.sin(longitudeRadians),
    Math.sin(latitudeRadians) * radius,
    latitudeRadius * Math.cos(longitudeRadians),
  ];
}

function geometryRings(countryGeometry: CountryGeometry): Position[][] {
  if (countryGeometry.geometry.type === 'Polygon') return countryGeometry.geometry.coordinates;
  return countryGeometry.geometry.coordinates.flat();
}

export function boundaryPositions(
  features: readonly CountryGeometry[],
  radius: number,
): Float32Array {
  const positions: number[] = [];
  features.forEach((countryGeometry) => {
    geometryRings(countryGeometry).forEach((ring) => {
      for (let index = 1; index < ring.length; index += 1) {
        const start = latitudeLongitudeToVector(ring[index - 1][1], ring[index - 1][0], radius);
        const end = latitudeLongitudeToVector(ring[index][1], ring[index][0], radius);
        positions.push(...start, ...end);
      }
    });
  });
  return new Float32Array(positions);
}

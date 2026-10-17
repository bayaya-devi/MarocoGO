// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { countries } from '../countries/registry';
import { WorldGlobe } from './WorldGlobe';

const labels = {
  globe: 'Globe', rotateLeft: 'Ouest', rotateRight: 'Est', zoomIn: 'Plus', zoomOut: 'Moins',
  reset: 'Réinitialiser', loading: 'Chargement', unavailable: '3D indisponible',
  fallback: 'Choisir dans la liste', retry: 'Réessayer',
};

describe('WorldGlobe', () => {
  afterEach(() => vi.restoreAllMocks());

  it('keeps the explicit controls and accessible selector fallback without WebGL', async () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
    render(<WorldGlobe countries={countries} locale="fr" selectedCode="MA" onSelect={vi.fn()} labels={labels} />);

    expect(screen.getByRole('region', { name: 'Globe' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Plus' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Réinitialiser' })).toBeDisabled();
    await waitFor(() => expect(screen.getByText('3D indisponible')).toBeVisible());
    expect(screen.getByRole('link', { name: 'Choisir dans la liste' })).toHaveAttribute('href', '#country-index-title');
    expect(screen.getByRole('button', { name: 'Réessayer' })).toBeVisible();
  });
});

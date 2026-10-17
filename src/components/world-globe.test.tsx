// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { countries } from '../countries/registry';
import { WorldGlobe } from './WorldGlobe';

describe('WorldGlobe', () => {
  it('supports country selection and explicit rotation/zoom controls', () => {
    const onSelect = vi.fn();
    render(<WorldGlobe countries={countries} locale="fr" selectedCode="MA" onSelect={onSelect}
      labels={{ globe: 'Globe', rotateLeft: 'Ouest', rotateRight: 'Est', zoomIn: 'Plus', zoomOut: 'Moins', reset: 'Réinitialiser' }} />);
    expect(screen.getByRole('region', { name: 'Globe' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Plus' }));
    fireEvent.click(screen.getByRole('button', { name: 'Réinitialiser' }));
    const visibleCountry = screen.getAllByRole('button').find((button) => button.getAttribute('aria-pressed') === 'true');
    expect(visibleCountry).toBeTruthy();
  });
});

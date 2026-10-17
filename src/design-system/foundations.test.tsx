// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { nationalHubIds, navigationLabels, voyageGoLocales } from './contracts';
import { NavigationCore } from './NavigationCore';
import { VoyageGoInfo } from './VoyageGoInfo';

describe('VoyageGo design-system contracts', () => {
  it('keeps the official locales and national hub order', () => {
    expect(voyageGoLocales).toEqual(['fr', 'en', 'ar']);
    expect(nationalHubIds).toEqual(['explore', 'plan', 'discover']);
    voyageGoLocales.forEach((locale) => {
      expect(Object.values(navigationLabels[locale]).every(Boolean)).toBe(true);
    });
  });
});

describe('NavigationCore', () => {
  it('exposes five named primary actions and only three secondary actions', () => {
    render(
      <MemoryRouter initialEntries={['/ma']}>
        <NavigationCore
          routes={{
            globalHome: '/',
            countryHome: '/ma',
            explore: '/ma/explore',
            plan: '/ma/plan',
            discover: '/ma/discover',
          }}
          labels={navigationLabels.fr}
          locale="fr"
          localeOptions={[
            { value: 'fr', label: 'Français' },
            { value: 'en', label: 'English' },
            { value: 'ar', label: 'العربية' },
          ]}
          onLocaleChange={vi.fn()}
          onSearch={vi.fn()}
          onAccount={vi.fn()}
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole('navigation', { name: 'Navigation du pays' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Accueil du pays' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Accueil mondial VoyageGo' })).toHaveAttribute('href', '/');
    fireEvent.click(screen.getByRole('button', { name: 'Plus' }));
    expect(screen.getByRole('button', { name: 'Recherche' })).toBeVisible();
    expect(screen.getByRole('combobox', { name: 'Langue' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Compte' })).toBeVisible();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('button', { name: 'Recherche' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Plus' })).toHaveFocus();
  });
});

describe('VoyageGoInfo', () => {
  it('opens institutional links from an accessible command', () => {
    render(
      <MemoryRouter>
        <VoyageGoInfo
          signature="VoyageGo, une fenêtre ouverte sur le monde."
          buttonLabel="VoyageGo Info"
          panelTitle="Informations VoyageGo"
          closeLabel="Fermer"
          links={[{ to: '/info/legal', label: 'Mentions légales' }]}
        />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'VoyageGo Info' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Mentions légales' })).toHaveAttribute('href', '/info/legal');
  });
});

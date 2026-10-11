import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import HomeView from './HomeView';

describe('HomeView', () => {
  it('exposes favorite state on featured products', () => {
    const store = {
      favorites: ['gta-v'],
      addToCart: () => {},
      toggleFavorite: () => {},
    };

    const html = renderToStaticMarkup(
      <MemoryRouter>
        <HomeView store={store} />
      </MemoryRouter>,
    );

    expect(html).toContain('aria-pressed="true"');
    expect(html).toContain('Remover Grand Theft Auto V dos favoritos');
  });
});

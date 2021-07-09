import { createApi, fetchBaseQuery, skipToken } from '@reduxjs/toolkit/query/react';
import { useMemo } from 'react';

import { Pokemon, PokemonSprites, Sprite } from './types';

export const api = createApi({
  reducerPath: 'service',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (build) => ({
    getPokemonById: build.query<Pokemon, number>({
      query: (id) => `pokemon/${id}`,
    }),
  }),
});

export const { useGetPokemonByIdQuery } = api;

/**
 * Selects sprites from useGetPokemonSpritesByIdQuery, and returns the sprites in place of `data`
 */
export const useGetPokemonSpritesByIdQuery = (id: number | typeof skipToken) => {
  const result = useGetPokemonByIdQuery(id, {
    selectFromResult: (result) => {
      return {
        ...result,
        sprites: result.data?.sprites,
      };
    },
  });

  /**
   * Gets top level sprites, dream world sprites & official artwork sprites.
   * Returns a flat array of { name, url } shaped individual sprites
   */
  const spritesArray = useMemo(() => {
    const topLevel = getSpriteArrFromObj(result.sprites ?? {});
    const dreamWorld = getSpriteArrFromObj(
      (result.sprites ?? {}).other?.dream_world,
      'dream-world'
    );
    const officialArtwork = getSpriteArrFromObj(
      (result.sprites ?? {}).other?.['official-artwork'],
      'official-artwork'
    );
    return topLevel.concat(dreamWorld, officialArtwork);
  }, [result.sprites]);

  return { ...result, spritesArray };
};

/**
 * Extracts valid top level names & urls from a sprites object,
 * converting to an array of valid single sprites
 */
function getSpriteArrFromObj(sprites: Partial<PokemonSprites> | undefined, prefix = ''): Sprite[] {
  if (!sprites) return [];
  const topLevelSprites = Object.entries(sprites).flatMap(([key, value]) => {
    if (typeof value === 'string') {
      const sprite = {
        name: `${prefix ? `${prefix}-` : ''}${key}`,
        url: value,
        isShiny: key.includes('shiny'),
      };
      return [sprite];
    }
    return [];
  });
  return topLevelSprites;
}

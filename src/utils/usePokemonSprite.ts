import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useCallback, useMemo, useState } from 'react';

import { useGetPokemonSpritesByIdQuery } from '@/service/api';

import { getRandomInt } from './general';
import { pickRandomSprite } from './sprites';

// TODO: decide how to include multiple generations
const ranges = {
  gen1: {
    min: 1,
    max: 151,
  },
};
type AvailableGenerations = keyof typeof ranges;
function getRandomPokemonId(generation: AvailableGenerations = 'gen1'): number {
  return getRandomInt(ranges[generation].min, ranges[generation].max);
}
export const usePokemonSprite = () => {
  const generation: AvailableGenerations = 'gen1';
  const [pokemonId, setPokemonId] = useState<number>(() => getRandomPokemonId(generation));
  const { data, spritesArray, isFetching, isError, isSuccess } = useGetPokemonSpritesByIdQuery(
    pokemonId || skipToken
  );
  const randomSprite = useMemo(() => pickRandomSprite(spritesArray), [spritesArray]);

  const getRandomPokemon = useCallback(() => {
    setPokemonId(getRandomPokemonId(generation));
  }, [generation]);

  return {
    data,
    getRandomPokemon,
    randomSprite,
    isFetching,
    isError,
    isSuccess,
  };
};

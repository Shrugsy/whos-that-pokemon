import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useCallback, useMemo } from 'react';
import { useLocalSlice } from 'use-local-slice';
import { PayloadAction } from '@reduxjs/toolkit';

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

type SliceState = {
  pokemonId: number;
  isSilhouette: boolean;
};
type AvailableGenerations = keyof typeof ranges;
function getRandomPokemonId(generation: AvailableGenerations = 'gen1'): number {
  return getRandomInt(ranges[generation].min, ranges[generation].max);
}
export const usePokemonSprite = () => {
  const generation: AvailableGenerations = 'gen1';

  const [state, dispatchAction] = useLocalSlice({
    initialState: {
      isSilhouette: true,
      pokemonId: getRandomPokemonId(generation),
    } as SliceState,
    reducers: {
      pokemonIdReceived(draft, { payload }: PayloadAction<number>) {
        draft.isSilhouette = true;
        draft.pokemonId = payload;
      },
      silhouetteToggled(draft, { payload }: { payload?: boolean }) {
        if (typeof payload === 'boolean') {
          draft.isSilhouette = payload;
        } else {
          draft.isSilhouette = !draft.isSilhouette;
        }
      },
    },
  });

  const { data, spritesArray, isFetching, isError, isSuccess } = useGetPokemonSpritesByIdQuery(
    state.pokemonId || skipToken
  );

  const randomSprite = useMemo(() => pickRandomSprite(spritesArray), [spritesArray]);

  const getRandomPokemon = useCallback(() => {
    dispatchAction.pokemonIdReceived(getRandomPokemonId(generation));
  }, [generation, dispatchAction]);

  return {
    data,
    getRandomPokemon,
    randomSprite,
    isFetching,
    isError,
    isSuccess,
    isSilhouette: state.isSilhouette,
    toggleIsSilhouette: dispatchAction.silhouetteToggled,
  };
};

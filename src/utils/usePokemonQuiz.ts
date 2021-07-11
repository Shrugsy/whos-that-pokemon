import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useCallback, useMemo } from 'react';
import { useLocalSlice } from 'use-local-slice';
import { PayloadAction } from '@reduxjs/toolkit';

import { useGetPokemonByIdQuery, useGetPokemonSpritesByIdQuery } from '@/service/api';

import { getRandomInt } from './general';
import { pickRandomSprite } from './sprites';

// TODO: decide how to include multiple generations
const ranges = {
  gen1: {
    min: 1,
    max: 151,
  },
};

export type ArrayOf4Nums = [number, number, number, number];
type Num0To3 = 0 | 1 | 2 | 3;
function assertNumInRng0To3(num: number): asserts num is Num0To3 {
  if (![0, 1, 2, 3].includes(num)) {
    throw new Error(`Number ${num} is not in range 0 to 3`);
  }
}

type AvailableGenerations = keyof typeof ranges;
function getRandomPokemonId(generation: AvailableGenerations = 'gen1'): number {
  return getRandomInt(ranges[generation].min, ranges[generation].max);
}
function getNewChoiceData(generation: AvailableGenerations): {
  choices: ArrayOf4Nums;
  activeIdx: Num0To3;
} {
  // TODO: fix below to not include duplicates!
  const choices: ArrayOf4Nums = [
    getRandomPokemonId(generation),
    getRandomPokemonId(generation),
    getRandomPokemonId(generation),
    getRandomPokemonId(generation),
  ];
  const activeIdx = getRandomInt(0, 3);
  assertNumInRng0To3(activeIdx);

  return {
    choices,
    activeIdx,
  };
}

export type SliceState = {
  pickedId: number | null;
  correctPokemonId: number;
  pokemonIdChoices: ArrayOf4Nums;
  isSilhouette: boolean;
  score: number;
  lives: number;
  gameStatus: 'running' | 'game over';
};

const { choices, activeIdx } = getNewChoiceData('gen1');
const initialState: SliceState = {
  pickedId: null,
  correctPokemonId: choices[activeIdx],
  pokemonIdChoices: choices,
  isSilhouette: true,
  score: 0,
  lives: 3,
  gameStatus: 'running',
};

/**
 * Bulk logic hook for managing quiz state
 * TODO: count 'unique pokemon encountered'
 * count 'unique shinies encountered'
 * count 'total shinies encountered'
 * use animated sprites
 */
export const usePokemonQuiz = () => {
  const generation: AvailableGenerations = 'gen1';

  const [state, dispatchAction] = useLocalSlice({
    initialState,
    reducers: {
      pokemonIdChoicesReceived(
        draft,
        {
          payload,
        }: PayloadAction<{
          choices: ArrayOf4Nums;
          activeIdx: 0 | 1 | 2 | 3;
        }>
      ) {
        draft.correctPokemonId = payload.choices[payload.activeIdx];
        draft.pokemonIdChoices = payload.choices;
        draft.pickedId = null;
        draft.isSilhouette = true;
      },
      choicePicked(draft, { payload }: PayloadAction<number>) {
        // payload represents the picked pokemon ID
        if (payload === draft.correctPokemonId) {
          draft.score += 1;
        } else {
          draft.lives -= 1;
          if (draft.lives <= 0) {
            draft.gameStatus = 'game over';
          }
        }

        draft.pickedId = payload;
        draft.isSilhouette = false;
      },
      gameRestarted(
        draft,
        {
          payload,
        }: PayloadAction<{
          choices: ArrayOf4Nums;
          activeIdx: 0 | 1 | 2 | 3;
        }>
      ) {
        const { choices, activeIdx } = payload;
        return {
          pickedId: null,
          correctPokemonId: choices[activeIdx],
          pokemonIdChoices: choices,
          isSilhouette: true,
          score: 0,
          lives: 3,
          gameStatus: 'running',
        };
      },
    },
  });

  const {
    data: correctData,
    spritesArray,
    isFetching: isCorrectDataFetching,
    isError: isCorrectDataError,
    isSuccess: isCorrectDataSuccess,
  } = useGetPokemonSpritesByIdQuery(state.correctPokemonId || skipToken);
  const {
    data: pokemonOneData,
    isFetching: isPokemonOneFetching,
    isError: isPokemonOneError,
    isSuccess: isPokemonOneSuccess,
  } = useGetPokemonByIdQuery(state.pokemonIdChoices[0]);
  const {
    data: pokemonTwoData,
    isFetching: isPokemonTwoFetching,
    isError: isPokemonTwoError,
    isSuccess: isPokemonTwoSuccess,
  } = useGetPokemonByIdQuery(state.pokemonIdChoices[1]);
  const {
    data: pokemonThreeData,
    isFetching: isPokemonThreeFetching,
    isError: isPokemonThreeError,
    isSuccess: isPokemonThreeSuccess,
  } = useGetPokemonByIdQuery(state.pokemonIdChoices[2]);
  const {
    data: pokemonFourData,
    isFetching: isPokemonFourFetching,
    isError: isPokemonFourError,
    isSuccess: isPokemonFourSuccess,
  } = useGetPokemonByIdQuery(state.pokemonIdChoices[3]);

  // #region DERIVED STATUSES
  const isFetching =
    isCorrectDataFetching ||
    isPokemonOneFetching ||
    isPokemonTwoFetching ||
    isPokemonThreeFetching ||
    isPokemonFourFetching;
  const isError =
    isCorrectDataError ||
    isPokemonOneError ||
    isPokemonTwoError ||
    isPokemonThreeError ||
    isPokemonFourError;
  const isSuccess =
    isCorrectDataSuccess ||
    isPokemonOneSuccess ||
    isPokemonTwoSuccess ||
    isPokemonThreeSuccess ||
    isPokemonFourSuccess;
  // #endregion

  // #region HANDLERS
  const randomSprite = useMemo(() => pickRandomSprite(spritesArray), [spritesArray]);

  const getRandomPokemon = useCallback(() => {
    const choiceData = getNewChoiceData(generation);
    dispatchAction.pokemonIdChoicesReceived(choiceData);
  }, [generation, dispatchAction]);

  const restartGame = useCallback(() => {
    dispatchAction.gameRestarted(getNewChoiceData(generation));
  }, [generation, dispatchAction]);
  // #endregion

  return {
    correctData,
    pokemonOneData,
    pokemonTwoData,
    pokemonThreeData,
    pokemonFourData,
    pokemonIdChoices: state.pokemonIdChoices,
    pickedId: state.pickedId,
    randomSprite,
    isFetching,
    isError,
    isSuccess,
    isSilhouette: state.isSilhouette,
    score: state.score,
    lives: state.lives,
    gameStatus: state.gameStatus,
    getRandomPokemon,
    pickChoice: dispatchAction.choicePicked,
    restartGame,
  };
};

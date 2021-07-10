import { css } from '@emotion/react';

import { capitalizeFirstLetter } from '@/utils/general';
import { Pokemon } from '@/service/types';

import { StyledButton } from './StyledButton';
import { QuizButton } from './QuizButton';

const containerCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  min-width: 250px;
`;
const pokemonDetailsCss = css`
  height: 1.5rem;
`;
const buttonsCss = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
type PokemonControlsProps = {
  pokemonName: string;
  pokemonId: number | undefined;
  pokemonOneData: Pokemon | undefined;
  pokemonTwoData: Pokemon | undefined;
  pokemonThreeData: Pokemon | undefined;
  pokemonFourData: Pokemon | undefined;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  getRandomPokemon: () => void;
  isSilhouette: boolean;
  toggleIsSilhouette: (nextState?: boolean) => void;
};
export function PokemonControls({
  pokemonName,
  pokemonId,
  pokemonOneData,
  pokemonTwoData,
  pokemonThreeData,
  pokemonFourData,
  isFetching,
  isError,
  isSuccess,
  getRandomPokemon,
  isSilhouette,
  toggleIsSilhouette,
}: PokemonControlsProps) {
  const displayedName = capitalizeFirstLetter(pokemonName);
  const displayedId = pokemonId ? ` (${pokemonId})` : '';
  const pokemonDetails = `${displayedName}${displayedId}`;
  return (
    <div css={containerCss}>
      <div>
        {isFetching
          ? 'Fetching pokemon...'
          : isError
          ? 'Error fetching pokemon!'
          : isSuccess
          ? 'Successfully fetched pokemon!'
          : 'Waiting to fetch pokemon'}
      </div>
      <div css={pokemonDetailsCss}>{isSilhouette ? '' : pokemonDetails}</div>
      <div css={buttonsCss}>
        <QuizButton pokemonData={pokemonOneData} isReady={!isFetching && isSuccess} />
        <QuizButton pokemonData={pokemonTwoData} isReady={!isFetching && isSuccess} />
        <QuizButton pokemonData={pokemonThreeData} isReady={!isFetching && isSuccess} />
        <QuizButton pokemonData={pokemonFourData} isReady={!isFetching && isSuccess} />
        <StyledButton disabled={isFetching} onClick={getRandomPokemon}>
          Next Pokemon
        </StyledButton>
        <StyledButton disabled={isFetching} onClick={() => toggleIsSilhouette()}>
          Toggle Silhouette
        </StyledButton>
      </div>
    </div>
  );
}

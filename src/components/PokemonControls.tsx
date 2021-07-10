import { css } from '@emotion/react';
import { Button } from '@material-ui/core';

import { capitalizeFirstLetter } from '@/utils/general';

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
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  getRandomPokemon: () => void;
  isSilhouette: boolean;
  toggleIsSilhouette: () => void;
};
export function PokemonControls({
  pokemonName,
  pokemonId,
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
        <Button variant="contained" color="primary" onClick={getRandomPokemon}>
          Next Pokemon
        </Button>
        <Button variant="contained" color="primary" onClick={toggleIsSilhouette}>
          Toggle Silhouette
        </Button>
      </div>
    </div>
  );
}

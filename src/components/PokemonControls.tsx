import { css } from '@emotion/react';
import { Button } from '@material-ui/core';

import { capitalizeFirstLetter } from '@/utils/general';

const containerCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 250px;
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
  toggleIsSilhouette: () => void;
};
export function PokemonControls({
  pokemonName,
  pokemonId,
  isFetching,
  isError,
  isSuccess,
  getRandomPokemon,
  toggleIsSilhouette,
}: PokemonControlsProps) {
  return (
    <div css={containerCss}>
      <p>
        {isFetching
          ? 'Fetching pokemon...'
          : isError
          ? 'Error fetching pokemon!'
          : isSuccess
          ? 'Successfully fetched pokemon!'
          : 'Waiting to fetch pokemon'}
      </p>
      <p>
        <span>
          {capitalizeFirstLetter(pokemonName)} {pokemonId ? `(${pokemonId})` : ''}
        </span>
      </p>
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

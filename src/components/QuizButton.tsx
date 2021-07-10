import { ButtonProps } from '@material-ui/core';

import { Pokemon } from '@/service/types';
import { capitalizeFirstLetter } from '@/utils/general';

import { StyledButton } from './StyledButton';

type QuizButtonProps = {
  pokemonData: Pokemon | undefined;
  isReady: boolean;
} & ButtonProps;
export function QuizButton({ pokemonData, isReady, ...rest }: QuizButtonProps) {
  if (import.meta.env.DEV && isReady && !pokemonData) {
    console.error(`Button received 'isReady': ${isReady}, but no 'pokemonData' was received!`);
  }
  const buttonText = isReady
    ? capitalizeFirstLetter(pokemonData?.name ?? 'Loading...')
    : 'Loading...';
  return (
    <StyledButton disabled={!isReady} {...rest}>
      {buttonText}
    </StyledButton>
  );
}

import { ButtonProps } from '@material-ui/core';
import { css } from '@emotion/react';

import { CorePokemonData } from '@/service/types';
import { capitalizeFirstLetter } from '@/utils/general';

import { StyledButton } from './StyledButton';

type QuizButtonStatus =
  | 'waiting'
  | 'not picked'
  | 'picked and correct'
  | 'picked and incorrect'
  | 'not picked and correct';
type QuizButtonProps = {
  pokemonData: CorePokemonData | undefined;
  isReady: boolean;
  pickedId: number | null;
  correctId: number | undefined;
} & ButtonProps;
export function QuizButton({
  pokemonData,
  isReady,
  pickedId,
  correctId,
  ...rest
}: QuizButtonProps) {
  if (import.meta.env.DEV && isReady && !pokemonData) {
    console.error(`Button received 'isReady': ${isReady}, but no 'pokemonData' was received!`);
  }

  const isPicked = pokemonData?.id === pickedId;
  let status: QuizButtonStatus;
  if (pickedId === null) status = 'waiting';
  else if (isPicked && pickedId === correctId) status = 'picked and correct';
  else if (isPicked && pickedId === pokemonData?.id) status = 'picked and incorrect';
  else if (!isPicked && pokemonData?.id === correctId) status = 'not picked and correct';
  else status = 'not picked';

  const styles = getStyles(status);

  const buttonText = isReady
    ? capitalizeFirstLetter(pokemonData?.name ?? 'Loading...')
    : 'Loading...';

  return (
    <StyledButton css={styles} disabled={!isReady || status !== 'waiting'} {...rest}>
      {buttonText}
    </StyledButton>
  );
}

const colors: Record<QuizButtonStatus, { backgroundColor: string; color: string }> = {
  waiting: {
    backgroundColor: '#4b8eaf',
    color: 'black',
  },
  'not picked': {
    backgroundColor: '#586d78',
    color: '#a0a0a0',
  },
  'picked and incorrect': {
    backgroundColor: '#882929',
    color: '#ffffff',
  },
  'picked and correct': {
    backgroundColor: '#2a8a16',
    color: '#ffffff',
  },
  'not picked and correct': {
    backgroundColor: '#275f1c',
    color: '#a0a0a0',
  },
};
function getStyles(status: QuizButtonStatus) {
  return css`
    font-size: 2rem;
    background-color: #4b8eaf;
    color: white;
    &.Mui-disabled {
      background-color: ${colors[status].backgroundColor};
      color: ${colors[status].color};
    }
  `;
}

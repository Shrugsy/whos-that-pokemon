import { css } from '@emotion/react';

import { CorePokemonData } from '@/service/types';
import { ArrayOf4Nums, SliceState } from '@/utils/usePokemonQuiz';

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

const quizBtnsContainerCss = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const nextPokemonBtnCss = css`
  margin-top: 32px;
`;
const statsTextCss = css`
  font-size: 1.2rem;
`;
const outcomeTextCss = css`
  height: 3.5rem;
  font-size: 2rem;
`;
const gameOverButtonContainerCss = css`
  height: 46px;
`;
type PokemonControlsProps = {
  correctPokemonId: number | undefined;
  pokemonOneData: CorePokemonData | undefined;
  pokemonTwoData: CorePokemonData | undefined;
  pokemonThreeData: CorePokemonData | undefined;
  pokemonFourData: CorePokemonData | undefined;
  pokemonIdChoices: ArrayOf4Nums;
  pickedId: number | null;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  score: number;
  lives: number;
  gameStatus: SliceState['gameStatus'];
  getRandomPokemon: () => void;
  onChoicePicked: (pokemonId: number) => void;
  onRestartGame: () => void;
};
export function PokemonControls({
  correctPokemonId,
  pokemonOneData,
  pokemonTwoData,
  pokemonThreeData,
  pokemonFourData,
  pokemonIdChoices,
  pickedId,
  isFetching,
  isError,
  isSuccess,
  score,
  lives,
  gameStatus,
  getRandomPokemon,
  onChoicePicked,
  onRestartGame,
}: PokemonControlsProps) {
  function handleButtonClick(pokemonId: number | undefined) {
    if (pokemonId === undefined) {
      throw new Error('Button was clicked but no ID was provided!');
    }
    onChoicePicked(pokemonId);
  }

  let outcomeText = '';
  if (pickedId === null) outcomeText = '';
  else if (pickedId === correctPokemonId) outcomeText = 'Correct!';
  else outcomeText = 'Incorrect!';

  return (
    <div css={containerCss}>
      <div>{isError && 'Error fetching pokemon!'}</div>
      <div css={quizBtnsContainerCss}>
        {[pokemonOneData, pokemonTwoData, pokemonThreeData, pokemonFourData].map((data, index) => (
          <QuizButton
            key={`${index}-${pokemonIdChoices[index]}`}
            pokemonData={data}
            isReady={!isFetching && isSuccess}
            pickedId={pickedId}
            correctId={correctPokemonId}
            onClick={() => handleButtonClick(data?.id)}
          />
        ))}
      </div>
      <StyledButton
        css={nextPokemonBtnCss}
        disabled={isFetching || pickedId == null}
        onClick={getRandomPokemon}
      >
        Next Pokemon
      </StyledButton>
      <div css={statsTextCss}>Score: {score}</div>
      <div css={statsTextCss}>Lives: {lives}</div>
      <div css={outcomeTextCss}>{outcomeText}</div>
      <div css={gameOverButtonContainerCss}>
        {gameStatus === 'game over' && (
          <StyledButton onClick={onRestartGame}>Game over! Try again?</StyledButton>
        )}
      </div>
    </div>
  );
}

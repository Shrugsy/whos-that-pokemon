import { css } from '@emotion/react';

import { CorePokemonData } from '@/service/types';
import { ArrayOf4Nums } from '@/utils/usePokemonQuiz';

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
const outcomeTextCss = css`
  height: 1.5rem;
  font-size: 2rem;
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
  getRandomPokemon: () => void;
  onChoicePicked: (pokemonId: number) => void;
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
  getRandomPokemon,
  onChoicePicked,
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
      <div css={outcomeTextCss}>{outcomeText}</div>
    </div>
  );
}

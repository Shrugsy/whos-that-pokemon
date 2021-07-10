import { css } from '@emotion/react';

import { SpriteItem } from './components/SpriteItem';
import { usePokemonQuiz } from './utils/usePokemonQuiz';
import { PokemonControls } from './components/PokemonControls';

const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const classes = {
  app: css`
    min-height: 100vh;
    overflow: auto;
    display: flex;
    flex-direction: column;
  `,
  heading: css`
    text-align: center;
  `,
  gameContainer: css`
    height: 100%;
    flex-grow: 1;
    display: flex;
    @media only screen and (max-width: 1024px) {
      flex-direction: column;
    }
  `,
  leftSection: css`
    ${flexCenter}
    flex-grow: 1;
  `,
  rightSection: css`
    ${flexCenter}
    z-index: 1; // keeps text above the sprite image
    @media only screen and (max-width: 1024px) {
      padding-bottom: 64px;
    }
    @media only screen and (min-width: 1024px) {
      padding-right: 64px;
    }
  `,
};

function App() {
  const {
    correctData,
    pokemonOneData,
    pokemonTwoData,
    pokemonThreeData,
    pokemonFourData,
    pokemonIdChoices,
    pickedId,
    randomSprite,
    isFetching,
    isError,
    isSuccess,
    isSilhouette,
    getRandomPokemon,
    pickChoice,
  } = usePokemonQuiz();

  return (
    <div css={classes.app}>
      <h1 css={classes.heading}>Who&apos;s that Pokémon?</h1>
      <div css={classes.gameContainer}>
        <section css={classes.leftSection}>
          {/* LEFT */}
          <SpriteItem
            key={`${randomSprite?.url}-${isFetching}`}
            sprite={randomSprite}
            isFetching={isFetching}
            isSilhouette={isSilhouette}
          />
        </section>
        <section css={classes.rightSection}>
          {/* RIGHT */}
          <PokemonControls
            correctPokemonId={correctData?.id}
            pokemonOneData={pokemonOneData}
            pokemonTwoData={pokemonTwoData}
            pokemonThreeData={pokemonThreeData}
            pokemonFourData={pokemonFourData}
            pokemonIdChoices={pokemonIdChoices}
            pickedId={pickedId}
            isFetching={isFetching}
            isError={isError}
            isSuccess={isSuccess}
            getRandomPokemon={getRandomPokemon}
            onChoicePicked={pickChoice}
          />
        </section>
      </div>
    </div>
  );
}

export default App;

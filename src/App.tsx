import { css } from '@emotion/react';

import { SpriteItem } from './components/SpriteItem';
import { usePokemonSprite } from './utils/usePokemonSprite';
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
    getRandomPokemon,
    correctData,
    pokemonOneData,
    pokemonTwoData,
    pokemonThreeData,
    pokemonFourData,
    randomSprite,
    isFetching,
    isError,
    isSuccess,
    isSilhouette,
    toggleIsSilhouette,
  } = usePokemonSprite();
  const correctPokemonName = correctData?.name ?? 'No pokemon loaded';
  const correctPokemonId = correctData?.id;

  return (
    <div css={classes.app}>
      <section css={classes.leftSection}>
        {/* LEFT */}
        <SpriteItem sprite={randomSprite} isFetching={isFetching} isSilhouette={isSilhouette} />
      </section>
      <section css={classes.rightSection}>
        {/* RIGHT */}
        <PokemonControls
          pokemonName={correctPokemonName}
          pokemonId={correctPokemonId}
          pokemonOneData={pokemonOneData}
          pokemonTwoData={pokemonTwoData}
          pokemonThreeData={pokemonThreeData}
          pokemonFourData={pokemonFourData}
          isFetching={isFetching}
          isError={isError}
          isSuccess={isSuccess}
          getRandomPokemon={getRandomPokemon}
          isSilhouette={isSilhouette}
          toggleIsSilhouette={toggleIsSilhouette}
        />
      </section>
    </div>
  );
}

export default App;

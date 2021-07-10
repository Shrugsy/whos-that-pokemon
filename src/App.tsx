import { css } from '@emotion/react';
import { useReducer } from 'react';

import { SpriteItem } from './components/SpriteItem';
import { usePokemonSprite } from './utils/usePokemonSprite';
import { PokemonControls } from './components/PokemonControls';

const getClasses = ({ isFetching }: { isFetching: boolean }) => {
  return {
    app: css`
      background-color: #282c34;
      min-height: 100vh;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      color: white;
    `,
    pokemonName: css`
      margin: 0 auto;
    `,
    topSection: css`
      padding-top: 16px;
    `,
    middleSection: css`
      padding-bottom: 32px;
    `,
  };
};

function App() {
  const [isSilhouette, toggleIsSilhouette] = useReducer((s) => !s, false);
  const { getRandomPokemon, data, randomSprite, isFetching, isError, isSuccess } =
    usePokemonSprite();
  const pokemonName = data?.name ?? 'No pokemon loaded';
  const pokemonId = data?.id;
  const classes = getClasses({ isFetching });

  return (
    <div css={classes.app}>
      <section css={classes.topSection}>
        {/* LEFT */}
        <SpriteItem sprite={randomSprite} isFetching={isFetching} isSilhouette={isSilhouette} />
      </section>
      <section css={classes.middleSection}>
        {/* RIGHT */}
        <PokemonControls
          pokemonName={pokemonName}
          pokemonId={pokemonId}
          isFetching={isFetching}
          isError={isError}
          isSuccess={isSuccess}
          getRandomPokemon={getRandomPokemon}
          toggleIsSilhouette={toggleIsSilhouette}
        />
      </section>
    </div>
  );
}

export default App;

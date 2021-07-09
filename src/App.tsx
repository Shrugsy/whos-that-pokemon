import { css } from '@emotion/react';
import { Button } from '@material-ui/core';

import { capitalizeFirstLetter } from './utils/general';
import { SpriteItem } from './components/SpriteItem';
import { usePokemonSprite } from './utils/usePokemonSprite';

const getClasses = ({ isFetching }: { isFetching: boolean }) => {
  return {
    app: css`
      background-color: #282c34;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: calc(10px + 2vmin);
      color: white;
    `,
    spritesContainer: css`
      opacity: ${isFetching ? 0.5 : 1};
      display: flex;
      flex-direction: column;
    `,
    pokemonName: css`
      margin: 0 auto;
    `,
    container: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    `,
    fetcher: css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `,
  };
};

function App() {
  const { getRandomPokemon, data, randomSprite, isFetching, isError, isSuccess } =
    usePokemonSprite();

  const classes = getClasses({ isFetching });

  return (
    <div css={classes.app}>
      <div css={classes.container}>
        <div css={classes.fetcher}>
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
            <Button variant="contained" color="primary" onClick={getRandomPokemon}>
              Next Pokemon
            </Button>
          </p>
        </div>
        <div css={classes.spritesContainer}>
          <span css={classes.pokemonName}>
            {capitalizeFirstLetter(data?.name ?? 'No pokemon loaded')} ({data?.id})
          </span>
          <SpriteItem sprite={randomSprite} />
        </div>
      </div>
    </div>
  );
}

export default App;

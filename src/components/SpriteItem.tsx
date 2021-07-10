import { css } from '@emotion/react';
import Sparkles from 'react-sparkle';

import { Sprite } from '@/service/types';

type GetClassesOpts = {
  isFetching: boolean;
  isSilhouette: boolean;
  isShiny: boolean;
};

const getClasses = ({ isFetching, isSilhouette, isShiny }: GetClassesOpts) => {
  const silhouetteStyles = css`
    filter: contrast(0%) brightness(0%);
  `;
  return {
    imageContainer: css`
      opacity: ${isFetching ? 0.5 : 1};
      position: relative;
      height: 450px;
    `,
    image: css`
      width: 600px;
      height: 450px;
      transition: filter 500ms;
      ${isSilhouette ? silhouetteStyles : ''}
    `,
  };
};

type SpriteProps = {
  sprite: Sprite | undefined;
  isFetching: boolean;
  isSilhouette: boolean;
};

export function SpriteItem({ sprite, isFetching, isSilhouette }: SpriteProps) {
  if (!sprite) {
    return null;
  }

  const { name, url, isShiny } = sprite;
  const classes = getClasses({ isFetching, isSilhouette, isShiny });

  if (isShiny) console.log('shiny!!');
  // TODO: show placeholder while fetching new sprite
  return (
    <div css={classes.imageContainer}>
      {isShiny && !isSilhouette ? (
        <Sparkles flickerSpeed="slowest" count={10} fadeOutSpeed={10} maxSize={32} />
      ) : null}
      <img css={classes.image} key={url} src={url} alt={name} />
    </div>
  );
}

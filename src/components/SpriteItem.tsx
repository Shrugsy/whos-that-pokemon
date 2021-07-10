import { css } from '@emotion/react';

import { Sprite } from '@/service/types';

import { Sparkles } from './Sparkles';

type GetClassesOpts = {
  isFetching: boolean;
  isSilhouette: boolean;
  isShiny: boolean;
};

const getClasses = ({ isFetching, isSilhouette, isShiny }: GetClassesOpts) => {
  const silhouetteStyles = css`
    filter: contrast(0%) brightness(0%) blur(5px);
  `;
  return {
    imageContainer: css`
      opacity: ${isFetching ? 0.5 : 1};
      position: relative;
      max-height: 100vh;
      max-width: 600px;
      width: 100%;
    `,
    image: css`
      width: 100%;
      max-height: 600px;
      object-fit: contain;
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

import { css } from '@emotion/react';

import { Sprite } from '@/service/types';

type GetClassesOpts = {
  isFetching: boolean;
  isSilhouette: boolean;
};
const getClasses = ({ isFetching, isSilhouette }: GetClassesOpts) => {
  const silhouetteStyles = css`
    filter: contrast(0%) brightness(0%);
  `;
  return {
    imageContainer: css`
      opacity: ${isFetching ? 0.5 : 1};
      height: 450px;
    `,
    image: css`
      width: 600px;
      height: 450px;
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
  const classes = getClasses({ isFetching, isSilhouette });

  // TODO: add sparkly filter for shinybois
  if (isShiny) console.log('shiny!!');
  // TODO: show placeholder while fetching new sprite
  return (
    <div css={classes.imageContainer}>
      <img css={classes.image} key={url} src={url} alt={name} />
    </div>
  );
}

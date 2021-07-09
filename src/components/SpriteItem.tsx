import { css } from '@emotion/react';

import { Sprite } from '@/service/types';

type SpriteProps = {
  sprite: Sprite | undefined;
};
const imageCss = css`
  height: 450px;
`;

// TODO: allow 'blacking out' the item
export function SpriteItem({ sprite }: SpriteProps) {
  if (!sprite) {
    return null;
  }
  const { name, url, isShiny } = sprite;

  // TODO: add sparkly filter for shinybois
  if (isShiny) console.log('shiny!!');
  return <img css={imageCss} key={url} src={url} alt={name} />;
}

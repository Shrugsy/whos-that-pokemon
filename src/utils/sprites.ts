import { Sprite } from '@/service/types';

type PriorityKinds = 'startsWith' | 'includes';
type SpritePriorityList = { kind: PriorityKinds; value: string }[];

const defaultSpritePriorityList: SpritePriorityList = [
  {
    kind: 'startsWith',
    value: 'dream-world',
  },
  {
    kind: 'startsWith',
    value: 'official-artwork',
  },
  {
    kind: 'startsWith',
    value: 'front_default',
  },
];

const shinySpritePriorityList: SpritePriorityList = [
  {
    kind: 'startsWith',
    value: 'front_shiny',
  },
  {
    kind: 'startsWith',
    value: 'back_shiny',
  },
  {
    kind: 'includes',
    value: 'shiny',
  },
];

/**
 * Picks
 * @param spriteArr
 * @param shinyChance
 * @returns
 */
export function pickRandomSprite(spriteArr: Sprite[], shinyChance = 0.1): Sprite | undefined {
  const priorityList =
    Math.random() <= shinyChance
      ? shinySpritePriorityList.concat(defaultSpritePriorityList)
      : defaultSpritePriorityList;

  let validSprites: Sprite[] = [];
  for (const { kind, value } of priorityList) {
    if (kind === 'includes') {
      validSprites = spriteArr.filter((item) => item.name.includes(value));
      if (validSprites.length > 0) break;
    }
    if (kind === 'startsWith') {
      validSprites = spriteArr.filter((item) => item.name.startsWith(value));
      if (validSprites.length > 0) break;
    }
  }

  const sprite = pickRandomItem(validSprites);
  return sprite ?? spriteArr[0];
}

/**
 * Picks a random item from an array
 * @param items - An array of items to pick from
 * @returns - A single item picked out of the array, or undefined if the array was empty
 */
function pickRandomItem<T>(items: T[]): T | undefined {
  if (items.length === 0) return;
  const item = items[Math.floor(Math.random() * items.length)];
  assertItemWasPicked(item, items);
  return item;
}

function assertItemWasPicked<T>(item: T | undefined, items: T[]): asserts item is T {
  if (!item) {
    throw new Error(
      `pickRandomItem failed, no item was selected. Original array: ${JSON.stringify(
        items,
        null,
        2
      )}`
    );
  }
}

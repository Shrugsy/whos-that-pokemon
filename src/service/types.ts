/**
 * Result returned from {@link [https://pokeapi.co/api/v2/pokemon/(id-or-name)/](https://pokeapi.co/docs/v2#pokemon)}
 */
export interface Pokemon {
  /**
   * The identifier for this resource.
   */
  id: number;
  /**
   * The name for this resource.
   */
  name: string;
  /**
   * The base experience gained for defeating this Pokémon.
   */
  base_experience: number;
  /**
   * The height of this Pokémon in decimeters.
   */
  height: number;
  /**
   * Set for exactly one Pokémon used as the default for each species.
   */
  is_default: boolean;
  /**
   * Order for sorting. Almost national order, except families are grouped together.
   */
  order: number;
  /**
   * The weight of this Pokémon in hectograms.
   */
  weight: number;
  /**
   * A list of abilities this Pokémon could potentially have.
   *
   * @see {@link PokemonAbility}
   */
  abilities: PokemonAbility[];
  /**
   * A list of forms this Pokémon can take on.
   */
  forms: Form[];
  /**
   * A list of game indices relevant to Pokémon item by generation.
   */
  game_indices: GenerationGameIndex[];
  /**
   * A list of items this Pokémon may be holding when encountered.
   */
  held_items: PokemonHeldItem[];
  /**
   * A link to a list of location areas, as well as encounter details pertaining to specific versions.
   */
  location_area_encounters: string;
  /**
   * A list of moves along with learn methods and level details pertaining to specific version groups.
   */
  moves: PokemonMove[];
  /**
   * The species this Pokémon belongs to.
   */
  species: {
    name: string;
    url: string;
  };
  /**
   * A set of sprites used to depict this Pokémon in the game.
   * A visual representation of the various sprites can be found at
   * {@link [PokeAPI/sprites](https://github.com/PokeAPI/sprites#sprites)}
   */
  sprites: PokemonSprites;
  /**
   * A list of base stat values for this Pokémon.
   */
  stats: [
    {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      };
    }
  ];
  /**
   * A list of details showing types this Pokémon has.
   */
  types: [
    {
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }
  ];
}

/**
 * {@link https://pokeapi.co/docs/v2#pokemonsprites}
 */
export interface PokemonSprites {
  /**
   * The female depiction of this Pokémon from the back in battle.
   */
  back_female: string;
  /**
   * The shiny female depiction of this Pokémon from the back in battle.
   */
  back_shiny_female: string;
  back_default: string;
  /**
   * The female depiction of this Pokémon from the front in battle.
   */
  front_female: string;
  /**
   * The shiny female depiction of this Pokémon from the front in battle
   */
  front_shiny_female: string;
  /**
   * The shiny depiction of this Pokémon from the back in battle.
   */
  back_shiny: string;
  /**
   * The default depiction of this Pokémon from the front in battle.
   */
  front_default: string;
  /**
   * The shiny depiction of this Pokémon from the front in battle.
   */
  front_shiny: string;
  other: {
    dream_world: {
      front_default?: string;
      front_female?: string;
    };
    ['official-artwork']: {
      front_default?: string;
    };
  };
  versions: unknown;
}

/**
 * {@link https://pokeapi.co/docs/v2#pokemonability}
 */
interface PokemonAbility {
  /**
   * Whether or not this is a hidden ability.
   */
  is_hidden: boolean;
  /**
   * The slot this ability occupies in this Pokémon species.
   */
  slot: number;
  /**
   * The ability the Pokémon may have.
   */
  ability: Ability;
}

/**
 * {@link https://pokeapi.co/docs/v2#pokemonform}
 */
interface Form {
  id: number;
  name: string;
  order: number;
  form_order: number;
  is_default: boolean;
  is_battle_only: boolean;
  is_mega: boolean;
  form_name: string;
  pokemon: Pokemon;
  sprites: unknown;
  version_group: unknown;
  names: Name[];
  form_names: Name[];
}

/**
 * {@link https://pokeapi.co/docs/v2#generationgameindex}
 */
interface GenerationGameIndex {
  /**
   * The internal id of an API resource within game data.
   */
  game_index: number;
  /**
   * The generation relevant to this game index.
   */
  generation: unknown;
}

/**
 * {@link https://pokeapi.co/docs/v2#pokemonhelditem}
 */
interface PokemonHeldItem {
  /**
   * The item the referenced Pokémon holds.
   */
  item: unknown;
  /**
   * The details of the different versions in which the item is held.
   */
  version_details: unknown;
}

interface PokemonMove {
  /**
   * The move the Pokémon can learn.
   */
  move: unknown;
  /**
   * The details of the version in which the Pokémon can learn the move.
   */
  version_group_details: unknown;
}

/**
 * {@link https://pokeapi.co/docs/v2#name}
 */
interface Name {
  /**
   * The localized name for an API resource in a specific language.
   */
  name: string;
  /**
   * The language this name is in.
   */
  language: unknown;
}

/**
 * {@link https://pokeapi.co/docs/v2#ability}
 */
interface Ability {
  /**
   * The identifier for this resource.
   */
  id: number;
  /**
   * The name for this resource.
   */
  name: string;
  /**
   * Whether or not this ability originated in the main series of the video games.
   */
  is_main_series: boolean;
  /**
   * The generation this ability originated in.
   */
  generation: unknown;
  /**
   * The name of this resource listed in different languages.
   */
  names: unknown;
  /**
   * The effect of this ability listed in different languages.
   */
  effect_entries: unknown;
  /**
   * The list of previous effects this ability has had across version groups.
   */
  effect_changes: unknown;
  /**
   * The flavor text of this ability listed in different languages.
   */
  flavor_text_entries: unknown;
  /**
   * A list of Pokémon that could potentially have this ability.
   */
  pokemon: unknown;
}

// #region

export type Sprite = { name: string; url: string; isShiny: boolean };
// #endregion

export interface Language {
    name: string;
    url: string;
}

export interface EffectEntry {
    effect: string;
    language: Language;
}

export interface VersionGroup {
    name: string;
    url: string;
}

export interface EffectChange {
    effect_entries: EffectEntry[];
    version_group: VersionGroup;
}

export interface Language2 {
    name: string;
    url: string;
}

export interface EffectEntry2 {
    effect: string;
    language: Language2;
    short_effect: string;
}

export interface Language3 {
    name: string;
    url: string;
}

export interface VersionGroup2 {
    name: string;
    url: string;
}

export interface FlavorTextEntry {
    flavor_text: string;
    language: Language3;
    version_group: VersionGroup2;
}

export interface Generation {
    name: string;
    url: string;
}

export interface Language4 {
    name: string;
    url: string;
}

export interface Name {
    language: Language4;
    name: string;
}

export interface Pokemon2 {
    name: string;
    url: string;
}

export interface Pokemon {
    is_hidden: boolean;
    pokemon: Pokemon2;
    slot: number;
}

export interface SinglePokemonAbilityData {
    effect_changes: Array<EffectChange>;
    effect_entries: Array<EffectEntry2>;
    flavor_text_entries: Array<FlavorTextEntry>;
    generation: Generation;
    id: number;
    is_main_series: boolean;
    name: string;
    names: Array<Name>;
    pokemon: Array<Pokemon>;
}

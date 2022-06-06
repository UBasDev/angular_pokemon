export interface Result {
    name: string;
    url: string;
}

export interface AllPokemons {
    count: number;
    next: string;
    previous?: any;
    results: Result[];
}
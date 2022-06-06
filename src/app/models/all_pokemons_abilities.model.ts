export interface Result {
    name: string;
    url: string;
}

export interface AllAbilities {
    count: number;
    next: string;
    previous?: any;
    results: Array<Result>;
}
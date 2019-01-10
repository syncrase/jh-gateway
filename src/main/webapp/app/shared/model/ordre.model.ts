export interface IOrdre {
    id?: number;
    name?: string;
}

export class Ordre implements IOrdre {
    constructor(public id?: number, public name?: string) {}
}

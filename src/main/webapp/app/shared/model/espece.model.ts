export interface IEspece {
    id?: number;
    name?: string;
}

export class Espece implements IEspece {
    constructor(public id?: number, public name?: string) {}
}

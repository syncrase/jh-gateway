export interface IFamille {
    id?: number;
    name?: string;
}

export class Famille implements IFamille {
    constructor(public id?: number, public name?: string) {}
}

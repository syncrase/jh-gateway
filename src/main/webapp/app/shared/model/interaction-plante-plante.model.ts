import { IPlante } from 'app/shared/model//plante.model';

export interface IInteractionPlantePlante {
    id?: number;
    notation?: string;
    description?: string;
    dePlante?: IPlante;
    versPlante?: IPlante;
}

export class InteractionPlantePlante implements IInteractionPlantePlante {
    constructor(
        public id?: number,
        public notation?: string,
        public description?: string,
        public dePlante?: IPlante,
        public versPlante?: IPlante
    ) {}
}

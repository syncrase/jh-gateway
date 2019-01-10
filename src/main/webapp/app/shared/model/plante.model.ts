import { IClassificationCronquist } from 'app/shared/model//classification-cronquist.model';

export const enum Mois {
    JANVIER = 'JANVIER',
    FEVRIER = 'FEVRIER',
    MARS = 'MARS',
    AVRIL = 'AVRIL',
    MAI = 'MAI',
    JUIN = 'JUIN',
    JUILLET = 'JUILLET',
    AOUT = 'AOUT',
    SEPTEMBRE = 'SEPTEMBRE',
    OCTOBRE = 'OCTOBRE',
    NOVEMBRE = 'NOVEMBRE',
    DECEMBRE = 'DECEMBRE'
}

export const enum Strate {
    HYPOGEE = 'HYPOGEE',
    MUSCINALE = 'MUSCINALE',
    HERBACEE = 'HERBACEE',
    ARBUSTIVE = 'ARBUSTIVE',
    ARBOREE = 'ARBOREE'
}

export const enum VitesseCroissance {
    TRES_LENTE = 'TRES_LENTE',
    LENTE = 'LENTE',
    NORMALE = 'NORMALE',
    RAPIDE = 'RAPIDE',
    TRES_RAPIDE = 'TRES_RAPIDE'
}

export const enum Ensoleillement {
    SOLEIL = 'SOLEIL',
    MI_OMBRE = 'MI_OMBRE',
    OMBRE = 'OMBRE'
}

export const enum RichesseSol {
    TRES_PAUVRE = 'TRES_PAUVRE',
    PAUVRE = 'PAUVRE',
    NORMALE = 'NORMALE',
    RICHE = 'RICHE',
    TRES_RICHE = 'TRES_RICHE'
}

export const enum TypeTerre {
    ARGILEUSE = 'ARGILEUSE',
    CALCAIRE = 'CALCAIRE',
    HUMIFERE = 'HUMIFERE',
    SABLEUSE = 'SABLEUSE'
}

export const enum TypeFeuillage {
    PERSISTANT = 'PERSISTANT',
    SEMI_PERSISTANT = 'SEMI_PERSISTANT',
    MARCESCENT = 'MARCESCENT',
    CADUC = 'CADUC'
}

export const enum TypeRacine {
    PIVOTANTE = 'PIVOTANTE',
    FASCICULAIRE = 'FASCICULAIRE',
    ADVENTICE = 'ADVENTICE',
    TRACANTE = 'TRACANTE',
    CONTREFORT = 'CONTREFORT',
    CRAMPON = 'CRAMPON',
    ECHASSE = 'ECHASSE',
    AERIENNE = 'AERIENNE',
    LIANE = 'LIANE',
    VENTOUSE = 'VENTOUSE',
    PNEUMATOPHORE = 'PNEUMATOPHORE'
}

export interface IPlante {
    id?: number;
    floraison?: Mois;
    recolte?: Mois;
    strate?: Strate;
    croissance?: VitesseCroissance;
    ensoleillement?: Ensoleillement;
    phMin?: string;
    phMax?: string;
    richesseSol?: RichesseSol;
    typeTerre?: TypeTerre;
    tempMin?: number;
    tempMax?: number;
    typeFeuillage?: TypeFeuillage;
    typeRacine?: TypeRacine;
    classificationCronquist?: IClassificationCronquist;
}

export class Plante implements IPlante {
    constructor(
        public id?: number,
        public floraison?: Mois,
        public recolte?: Mois,
        public strate?: Strate,
        public croissance?: VitesseCroissance,
        public ensoleillement?: Ensoleillement,
        public phMin?: string,
        public phMax?: string,
        public richesseSol?: RichesseSol,
        public typeTerre?: TypeTerre,
        public tempMin?: number,
        public tempMax?: number,
        public typeFeuillage?: TypeFeuillage,
        public typeRacine?: TypeRacine,
        public classificationCronquist?: IClassificationCronquist
    ) {}
}

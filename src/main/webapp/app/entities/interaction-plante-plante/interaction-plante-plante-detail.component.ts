import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInteractionPlantePlante } from 'app/shared/model/interaction-plante-plante.model';

@Component({
    selector: 'jhi-interaction-plante-plante-detail',
    templateUrl: './interaction-plante-plante-detail.component.html'
})
export class InteractionPlantePlanteDetailComponent implements OnInit {
    interactionPlantePlante: IInteractionPlantePlante;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ interactionPlantePlante }) => {
            this.interactionPlantePlante = interactionPlantePlante;
        });
    }

    previousState() {
        window.history.back();
    }
}

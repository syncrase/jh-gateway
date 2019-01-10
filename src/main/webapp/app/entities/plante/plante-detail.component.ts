import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlante } from 'app/shared/model/plante.model';

@Component({
    selector: 'jhi-plante-detail',
    templateUrl: './plante-detail.component.html'
})
export class PlanteDetailComponent implements OnInit {
    plante: IPlante;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ plante }) => {
            this.plante = plante;
        });
    }

    previousState() {
        window.history.back();
    }
}

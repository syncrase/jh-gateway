import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEspece } from 'app/shared/model/espece.model';

@Component({
    selector: 'jhi-espece-detail',
    templateUrl: './espece-detail.component.html'
})
export class EspeceDetailComponent implements OnInit {
    espece: IEspece;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ espece }) => {
            this.espece = espece;
        });
    }

    previousState() {
        window.history.back();
    }
}

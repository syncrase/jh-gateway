import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrdre } from 'app/shared/model/ordre.model';

@Component({
    selector: 'jhi-ordre-detail',
    templateUrl: './ordre-detail.component.html'
})
export class OrdreDetailComponent implements OnInit {
    ordre: IOrdre;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ordre }) => {
            this.ordre = ordre;
        });
    }

    previousState() {
        window.history.back();
    }
}

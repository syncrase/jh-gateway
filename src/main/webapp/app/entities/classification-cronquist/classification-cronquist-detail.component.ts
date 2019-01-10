import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClassificationCronquist } from 'app/shared/model/classification-cronquist.model';

@Component({
    selector: 'jhi-classification-cronquist-detail',
    templateUrl: './classification-cronquist-detail.component.html'
})
export class ClassificationCronquistDetailComponent implements OnInit {
    classificationCronquist: IClassificationCronquist;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ classificationCronquist }) => {
            this.classificationCronquist = classificationCronquist;
        });
    }

    previousState() {
        window.history.back();
    }
}

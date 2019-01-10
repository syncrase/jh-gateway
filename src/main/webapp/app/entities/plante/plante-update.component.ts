import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPlante } from 'app/shared/model/plante.model';
import { PlanteService } from './plante.service';
import { IClassificationCronquist } from 'app/shared/model/classification-cronquist.model';
import { ClassificationCronquistService } from 'app/entities/classification-cronquist';

@Component({
    selector: 'jhi-plante-update',
    templateUrl: './plante-update.component.html'
})
export class PlanteUpdateComponent implements OnInit {
    plante: IPlante;
    isSaving: boolean;

    classificationcronquists: IClassificationCronquist[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected planteService: PlanteService,
        protected classificationCronquistService: ClassificationCronquistService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ plante }) => {
            this.plante = plante;
        });
        this.classificationCronquistService.query({ filter: 'plante-is-null' }).subscribe(
            (res: HttpResponse<IClassificationCronquist[]>) => {
                if (!this.plante.classificationCronquist || !this.plante.classificationCronquist.id) {
                    this.classificationcronquists = res.body;
                } else {
                    this.classificationCronquistService.find(this.plante.classificationCronquist.id).subscribe(
                        (subRes: HttpResponse<IClassificationCronquist>) => {
                            this.classificationcronquists = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.plante.id !== undefined) {
            this.subscribeToSaveResponse(this.planteService.update(this.plante));
        } else {
            this.subscribeToSaveResponse(this.planteService.create(this.plante));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlante>>) {
        result.subscribe((res: HttpResponse<IPlante>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackClassificationCronquistById(index: number, item: IClassificationCronquist) {
        return item.id;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEspece } from 'app/shared/model/espece.model';
import { EspeceService } from './espece.service';

@Component({
    selector: 'jhi-espece-update',
    templateUrl: './espece-update.component.html'
})
export class EspeceUpdateComponent implements OnInit {
    espece: IEspece;
    isSaving: boolean;

    constructor(protected especeService: EspeceService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ espece }) => {
            this.espece = espece;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.espece.id !== undefined) {
            this.subscribeToSaveResponse(this.especeService.update(this.espece));
        } else {
            this.subscribeToSaveResponse(this.especeService.create(this.espece));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEspece>>) {
        result.subscribe((res: HttpResponse<IEspece>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}

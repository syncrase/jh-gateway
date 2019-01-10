import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IFamille } from 'app/shared/model/famille.model';
import { FamilleService } from './famille.service';

@Component({
    selector: 'jhi-famille-update',
    templateUrl: './famille-update.component.html'
})
export class FamilleUpdateComponent implements OnInit {
    famille: IFamille;
    isSaving: boolean;

    constructor(protected familleService: FamilleService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ famille }) => {
            this.famille = famille;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.famille.id !== undefined) {
            this.subscribeToSaveResponse(this.familleService.update(this.famille));
        } else {
            this.subscribeToSaveResponse(this.familleService.create(this.famille));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFamille>>) {
        result.subscribe((res: HttpResponse<IFamille>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}

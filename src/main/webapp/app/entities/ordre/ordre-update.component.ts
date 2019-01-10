import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IOrdre } from 'app/shared/model/ordre.model';
import { OrdreService } from './ordre.service';

@Component({
    selector: 'jhi-ordre-update',
    templateUrl: './ordre-update.component.html'
})
export class OrdreUpdateComponent implements OnInit {
    ordre: IOrdre;
    isSaving: boolean;

    constructor(protected ordreService: OrdreService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ordre }) => {
            this.ordre = ordre;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.ordre.id !== undefined) {
            this.subscribeToSaveResponse(this.ordreService.update(this.ordre));
        } else {
            this.subscribeToSaveResponse(this.ordreService.create(this.ordre));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrdre>>) {
        result.subscribe((res: HttpResponse<IOrdre>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}

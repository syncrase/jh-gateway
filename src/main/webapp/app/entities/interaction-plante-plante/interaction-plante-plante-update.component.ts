import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IInteractionPlantePlante } from 'app/shared/model/interaction-plante-plante.model';
import { InteractionPlantePlanteService } from './interaction-plante-plante.service';
import { IPlante } from 'app/shared/model/plante.model';
import { PlanteService } from 'app/entities/plante';

@Component({
    selector: 'jhi-interaction-plante-plante-update',
    templateUrl: './interaction-plante-plante-update.component.html'
})
export class InteractionPlantePlanteUpdateComponent implements OnInit {
    interactionPlantePlante: IInteractionPlantePlante;
    isSaving: boolean;

    plantes: IPlante[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected interactionPlantePlanteService: InteractionPlantePlanteService,
        protected planteService: PlanteService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ interactionPlantePlante }) => {
            this.interactionPlantePlante = interactionPlantePlante;
        });
        this.planteService.query().subscribe(
            (res: HttpResponse<IPlante[]>) => {
                this.plantes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.interactionPlantePlante.id !== undefined) {
            this.subscribeToSaveResponse(this.interactionPlantePlanteService.update(this.interactionPlantePlante));
        } else {
            this.subscribeToSaveResponse(this.interactionPlantePlanteService.create(this.interactionPlantePlante));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IInteractionPlantePlante>>) {
        result.subscribe(
            (res: HttpResponse<IInteractionPlantePlante>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackPlanteById(index: number, item: IPlante) {
        return item.id;
    }
}

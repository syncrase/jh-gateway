import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IInteractionPlantePlante } from 'app/shared/model/interaction-plante-plante.model';
import { AccountService } from 'app/core';
import { InteractionPlantePlanteService } from './interaction-plante-plante.service';

@Component({
    selector: 'jhi-interaction-plante-plante',
    templateUrl: './interaction-plante-plante.component.html'
})
export class InteractionPlantePlanteComponent implements OnInit, OnDestroy {
    interactionPlantePlantes: IInteractionPlantePlante[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected interactionPlantePlanteService: InteractionPlantePlanteService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.interactionPlantePlanteService.query().subscribe(
            (res: HttpResponse<IInteractionPlantePlante[]>) => {
                this.interactionPlantePlantes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInInteractionPlantePlantes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IInteractionPlantePlante) {
        return item.id;
    }

    registerChangeInInteractionPlantePlantes() {
        this.eventSubscriber = this.eventManager.subscribe('interactionPlantePlanteListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

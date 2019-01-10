import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPlante } from 'app/shared/model/plante.model';
import { AccountService } from 'app/core';
import { PlanteService } from './plante.service';

@Component({
    selector: 'jhi-plante',
    templateUrl: './plante.component.html'
})
export class PlanteComponent implements OnInit, OnDestroy {
    plantes: IPlante[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected planteService: PlanteService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.planteService.query().subscribe(
            (res: HttpResponse<IPlante[]>) => {
                this.plantes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPlantes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPlante) {
        return item.id;
    }

    registerChangeInPlantes() {
        this.eventSubscriber = this.eventManager.subscribe('planteListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

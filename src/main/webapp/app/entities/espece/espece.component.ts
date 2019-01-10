import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEspece } from 'app/shared/model/espece.model';
import { AccountService } from 'app/core';
import { EspeceService } from './espece.service';

@Component({
    selector: 'jhi-espece',
    templateUrl: './espece.component.html'
})
export class EspeceComponent implements OnInit, OnDestroy {
    especes: IEspece[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected especeService: EspeceService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.especeService.query().subscribe(
            (res: HttpResponse<IEspece[]>) => {
                this.especes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEspeces();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEspece) {
        return item.id;
    }

    registerChangeInEspeces() {
        this.eventSubscriber = this.eventManager.subscribe('especeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

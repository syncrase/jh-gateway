import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrdre } from 'app/shared/model/ordre.model';
import { AccountService } from 'app/core';
import { OrdreService } from './ordre.service';

@Component({
    selector: 'jhi-ordre',
    templateUrl: './ordre.component.html'
})
export class OrdreComponent implements OnInit, OnDestroy {
    ordres: IOrdre[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected ordreService: OrdreService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.ordreService.query().subscribe(
            (res: HttpResponse<IOrdre[]>) => {
                this.ordres = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOrdres();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOrdre) {
        return item.id;
    }

    registerChangeInOrdres() {
        this.eventSubscriber = this.eventManager.subscribe('ordreListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFamille } from 'app/shared/model/famille.model';
import { AccountService } from 'app/core';
import { FamilleService } from './famille.service';

@Component({
    selector: 'jhi-famille',
    templateUrl: './famille.component.html'
})
export class FamilleComponent implements OnInit, OnDestroy {
    familles: IFamille[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected familleService: FamilleService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.familleService.query().subscribe(
            (res: HttpResponse<IFamille[]>) => {
                this.familles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFamilles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFamille) {
        return item.id;
    }

    registerChangeInFamilles() {
        this.eventSubscriber = this.eventManager.subscribe('familleListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

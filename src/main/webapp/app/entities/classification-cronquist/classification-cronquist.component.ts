import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IClassificationCronquist } from 'app/shared/model/classification-cronquist.model';
import { AccountService } from 'app/core';
import { ClassificationCronquistService } from './classification-cronquist.service';

@Component({
    selector: 'jhi-classification-cronquist',
    templateUrl: './classification-cronquist.component.html'
})
export class ClassificationCronquistComponent implements OnInit, OnDestroy {
    classificationCronquists: IClassificationCronquist[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected classificationCronquistService: ClassificationCronquistService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.classificationCronquistService.query().subscribe(
            (res: HttpResponse<IClassificationCronquist[]>) => {
                this.classificationCronquists = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInClassificationCronquists();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IClassificationCronquist) {
        return item.id;
    }

    registerChangeInClassificationCronquists() {
        this.eventSubscriber = this.eventManager.subscribe('classificationCronquistListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

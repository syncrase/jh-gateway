import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEspece } from 'app/shared/model/espece.model';
import { EspeceService } from './espece.service';

@Component({
    selector: 'jhi-espece-delete-dialog',
    templateUrl: './espece-delete-dialog.component.html'
})
export class EspeceDeleteDialogComponent {
    espece: IEspece;

    constructor(protected especeService: EspeceService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.especeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'especeListModification',
                content: 'Deleted an espece'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-espece-delete-popup',
    template: ''
})
export class EspeceDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ espece }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EspeceDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.espece = espece;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}

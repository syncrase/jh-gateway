import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFamille } from 'app/shared/model/famille.model';
import { FamilleService } from './famille.service';

@Component({
    selector: 'jhi-famille-delete-dialog',
    templateUrl: './famille-delete-dialog.component.html'
})
export class FamilleDeleteDialogComponent {
    famille: IFamille;

    constructor(protected familleService: FamilleService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.familleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'familleListModification',
                content: 'Deleted an famille'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-famille-delete-popup',
    template: ''
})
export class FamilleDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ famille }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FamilleDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.famille = famille;
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

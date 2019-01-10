import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClassificationCronquist } from 'app/shared/model/classification-cronquist.model';
import { ClassificationCronquistService } from './classification-cronquist.service';

@Component({
    selector: 'jhi-classification-cronquist-delete-dialog',
    templateUrl: './classification-cronquist-delete-dialog.component.html'
})
export class ClassificationCronquistDeleteDialogComponent {
    classificationCronquist: IClassificationCronquist;

    constructor(
        protected classificationCronquistService: ClassificationCronquistService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.classificationCronquistService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'classificationCronquistListModification',
                content: 'Deleted an classificationCronquist'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-classification-cronquist-delete-popup',
    template: ''
})
export class ClassificationCronquistDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ classificationCronquist }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ClassificationCronquistDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.classificationCronquist = classificationCronquist;
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

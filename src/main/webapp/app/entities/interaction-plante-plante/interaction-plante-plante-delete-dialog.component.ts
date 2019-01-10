import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInteractionPlantePlante } from 'app/shared/model/interaction-plante-plante.model';
import { InteractionPlantePlanteService } from './interaction-plante-plante.service';

@Component({
    selector: 'jhi-interaction-plante-plante-delete-dialog',
    templateUrl: './interaction-plante-plante-delete-dialog.component.html'
})
export class InteractionPlantePlanteDeleteDialogComponent {
    interactionPlantePlante: IInteractionPlantePlante;

    constructor(
        protected interactionPlantePlanteService: InteractionPlantePlanteService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.interactionPlantePlanteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'interactionPlantePlanteListModification',
                content: 'Deleted an interactionPlantePlante'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-interaction-plante-plante-delete-popup',
    template: ''
})
export class InteractionPlantePlanteDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ interactionPlantePlante }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InteractionPlantePlanteDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.interactionPlantePlante = interactionPlantePlante;
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

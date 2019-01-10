import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    PlanteComponent,
    PlanteDetailComponent,
    PlanteUpdateComponent,
    PlanteDeletePopupComponent,
    PlanteDeleteDialogComponent,
    planteRoute,
    plantePopupRoute
} from './';

const ENTITY_STATES = [...planteRoute, ...plantePopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [PlanteComponent, PlanteDetailComponent, PlanteUpdateComponent, PlanteDeleteDialogComponent, PlanteDeletePopupComponent],
    entryComponents: [PlanteComponent, PlanteUpdateComponent, PlanteDeleteDialogComponent, PlanteDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPlanteModule {}

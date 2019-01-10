import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    InteractionPlantePlanteComponent,
    InteractionPlantePlanteDetailComponent,
    InteractionPlantePlanteUpdateComponent,
    InteractionPlantePlanteDeletePopupComponent,
    InteractionPlantePlanteDeleteDialogComponent,
    interactionPlantePlanteRoute,
    interactionPlantePlantePopupRoute
} from './';

const ENTITY_STATES = [...interactionPlantePlanteRoute, ...interactionPlantePlantePopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InteractionPlantePlanteComponent,
        InteractionPlantePlanteDetailComponent,
        InteractionPlantePlanteUpdateComponent,
        InteractionPlantePlanteDeleteDialogComponent,
        InteractionPlantePlanteDeletePopupComponent
    ],
    entryComponents: [
        InteractionPlantePlanteComponent,
        InteractionPlantePlanteUpdateComponent,
        InteractionPlantePlanteDeleteDialogComponent,
        InteractionPlantePlanteDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayInteractionPlantePlanteModule {}

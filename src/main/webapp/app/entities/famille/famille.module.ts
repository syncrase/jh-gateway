import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    FamilleComponent,
    FamilleDetailComponent,
    FamilleUpdateComponent,
    FamilleDeletePopupComponent,
    FamilleDeleteDialogComponent,
    familleRoute,
    famillePopupRoute
} from './';

const ENTITY_STATES = [...familleRoute, ...famillePopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FamilleComponent,
        FamilleDetailComponent,
        FamilleUpdateComponent,
        FamilleDeleteDialogComponent,
        FamilleDeletePopupComponent
    ],
    entryComponents: [FamilleComponent, FamilleUpdateComponent, FamilleDeleteDialogComponent, FamilleDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFamilleModule {}

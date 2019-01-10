import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    EspeceComponent,
    EspeceDetailComponent,
    EspeceUpdateComponent,
    EspeceDeletePopupComponent,
    EspeceDeleteDialogComponent,
    especeRoute,
    especePopupRoute
} from './';

const ENTITY_STATES = [...especeRoute, ...especePopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [EspeceComponent, EspeceDetailComponent, EspeceUpdateComponent, EspeceDeleteDialogComponent, EspeceDeletePopupComponent],
    entryComponents: [EspeceComponent, EspeceUpdateComponent, EspeceDeleteDialogComponent, EspeceDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEspeceModule {}

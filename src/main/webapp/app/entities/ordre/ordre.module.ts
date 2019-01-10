import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    OrdreComponent,
    OrdreDetailComponent,
    OrdreUpdateComponent,
    OrdreDeletePopupComponent,
    OrdreDeleteDialogComponent,
    ordreRoute,
    ordrePopupRoute
} from './';

const ENTITY_STATES = [...ordreRoute, ...ordrePopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [OrdreComponent, OrdreDetailComponent, OrdreUpdateComponent, OrdreDeleteDialogComponent, OrdreDeletePopupComponent],
    entryComponents: [OrdreComponent, OrdreUpdateComponent, OrdreDeleteDialogComponent, OrdreDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayOrdreModule {}

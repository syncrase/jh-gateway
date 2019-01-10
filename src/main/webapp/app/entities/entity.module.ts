import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayPlanteModule } from './plante/plante.module';
import { GatewayClassificationCronquistModule } from './classification-cronquist/classification-cronquist.module';
import { GatewayOrdreModule } from './ordre/ordre.module';
import { GatewayFamilleModule } from './famille/famille.module';
import { GatewayGenreModule } from './genre/genre.module';
import { GatewayEspeceModule } from './espece/espece.module';
import { GatewayInteractionPlantePlanteModule } from './interaction-plante-plante/interaction-plante-plante.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        GatewayPlanteModule,
        GatewayClassificationCronquistModule,
        GatewayOrdreModule,
        GatewayFamilleModule,
        GatewayGenreModule,
        GatewayEspeceModule,
        GatewayInteractionPlantePlanteModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}

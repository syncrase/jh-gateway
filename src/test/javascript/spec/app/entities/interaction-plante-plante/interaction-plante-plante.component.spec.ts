/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { InteractionPlantePlanteComponent } from 'app/entities/interaction-plante-plante/interaction-plante-plante.component';
import { InteractionPlantePlanteService } from 'app/entities/interaction-plante-plante/interaction-plante-plante.service';
import { InteractionPlantePlante } from 'app/shared/model/interaction-plante-plante.model';

describe('Component Tests', () => {
    describe('InteractionPlantePlante Management Component', () => {
        let comp: InteractionPlantePlanteComponent;
        let fixture: ComponentFixture<InteractionPlantePlanteComponent>;
        let service: InteractionPlantePlanteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [InteractionPlantePlanteComponent],
                providers: []
            })
                .overrideTemplate(InteractionPlantePlanteComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InteractionPlantePlanteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InteractionPlantePlanteService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new InteractionPlantePlante(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.interactionPlantePlantes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

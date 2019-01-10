/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { InteractionPlantePlanteUpdateComponent } from 'app/entities/interaction-plante-plante/interaction-plante-plante-update.component';
import { InteractionPlantePlanteService } from 'app/entities/interaction-plante-plante/interaction-plante-plante.service';
import { InteractionPlantePlante } from 'app/shared/model/interaction-plante-plante.model';

describe('Component Tests', () => {
    describe('InteractionPlantePlante Management Update Component', () => {
        let comp: InteractionPlantePlanteUpdateComponent;
        let fixture: ComponentFixture<InteractionPlantePlanteUpdateComponent>;
        let service: InteractionPlantePlanteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [InteractionPlantePlanteUpdateComponent]
            })
                .overrideTemplate(InteractionPlantePlanteUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InteractionPlantePlanteUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InteractionPlantePlanteService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new InteractionPlantePlante(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.interactionPlantePlante = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new InteractionPlantePlante();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.interactionPlantePlante = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});

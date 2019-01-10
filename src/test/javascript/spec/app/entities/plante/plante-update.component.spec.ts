/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { PlanteUpdateComponent } from 'app/entities/plante/plante-update.component';
import { PlanteService } from 'app/entities/plante/plante.service';
import { Plante } from 'app/shared/model/plante.model';

describe('Component Tests', () => {
    describe('Plante Management Update Component', () => {
        let comp: PlanteUpdateComponent;
        let fixture: ComponentFixture<PlanteUpdateComponent>;
        let service: PlanteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PlanteUpdateComponent]
            })
                .overrideTemplate(PlanteUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PlanteUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlanteService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Plante(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.plante = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Plante();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.plante = entity;
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

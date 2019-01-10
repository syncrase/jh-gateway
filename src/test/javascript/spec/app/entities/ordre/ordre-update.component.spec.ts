/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { OrdreUpdateComponent } from 'app/entities/ordre/ordre-update.component';
import { OrdreService } from 'app/entities/ordre/ordre.service';
import { Ordre } from 'app/shared/model/ordre.model';

describe('Component Tests', () => {
    describe('Ordre Management Update Component', () => {
        let comp: OrdreUpdateComponent;
        let fixture: ComponentFixture<OrdreUpdateComponent>;
        let service: OrdreService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [OrdreUpdateComponent]
            })
                .overrideTemplate(OrdreUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrdreUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrdreService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Ordre(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.ordre = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Ordre();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.ordre = entity;
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

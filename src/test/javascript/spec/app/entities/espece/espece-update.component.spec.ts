/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { EspeceUpdateComponent } from 'app/entities/espece/espece-update.component';
import { EspeceService } from 'app/entities/espece/espece.service';
import { Espece } from 'app/shared/model/espece.model';

describe('Component Tests', () => {
    describe('Espece Management Update Component', () => {
        let comp: EspeceUpdateComponent;
        let fixture: ComponentFixture<EspeceUpdateComponent>;
        let service: EspeceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [EspeceUpdateComponent]
            })
                .overrideTemplate(EspeceUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EspeceUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EspeceService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Espece(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.espece = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Espece();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.espece = entity;
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

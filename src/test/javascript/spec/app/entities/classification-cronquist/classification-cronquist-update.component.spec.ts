/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { ClassificationCronquistUpdateComponent } from 'app/entities/classification-cronquist/classification-cronquist-update.component';
import { ClassificationCronquistService } from 'app/entities/classification-cronquist/classification-cronquist.service';
import { ClassificationCronquist } from 'app/shared/model/classification-cronquist.model';

describe('Component Tests', () => {
    describe('ClassificationCronquist Management Update Component', () => {
        let comp: ClassificationCronquistUpdateComponent;
        let fixture: ComponentFixture<ClassificationCronquistUpdateComponent>;
        let service: ClassificationCronquistService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ClassificationCronquistUpdateComponent]
            })
                .overrideTemplate(ClassificationCronquistUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ClassificationCronquistUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassificationCronquistService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ClassificationCronquist(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.classificationCronquist = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ClassificationCronquist();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.classificationCronquist = entity;
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

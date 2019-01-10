/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { ClassificationCronquistComponent } from 'app/entities/classification-cronquist/classification-cronquist.component';
import { ClassificationCronquistService } from 'app/entities/classification-cronquist/classification-cronquist.service';
import { ClassificationCronquist } from 'app/shared/model/classification-cronquist.model';

describe('Component Tests', () => {
    describe('ClassificationCronquist Management Component', () => {
        let comp: ClassificationCronquistComponent;
        let fixture: ComponentFixture<ClassificationCronquistComponent>;
        let service: ClassificationCronquistService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ClassificationCronquistComponent],
                providers: []
            })
                .overrideTemplate(ClassificationCronquistComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ClassificationCronquistComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassificationCronquistService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ClassificationCronquist(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.classificationCronquists[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

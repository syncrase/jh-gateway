/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { OrdreComponent } from 'app/entities/ordre/ordre.component';
import { OrdreService } from 'app/entities/ordre/ordre.service';
import { Ordre } from 'app/shared/model/ordre.model';

describe('Component Tests', () => {
    describe('Ordre Management Component', () => {
        let comp: OrdreComponent;
        let fixture: ComponentFixture<OrdreComponent>;
        let service: OrdreService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [OrdreComponent],
                providers: []
            })
                .overrideTemplate(OrdreComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrdreComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrdreService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Ordre(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.ordres[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

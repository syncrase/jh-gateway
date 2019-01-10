/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { PlanteComponent } from 'app/entities/plante/plante.component';
import { PlanteService } from 'app/entities/plante/plante.service';
import { Plante } from 'app/shared/model/plante.model';

describe('Component Tests', () => {
    describe('Plante Management Component', () => {
        let comp: PlanteComponent;
        let fixture: ComponentFixture<PlanteComponent>;
        let service: PlanteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PlanteComponent],
                providers: []
            })
                .overrideTemplate(PlanteComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PlanteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlanteService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Plante(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.plantes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

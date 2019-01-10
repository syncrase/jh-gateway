/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { PlanteDetailComponent } from 'app/entities/plante/plante-detail.component';
import { Plante } from 'app/shared/model/plante.model';

describe('Component Tests', () => {
    describe('Plante Management Detail Component', () => {
        let comp: PlanteDetailComponent;
        let fixture: ComponentFixture<PlanteDetailComponent>;
        const route = ({ data: of({ plante: new Plante(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PlanteDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PlanteDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PlanteDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.plante).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { OrdreDetailComponent } from 'app/entities/ordre/ordre-detail.component';
import { Ordre } from 'app/shared/model/ordre.model';

describe('Component Tests', () => {
    describe('Ordre Management Detail Component', () => {
        let comp: OrdreDetailComponent;
        let fixture: ComponentFixture<OrdreDetailComponent>;
        const route = ({ data: of({ ordre: new Ordre(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [OrdreDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrdreDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrdreDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ordre).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

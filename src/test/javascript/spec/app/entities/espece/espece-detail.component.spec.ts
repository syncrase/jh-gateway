/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { EspeceDetailComponent } from 'app/entities/espece/espece-detail.component';
import { Espece } from 'app/shared/model/espece.model';

describe('Component Tests', () => {
    describe('Espece Management Detail Component', () => {
        let comp: EspeceDetailComponent;
        let fixture: ComponentFixture<EspeceDetailComponent>;
        const route = ({ data: of({ espece: new Espece(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [EspeceDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EspeceDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EspeceDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.espece).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

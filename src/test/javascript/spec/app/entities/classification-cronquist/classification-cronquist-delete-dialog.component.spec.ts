/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { ClassificationCronquistDeleteDialogComponent } from 'app/entities/classification-cronquist/classification-cronquist-delete-dialog.component';
import { ClassificationCronquistService } from 'app/entities/classification-cronquist/classification-cronquist.service';

describe('Component Tests', () => {
    describe('ClassificationCronquist Management Delete Component', () => {
        let comp: ClassificationCronquistDeleteDialogComponent;
        let fixture: ComponentFixture<ClassificationCronquistDeleteDialogComponent>;
        let service: ClassificationCronquistService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ClassificationCronquistDeleteDialogComponent]
            })
                .overrideTemplate(ClassificationCronquistDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ClassificationCronquistDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassificationCronquistService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});

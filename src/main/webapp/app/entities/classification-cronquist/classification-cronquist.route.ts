import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ClassificationCronquist } from 'app/shared/model/classification-cronquist.model';
import { ClassificationCronquistService } from './classification-cronquist.service';
import { ClassificationCronquistComponent } from './classification-cronquist.component';
import { ClassificationCronquistDetailComponent } from './classification-cronquist-detail.component';
import { ClassificationCronquistUpdateComponent } from './classification-cronquist-update.component';
import { ClassificationCronquistDeletePopupComponent } from './classification-cronquist-delete-dialog.component';
import { IClassificationCronquist } from 'app/shared/model/classification-cronquist.model';

@Injectable({ providedIn: 'root' })
export class ClassificationCronquistResolve implements Resolve<IClassificationCronquist> {
    constructor(private service: ClassificationCronquistService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ClassificationCronquist> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ClassificationCronquist>) => response.ok),
                map((classificationCronquist: HttpResponse<ClassificationCronquist>) => classificationCronquist.body)
            );
        }
        return of(new ClassificationCronquist());
    }
}

export const classificationCronquistRoute: Routes = [
    {
        path: 'classification-cronquist',
        component: ClassificationCronquistComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClassificationCronquists'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'classification-cronquist/:id/view',
        component: ClassificationCronquistDetailComponent,
        resolve: {
            classificationCronquist: ClassificationCronquistResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClassificationCronquists'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'classification-cronquist/new',
        component: ClassificationCronquistUpdateComponent,
        resolve: {
            classificationCronquist: ClassificationCronquistResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClassificationCronquists'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'classification-cronquist/:id/edit',
        component: ClassificationCronquistUpdateComponent,
        resolve: {
            classificationCronquist: ClassificationCronquistResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClassificationCronquists'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const classificationCronquistPopupRoute: Routes = [
    {
        path: 'classification-cronquist/:id/delete',
        component: ClassificationCronquistDeletePopupComponent,
        resolve: {
            classificationCronquist: ClassificationCronquistResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClassificationCronquists'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Espece } from 'app/shared/model/espece.model';
import { EspeceService } from './espece.service';
import { EspeceComponent } from './espece.component';
import { EspeceDetailComponent } from './espece-detail.component';
import { EspeceUpdateComponent } from './espece-update.component';
import { EspeceDeletePopupComponent } from './espece-delete-dialog.component';
import { IEspece } from 'app/shared/model/espece.model';

@Injectable({ providedIn: 'root' })
export class EspeceResolve implements Resolve<IEspece> {
    constructor(private service: EspeceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Espece> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Espece>) => response.ok),
                map((espece: HttpResponse<Espece>) => espece.body)
            );
        }
        return of(new Espece());
    }
}

export const especeRoute: Routes = [
    {
        path: 'espece',
        component: EspeceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Especes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'espece/:id/view',
        component: EspeceDetailComponent,
        resolve: {
            espece: EspeceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Especes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'espece/new',
        component: EspeceUpdateComponent,
        resolve: {
            espece: EspeceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Especes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'espece/:id/edit',
        component: EspeceUpdateComponent,
        resolve: {
            espece: EspeceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Especes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const especePopupRoute: Routes = [
    {
        path: 'espece/:id/delete',
        component: EspeceDeletePopupComponent,
        resolve: {
            espece: EspeceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Especes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

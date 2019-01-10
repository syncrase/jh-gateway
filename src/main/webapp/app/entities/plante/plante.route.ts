import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Plante } from 'app/shared/model/plante.model';
import { PlanteService } from './plante.service';
import { PlanteComponent } from './plante.component';
import { PlanteDetailComponent } from './plante-detail.component';
import { PlanteUpdateComponent } from './plante-update.component';
import { PlanteDeletePopupComponent } from './plante-delete-dialog.component';
import { IPlante } from 'app/shared/model/plante.model';

@Injectable({ providedIn: 'root' })
export class PlanteResolve implements Resolve<IPlante> {
    constructor(private service: PlanteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Plante> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Plante>) => response.ok),
                map((plante: HttpResponse<Plante>) => plante.body)
            );
        }
        return of(new Plante());
    }
}

export const planteRoute: Routes = [
    {
        path: 'plante',
        component: PlanteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plantes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'plante/:id/view',
        component: PlanteDetailComponent,
        resolve: {
            plante: PlanteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plantes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'plante/new',
        component: PlanteUpdateComponent,
        resolve: {
            plante: PlanteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plantes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'plante/:id/edit',
        component: PlanteUpdateComponent,
        resolve: {
            plante: PlanteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plantes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const plantePopupRoute: Routes = [
    {
        path: 'plante/:id/delete',
        component: PlanteDeletePopupComponent,
        resolve: {
            plante: PlanteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plantes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

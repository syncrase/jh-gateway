import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Famille } from 'app/shared/model/famille.model';
import { FamilleService } from './famille.service';
import { FamilleComponent } from './famille.component';
import { FamilleDetailComponent } from './famille-detail.component';
import { FamilleUpdateComponent } from './famille-update.component';
import { FamilleDeletePopupComponent } from './famille-delete-dialog.component';
import { IFamille } from 'app/shared/model/famille.model';

@Injectable({ providedIn: 'root' })
export class FamilleResolve implements Resolve<IFamille> {
    constructor(private service: FamilleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Famille> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Famille>) => response.ok),
                map((famille: HttpResponse<Famille>) => famille.body)
            );
        }
        return of(new Famille());
    }
}

export const familleRoute: Routes = [
    {
        path: 'famille',
        component: FamilleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Familles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'famille/:id/view',
        component: FamilleDetailComponent,
        resolve: {
            famille: FamilleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Familles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'famille/new',
        component: FamilleUpdateComponent,
        resolve: {
            famille: FamilleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Familles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'famille/:id/edit',
        component: FamilleUpdateComponent,
        resolve: {
            famille: FamilleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Familles'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const famillePopupRoute: Routes = [
    {
        path: 'famille/:id/delete',
        component: FamilleDeletePopupComponent,
        resolve: {
            famille: FamilleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Familles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

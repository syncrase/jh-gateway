import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { InteractionPlantePlante } from 'app/shared/model/interaction-plante-plante.model';
import { InteractionPlantePlanteService } from './interaction-plante-plante.service';
import { InteractionPlantePlanteComponent } from './interaction-plante-plante.component';
import { InteractionPlantePlanteDetailComponent } from './interaction-plante-plante-detail.component';
import { InteractionPlantePlanteUpdateComponent } from './interaction-plante-plante-update.component';
import { InteractionPlantePlanteDeletePopupComponent } from './interaction-plante-plante-delete-dialog.component';
import { IInteractionPlantePlante } from 'app/shared/model/interaction-plante-plante.model';

@Injectable({ providedIn: 'root' })
export class InteractionPlantePlanteResolve implements Resolve<IInteractionPlantePlante> {
    constructor(private service: InteractionPlantePlanteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InteractionPlantePlante> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<InteractionPlantePlante>) => response.ok),
                map((interactionPlantePlante: HttpResponse<InteractionPlantePlante>) => interactionPlantePlante.body)
            );
        }
        return of(new InteractionPlantePlante());
    }
}

export const interactionPlantePlanteRoute: Routes = [
    {
        path: 'interaction-plante-plante',
        component: InteractionPlantePlanteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InteractionPlantePlantes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'interaction-plante-plante/:id/view',
        component: InteractionPlantePlanteDetailComponent,
        resolve: {
            interactionPlantePlante: InteractionPlantePlanteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InteractionPlantePlantes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'interaction-plante-plante/new',
        component: InteractionPlantePlanteUpdateComponent,
        resolve: {
            interactionPlantePlante: InteractionPlantePlanteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InteractionPlantePlantes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'interaction-plante-plante/:id/edit',
        component: InteractionPlantePlanteUpdateComponent,
        resolve: {
            interactionPlantePlante: InteractionPlantePlanteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InteractionPlantePlantes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const interactionPlantePlantePopupRoute: Routes = [
    {
        path: 'interaction-plante-plante/:id/delete',
        component: InteractionPlantePlanteDeletePopupComponent,
        resolve: {
            interactionPlantePlante: InteractionPlantePlanteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InteractionPlantePlantes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

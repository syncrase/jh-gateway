import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInteractionPlantePlante } from 'app/shared/model/interaction-plante-plante.model';

type EntityResponseType = HttpResponse<IInteractionPlantePlante>;
type EntityArrayResponseType = HttpResponse<IInteractionPlantePlante[]>;

@Injectable({ providedIn: 'root' })
export class InteractionPlantePlanteService {
    public resourceUrl = SERVER_API_URL + 'api/interaction-plante-plantes';

    constructor(protected http: HttpClient) {}

    create(interactionPlantePlante: IInteractionPlantePlante): Observable<EntityResponseType> {
        return this.http.post<IInteractionPlantePlante>(this.resourceUrl, interactionPlantePlante, { observe: 'response' });
    }

    update(interactionPlantePlante: IInteractionPlantePlante): Observable<EntityResponseType> {
        return this.http.put<IInteractionPlantePlante>(this.resourceUrl, interactionPlantePlante, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IInteractionPlantePlante>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IInteractionPlantePlante[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

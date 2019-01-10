import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPlante } from 'app/shared/model/plante.model';

type EntityResponseType = HttpResponse<IPlante>;
type EntityArrayResponseType = HttpResponse<IPlante[]>;

@Injectable({ providedIn: 'root' })
export class PlanteService {
    public resourceUrl = SERVER_API_URL + 'api/plantes';

    constructor(protected http: HttpClient) {}

    create(plante: IPlante): Observable<EntityResponseType> {
        return this.http.post<IPlante>(this.resourceUrl, plante, { observe: 'response' });
    }

    update(plante: IPlante): Observable<EntityResponseType> {
        return this.http.put<IPlante>(this.resourceUrl, plante, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPlante>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPlante[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

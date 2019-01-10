import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrdre } from 'app/shared/model/ordre.model';

type EntityResponseType = HttpResponse<IOrdre>;
type EntityArrayResponseType = HttpResponse<IOrdre[]>;

@Injectable({ providedIn: 'root' })
export class OrdreService {
    public resourceUrl = SERVER_API_URL + 'api/ordres';

    constructor(protected http: HttpClient) {}

    create(ordre: IOrdre): Observable<EntityResponseType> {
        return this.http.post<IOrdre>(this.resourceUrl, ordre, { observe: 'response' });
    }

    update(ordre: IOrdre): Observable<EntityResponseType> {
        return this.http.put<IOrdre>(this.resourceUrl, ordre, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IOrdre>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrdre[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

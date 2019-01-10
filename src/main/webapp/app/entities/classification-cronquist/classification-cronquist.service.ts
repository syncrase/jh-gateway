import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IClassificationCronquist } from 'app/shared/model/classification-cronquist.model';

type EntityResponseType = HttpResponse<IClassificationCronquist>;
type EntityArrayResponseType = HttpResponse<IClassificationCronquist[]>;

@Injectable({ providedIn: 'root' })
export class ClassificationCronquistService {
    public resourceUrl = SERVER_API_URL + 'api/classification-cronquists';

    constructor(protected http: HttpClient) {}

    create(classificationCronquist: IClassificationCronquist): Observable<EntityResponseType> {
        return this.http.post<IClassificationCronquist>(this.resourceUrl, classificationCronquist, { observe: 'response' });
    }

    update(classificationCronquist: IClassificationCronquist): Observable<EntityResponseType> {
        return this.http.put<IClassificationCronquist>(this.resourceUrl, classificationCronquist, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IClassificationCronquist>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IClassificationCronquist[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

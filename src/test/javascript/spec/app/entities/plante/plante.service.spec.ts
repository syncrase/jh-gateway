/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { PlanteService } from 'app/entities/plante/plante.service';
import {
    IPlante,
    Plante,
    Mois,
    Strate,
    VitesseCroissance,
    Ensoleillement,
    RichesseSol,
    TypeTerre,
    TypeFeuillage,
    TypeRacine
} from 'app/shared/model/plante.model';

describe('Service Tests', () => {
    describe('Plante Service', () => {
        let injector: TestBed;
        let service: PlanteService;
        let httpMock: HttpTestingController;
        let elemDefault: IPlante;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(PlanteService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new Plante(
                0,
                Mois.JANVIER,
                Mois.JANVIER,
                Strate.HYPOGEE,
                VitesseCroissance.TRES_LENTE,
                Ensoleillement.SOLEIL,
                'AAAAAAA',
                'AAAAAAA',
                RichesseSol.TRES_PAUVRE,
                TypeTerre.ARGILEUSE,
                0,
                0,
                TypeFeuillage.PERSISTANT,
                TypeRacine.PIVOTANTE
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Plante', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new Plante(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Plante', async () => {
                const returnedFromService = Object.assign(
                    {
                        floraison: 'BBBBBB',
                        recolte: 'BBBBBB',
                        strate: 'BBBBBB',
                        croissance: 'BBBBBB',
                        ensoleillement: 'BBBBBB',
                        phMin: 'BBBBBB',
                        phMax: 'BBBBBB',
                        richesseSol: 'BBBBBB',
                        typeTerre: 'BBBBBB',
                        tempMin: 1,
                        tempMax: 1,
                        typeFeuillage: 'BBBBBB',
                        typeRacine: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Plante', async () => {
                const returnedFromService = Object.assign(
                    {
                        floraison: 'BBBBBB',
                        recolte: 'BBBBBB',
                        strate: 'BBBBBB',
                        croissance: 'BBBBBB',
                        ensoleillement: 'BBBBBB',
                        phMin: 'BBBBBB',
                        phMax: 'BBBBBB',
                        richesseSol: 'BBBBBB',
                        typeTerre: 'BBBBBB',
                        tempMin: 1,
                        tempMax: 1,
                        typeFeuillage: 'BBBBBB',
                        typeRacine: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Plante', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});

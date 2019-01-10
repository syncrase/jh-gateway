import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IClassificationCronquist } from 'app/shared/model/classification-cronquist.model';
import { ClassificationCronquistService } from './classification-cronquist.service';
import { IOrdre } from 'app/shared/model/ordre.model';
import { OrdreService } from 'app/entities/ordre';
import { IFamille } from 'app/shared/model/famille.model';
import { FamilleService } from 'app/entities/famille';
import { IGenre } from 'app/shared/model/genre.model';
import { GenreService } from 'app/entities/genre';
import { IEspece } from 'app/shared/model/espece.model';
import { EspeceService } from 'app/entities/espece';

@Component({
    selector: 'jhi-classification-cronquist-update',
    templateUrl: './classification-cronquist-update.component.html'
})
export class ClassificationCronquistUpdateComponent implements OnInit {
    classificationCronquist: IClassificationCronquist;
    isSaving: boolean;

    ordres: IOrdre[];

    familles: IFamille[];

    genres: IGenre[];

    especes: IEspece[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected classificationCronquistService: ClassificationCronquistService,
        protected ordreService: OrdreService,
        protected familleService: FamilleService,
        protected genreService: GenreService,
        protected especeService: EspeceService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ classificationCronquist }) => {
            this.classificationCronquist = classificationCronquist;
        });
        this.ordreService.query().subscribe(
            (res: HttpResponse<IOrdre[]>) => {
                this.ordres = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.familleService.query().subscribe(
            (res: HttpResponse<IFamille[]>) => {
                this.familles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.genreService.query().subscribe(
            (res: HttpResponse<IGenre[]>) => {
                this.genres = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.especeService.query().subscribe(
            (res: HttpResponse<IEspece[]>) => {
                this.especes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.classificationCronquist.id !== undefined) {
            this.subscribeToSaveResponse(this.classificationCronquistService.update(this.classificationCronquist));
        } else {
            this.subscribeToSaveResponse(this.classificationCronquistService.create(this.classificationCronquist));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IClassificationCronquist>>) {
        result.subscribe(
            (res: HttpResponse<IClassificationCronquist>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackOrdreById(index: number, item: IOrdre) {
        return item.id;
    }

    trackFamilleById(index: number, item: IFamille) {
        return item.id;
    }

    trackGenreById(index: number, item: IGenre) {
        return item.id;
    }

    trackEspeceById(index: number, item: IEspece) {
        return item.id;
    }
}

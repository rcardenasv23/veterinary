import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import {
  CreatePetInterface,
  ListPetItemInterface,
  UpdatePetInterface,
} from 'src/app/core/models/pets';
import { AnimalInterface } from 'src/app/core/models/animal';
import { BreedInterface } from 'src/app/core/models/breed';
import { SizeInterface } from 'src/app/core/models/size';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  HttpUploadOptions = {};

  constructor(private http: HttpClient) {
    this.HttpUploadOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        'Content-Type': 'application/json',
        responseType: 'text',
      }),
    };
  }

  ADDPET(pet: CreatePetInterface): Observable<any> {
    return this.http.post(
      `${environment.hostname}/pets`,
      pet,
      this.HttpUploadOptions
    );
  }

  GETPET(id: string): Observable<ListPetItemInterface> {
    return this.http
      .get<{ body: ListPetItemInterface[] }>(
        `${environment.hostname}/pets/${id}`,
        this.HttpUploadOptions
      )
      .pipe(map((response) => response.body[0]));
  }

  FILTERPETS(filter: { animal: string[]; breed: string[] }): Observable<any> {
    return this.http
      .post<{ body: any }>(
        `${environment.hostname}/pets/filter`,
        filter,
        this.HttpUploadOptions
      )
      .pipe(map((response) => response.body));
  }

  UPDATEPET(pet: UpdatePetInterface): Observable<UpdatePetInterface> {
    return this.http
      .put<{ body: UpdatePetInterface }>(
        `${environment.hostname}/pets`,
        pet,
        this.HttpUploadOptions
      )
      .pipe(map((response) => response.body));
  }

  LISTPETS(): Observable<ListPetItemInterface[]> {
    return this.http
      .get<{ body: ListPetItemInterface[] }>(
        `${environment.hostname}/pets`,
        this.HttpUploadOptions
      )
      .pipe(map((response) => response.body));
  }

  LISTANIMALS(): Observable<AnimalInterface[]> {
    return this.http
      .get<{ body: AnimalInterface[] }>(
        `${environment.hostname}/animals`,
        this.HttpUploadOptions
      )
      .pipe(map((response) => response.body));
  }

  LISTBREEDS(): Observable<BreedInterface[]> {
    return this.http
      .get<{ body: BreedInterface[] }>(
        `${environment.hostname}/breeds`,
        this.HttpUploadOptions
      )
      .pipe(map((response) => response.body));
  }
  LISTSIZES(): Observable<SizeInterface[]> {
    return this.http
      .get<{ body: BreedInterface[] }>(
        `${environment.hostname}/breeds/sizes`,
        this.HttpUploadOptions
      )
      .pipe(map((response) => response.body));
  }

  DELETEPET(id: string): Observable<any> {
    return this.http.delete(
      `${environment.hostname}/pets?id=${id}`,
      this.HttpUploadOptions
    );
  }
}

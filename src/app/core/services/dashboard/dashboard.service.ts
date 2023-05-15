import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
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
}

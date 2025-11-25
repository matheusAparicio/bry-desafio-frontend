import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyUserService {

  private api = `${environment.api}/user_company`;

  constructor(private http: HttpClient) {}

  attach(payload: { user_id: number; company_id: number }): Observable<any> {
    return this.http.post(this.api, payload);
  }

  detach(payload: { user_id: number; company_id: number }): Observable<any> {
    return this.http.request('DELETE', this.api, { body: payload });
  }
}

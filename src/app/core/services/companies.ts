import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company.model';
import { ApiResponse } from '../types/api-response';

@Injectable({ providedIn: 'root' })
export class CompaniesService {

  constructor(private http: HttpClient) {}

  list(): Observable<ApiResponse<Company[]>> {
    return this.http.get<ApiResponse<Company[]>>(`${environment.api}/companies`);
  }

  get(id: number): Observable<ApiResponse<Company>> {
    return this.http.get<ApiResponse<Company>>(`${environment.api}/companies/${id}`);
  }

  create(data: any): Observable<ApiResponse<Company>> {
    return this.http.post<ApiResponse<Company>>(`${environment.api}/companies`, data);
  }

  update(id: number, data: any): Observable<ApiResponse<Company>> {
    return this.http.put<ApiResponse<Company>>(`${environment.api}/companies/${id}`, data);
  }

  delete(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${environment.api}/companies/${id}`);
  }
}
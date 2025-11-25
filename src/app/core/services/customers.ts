import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../types/api-response';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  list(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${environment.api}/customers`);
  }

  get(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${environment.api}/user/`);
  }

  create(payload: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${environment.api}/customers`, payload);
  }

  update(id: number, payload: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${environment.api}/customers/${id}`, payload);
  }

  delete(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${environment.api}/customers/${id}`);
  }
}

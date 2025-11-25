import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../types/api-response';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private http: HttpClient) {}

  list(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${environment.api}/employees`);
  }

  get(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${environment.api}/user/`);
  }

  create(payload: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${environment.api}/employees`, payload);
  }

  update(id: number, payload: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${environment.api}/employees/${id}`, payload);
  }

  delete(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${environment.api}/employees/${id}`);
  }
}

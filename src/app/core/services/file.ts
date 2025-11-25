import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private api = `${environment.api}/file`;

  constructor(private http: HttpClient) {}

  upload(formData: FormData): Observable<any> {
    return this.http.post(this.api, formData);
  }

  get(fileId: number): Observable<Blob> {
    return this.http.get(`${this.api}?id=${fileId}`, { responseType: 'blob' });
  }

  delete(fileId: number): Observable<any> {
    return this.http.delete(`${this.api}?id=${fileId}`);
  }
}

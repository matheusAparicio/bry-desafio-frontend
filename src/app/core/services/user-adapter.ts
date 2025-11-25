import { Observable } from "rxjs";

export interface UserServiceAdapter {
  list(): Observable<any>
  get(id: number): Observable<any>; 
  create(payload: any): Observable<any>;
  update(id: number, payload: any): Observable<any>;
  delete(id: number): Observable<any>;
}

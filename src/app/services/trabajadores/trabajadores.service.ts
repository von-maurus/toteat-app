import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrabajadoresService {

  // URL_API = 'http://localhost:4000/api/ventas/';
  URL_API = 'http://185.253.154.69:4000/api/ventas/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(
    private http: HttpClient,
  ) { }

  getVentasByWaiter(inicio: any, fin: any, name: any): Observable<any> {
    let params = new HttpParams().set("inicio", inicio).set("fin", fin).set("name", name);
    return this.http.get(this.URL_API + "get-waiter-ventas", { headers: this.httpOptions.headers, params: params });
  }
  getVentasByCashier(inicio: any, fin: any, name: any): Observable<any> {
    let params = new HttpParams().set("inicio", inicio).set("fin", fin).set("name", name);
    return this.http.get(this.URL_API + "get-cashier-ventas", { headers: this.httpOptions.headers, params: params });
  }
  getRankedWaiters(inicio: any, fin: any): Observable<any> {
    let params = new HttpParams().set("inicio", inicio).set("fin", fin);
    return this.http.get(this.URL_API + "get-ranked-waiters", { headers: this.httpOptions.headers, params: params });
  }
}

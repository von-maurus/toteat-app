import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

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

  getVentasByDate(inicio: any, fin: any): Observable<any> {
    let params = new HttpParams().set("inicio", inicio).set("fin", fin);
    return this.http.get(this.URL_API + "get-ventas-by-date", { headers: this.httpOptions.headers, params: params });
  }
  getIngresoTotal(inicio: any, fin: any): Observable<any> {
    let params = new HttpParams().set("inicio", inicio).set("fin", fin);
    return this.http.get(this.URL_API + "get-ingreso-total", { headers: this.httpOptions.headers, params: params });
  }
  getProductosMasRentables(inicio: any, fin: any): Observable<any> {
    let params = new HttpParams().set("inicio", inicio).set("fin", fin);
    return this.http.get(this.URL_API + "get-prod-rentables", { headers: this.httpOptions.headers, params: params });
  }
  getCategMasRentables(inicio: any, fin: any): Observable<any> {
    let params = new HttpParams().set("inicio", inicio).set("fin", fin);
    return this.http.get(this.URL_API + "get-cat-rentables", { headers: this.httpOptions.headers, params: params });
  }
  getProdMasVendidos(inicio: any, fin: any): Observable<any> {
    let params = new HttpParams().set("inicio", inicio).set("fin", fin);
    return this.http.get(this.URL_API + "get-prod-mas-vendidos", { headers: this.httpOptions.headers, params: params });
  }
  getRankedMetodos(inicio: any, fin: any): Observable<any> {
    let params = new HttpParams().set("inicio", inicio).set("fin", fin);
    return this.http.get(this.URL_API + "get-ranked-metodos", { headers: this.httpOptions.headers, params: params });
  }
  getIngresosPerDay(inicio: any, fin: any): Observable<any> {
    let params = new HttpParams().set("inicio", inicio).set("fin", fin);
    return this.http.get(this.URL_API + "get-ingresos-per-day", { headers: this.httpOptions.headers, params: params });
  }
  getVentasByZone(inicio: any, fin: any): Observable<any> {
    let params = new HttpParams().set("inicio", inicio).set("fin", fin);
    return this.http.get(this.URL_API + "get-ventas-by-zone", { headers: this.httpOptions.headers, params: params });
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  URL_API = 'http://localhost:4000/api/ventas';
  constructor() { }
}

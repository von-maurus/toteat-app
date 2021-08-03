import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  urlBase = "http://localhost/toteat-api/";
  apiUrl = this.urlBase + "web/index.php?r="
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  private loadingText: string = "Cargando...";
  public isLoading: boolean = false;

  show(message: string = "Cargando..."){
    this.loadingText = message;
    this.isLoading = true;
  }

  hide(){
    this.isLoading = false;
  }
}

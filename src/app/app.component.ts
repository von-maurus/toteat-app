import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'toteat-app';
  isSidebarOpen: boolean = true;

  sideBarToggler() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}


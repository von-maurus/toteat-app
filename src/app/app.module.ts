import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModalModule, NgbButtonsModule, NgbDropdownModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigService } from './config/config.service';
import { ExcelService } from './services/excel/excel.service';
import { SideNavComponent } from './utils/side-nav/side-nav.component';
import { AlertService } from './utils/alerts/alert.service';
import { LoadingService } from './utils/loading/loading.service';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    // MatSidenavModule,
    // MatToolbarModule
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModalModule,
    NgbButtonsModule,
    NgbDropdownModule,
    NgbAlertModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule
  ],
  providers: [
    LoadingService,
    AlertService,
    ExcelService,
    ConfigService,
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

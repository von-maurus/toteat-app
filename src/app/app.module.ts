import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModalModule, NgbButtonsModule, NgbDropdownModule, NgbAlertModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigService } from './config/config.service';
import { ExcelService } from './services/excel/excel.service';
import { SideNavComponent } from './utils/side-nav/side-nav.component';
import { AlertService } from './utils/alerts/alert.service';
import { LoadingService } from './utils/loading/loading.service';
import { HeaderComponent } from './utils/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { AlertsComponent } from './utils/alerts/alerts.component';
import { LoadingScreenComponent } from './utils/loading-screen/loading-screen.component';
import { KuvTableComponent, KuvTableModule, KuvTableService } from 'kuv-table';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HeaderComponent,
    AlertsComponent,
    LoadingScreenComponent,

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
    NgbPopoverModule,
    HttpClientModule,
    // Material Imports
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    KuvTableModule
  ],
  providers: [
    LoadingService,
    AlertService,
    ExcelService,
    ConfigService, KuvTableService
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

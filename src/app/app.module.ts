import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModalModule, NgbButtonsModule, NgbDropdownModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingService } from './services/loading/loading.service';
import { ConfigService } from './config/config.service';
import { AlertService } from './services/alert/alert.service';
import { ExcelService } from './services/excel/excel.service';

@NgModule({
  declarations: [
    AppComponent,
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
    HttpClientModule
  ],
  providers: [
    LoadingService,
    AlertService,
    ExcelService,
    ConfigService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

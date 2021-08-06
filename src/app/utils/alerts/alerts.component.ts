import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/utils/alerts/alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  constructor(
    public service: AlertService
  ) { }

  ngOnInit() {
  }

  close(alertIndex: number) {
    this.service.removeAlert(alertIndex);
  }
}

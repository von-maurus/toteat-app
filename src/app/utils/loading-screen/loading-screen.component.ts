import { Component, OnInit } from '@angular/core';
// import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { LoadingService } from 'src/app/utils/loading/loading.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit {

  constructor(
    public service: LoadingService
  ) { }

  // faCircleNotch = faCircleNotch;

  ngOnInit() {
  }

}

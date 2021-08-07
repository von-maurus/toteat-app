import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  isToggled: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.isToggled = !this.isToggled;
    this.toggleSidebarForMe.emit();
  }
}

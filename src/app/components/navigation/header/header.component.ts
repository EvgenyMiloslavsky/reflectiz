import {Component, OnInit} from '@angular/core';
import {EventEmitter, Output} from '@angular/core/';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();

  view = true;

  constructor(
    private router: Router,
    private auth: AuthService) {
  }

  ngOnInit() {
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  login() {
    this.view = !this.view;
    this.router.navigateByUrl('/login')
  }

  logOut() {
    this.view = !this.view;
    this.auth.logOut();
    this.router.navigateByUrl('/')

  }
}

import { Component, OnInit } from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "./_alert";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'banking-app';

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(protected alerts: AlertService) { }

}

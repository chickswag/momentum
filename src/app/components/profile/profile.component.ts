import { Component, OnInit } from '@angular/core';
import {AlertService} from "../../_alert";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData : any
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  constructor(private alerts : AlertService) {

  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.alerts.success("Successfully logged in",this.options)
  }
}

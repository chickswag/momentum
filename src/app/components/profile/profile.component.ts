import { Component, OnInit } from '@angular/core';
import {AlertService} from "../../_alert";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {FormBuilder} from "@angular/forms";

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
  constructor(private router: Router, private auth: AuthService, private formBuilder: FormBuilder,private alerts: AlertService) {
    if(!this.auth.isAuthenticated()) {
      this.router.navigate(['/login'])
    }
  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.alerts.success("Successfully logged in",this.options)
  }
}

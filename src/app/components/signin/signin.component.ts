import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../auth/auth.service";
import {AlertService} from "../../_alert";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{

  loginForm : FormGroup | any;
  loading = false;
  submitted = false;
  returnUrl: any ;
  error: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private alerts : AlertService
  ){}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.auth.login(this.f.username.value, this.f.password.value)
      .subscribe(
        data => {
          if(data){
            this.router.navigate(['/profile']);
          }
          else{
            this.alerts.error("Incorrect login details, please try again");
            this.loading = false;
          }
        },
        error => {
          this.alerts.error(error);
          this.loading = false;
        });
  }
}

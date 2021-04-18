import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {AlertService} from "../../_alert";
import {max, min} from "rxjs/operators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup | any;
  loading = false;
  submitted = false;
  returnUrl: any ;
  error: any;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private alerts: AlertService
  ){}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      fullnames: ['', Validators.required],
      account_type: ['', Validators.required],
      age: ['', Validators.required]
    });

  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.alerts.error("Check your inputs",this.options)
      return;
    }

    this.loading = true;
    this.auth.register(this.registerForm.value)
      .subscribe(
      data => {
        if(data){

          var userObj ={"username":data.username,
                        "password": data.password,
                        "name": data.fullnames,
                        "age": data.age,
                        "accounts": [
                             {
                              "accountNumber": 17758,
                              "balance": 0,
                              "overdraft": 0,
                              "type": data.account_type
                            }
                        ]
          }
          localStorage.setItem('currentUser', JSON.stringify(userObj));
          this.router.navigate(['/profile']);
        }
        else{
          this.alerts.error("User already exists, please login or check your details");
          this.loading = false;
        }
      },
      error => {
        this.alerts.error(error);
        this.loading = false;
      });
   }
}

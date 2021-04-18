import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {AlertService} from "../../_alert";

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit{

  name : any
  amount : any
  userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
  depositForm : FormGroup | any
  error : any
  submitted = false
  selectedAccount = JSON.parse(localStorage.getItem('account_number') || '{}')
  switch:any
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(private router: Router,
              private auth: AuthService,
              private formBuilder: FormBuilder,
              private alerts : AlertService
  )
  {}

  ngOnInit() {
    this.depositForm = this.formBuilder.group({
      amount: ['', Validators.required]
    });
  }

  get f() { return this.depositForm.controls; }

  performDeposit(){
    this.submitted = true;
    if (this.depositForm.invalid) {
      this.alerts.error("Enter deposit amount",this.options)
      return;
    }

    const account = this.userData.accounts;
    for(var i = 0; i < account.length; i++){
      if(account[i].accountNumber == this.selectedAccount)
      {
        account[i].balance += this.f.amount.value
      }
    }
    localStorage.setItem('currentUser', JSON.stringify(this.userData));
    this.alerts.success("Successfully made a deposit",this.options)
    this.depositForm.reset();
  }
  switchBetweenAccounts(account_number : any){
    localStorage.removeItem('account_number');
    this.selectedAccount = account_number
    localStorage.setItem('account_number',account_number)
  }
}

import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {AlertService} from "../../_alert";

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  name : any
  amount : any
  userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
  withdrawForm : FormGroup | any
  error : any
  submitted = false
  selectedAccount = JSON.parse(localStorage.getItem('account_number') || '{}')
  switch:any
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  constructor(private router: Router, private auth: AuthService, private formBuilder: FormBuilder,private alerts: AlertService)
  {

  }

  ngOnInit() {
    this.withdrawForm = this.formBuilder.group({
      amount: ['', Validators.required]
    });
  }

  get f() { return this.withdrawForm.controls; }

  performWithdrawal(){
    this.submitted = true;
    if (this.withdrawForm.invalid) {
      this.alerts.error("Enter withdrawal amount",this.options)
      return;
    }

    const account = this.userData.accounts;
    for(var i = 0; i < account.length; i++){
      if(account[i].accountNumber == this.selectedAccount)
      {
        //check balance before withdraw
        if(this.f.amount.value > account[i].balance ){
          this.alerts.warn("Amount must not exceed your current balance",this.options)
        }
        else{
          account[i].balance -= this.f.amount.value
        }
      }
    }
    localStorage.setItem('currentUser', JSON.stringify(this.userData));
    this.alerts.success("Successfully made a withdrawal",this.options)
    this.withdrawForm.reset();
  }
  switchBetweenAccounts(account_number : any){
    localStorage.removeItem('account_number');
    this.selectedAccount = account_number
    localStorage.setItem('account_number',account_number)
  }
}

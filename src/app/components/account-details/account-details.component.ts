import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
  constructor(private router: Router, private auth: AuthService) { }
  ngOnInit(): void {
    this.removeAccountKey()
  }

  deposit(account_number:any) {
    this.removeAccountKey()
    localStorage.setItem('account_number',account_number)
    this.router.navigate(['/deposit'])
  }
  withdraw(account_number:any) {
    this.removeAccountKey()
    localStorage.setItem('account_number',account_number)
    this.router.navigate(['/withdraw']);
  }
  removeAccountKey(){
    if(localStorage.getItem('account_number') != null ){
      localStorage.removeItem('account_number');
    }
  }

}

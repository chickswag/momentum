import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent implements OnInit {

  userData : any
  ngOnInit(): void {

    this.userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

}

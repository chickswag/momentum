import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private data_url = "assets/customer-data.json";
  userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')  || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }
  login(username: string, password: string) {
    return this.http.get(this.data_url)
      .pipe(
        map(response => {
          for(const [key, value] of Object.entries(response)) {
            if (value.username == username && value.password == password) {
              localStorage.setItem('currentUser', JSON.stringify(value));
              this.currentUserSubject.next(value);
              return value
            }
          }
        })
      )
  }

  register(userdata: any) {
    return this.http.get(this.data_url)
      .pipe(
        map(response => {
          for(const [key, value] of Object.entries(response)) {
            if (value.username == userdata.username && value.password == userdata.password) {
                //user exists
                return false
            }
            else{
              this.currentUserSubject.next(value);
              return userdata
            }
          }
        })
      )
  }
  isAuthenticated() {
    const logged = localStorage.getItem('currentUser');
    return !!logged;

  }
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('account_number');
  }
}

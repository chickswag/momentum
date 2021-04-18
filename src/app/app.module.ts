import { NgModule} from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SigninComponent } from './components/signin/signin.component';
import {AngularMaterialModule} from "./angular-material.module";
import {HttpClientModule} from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "./auth/auth.guard";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import { AccountProfileComponent } from './components/account-profile/account-profile.component';
import { RegisterComponent } from './components/register/register.component';
import {AlertModule} from "./_alert";

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    ProfileComponent,
    WithdrawComponent,
    DepositComponent,
    LogoutComponent,
    AccountDetailsComponent,
    AccountProfileComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    AlertModule
  ],
  providers: [DatePipe,AuthGuard,MatSelectModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

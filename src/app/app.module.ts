import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./modules/material.module";
import {AlertsComponent} from "./components/alerts/alerts.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './components/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import {SidenavListComponent} from "./components/navigation/sidenav-list/sidenav-list.component";
import {HeaderComponent} from "./components/navigation/header/header.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {HomeComponent} from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertsComponent,
    LoginComponent,
    SidenavListComponent,
    HeaderComponent,
    HomeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FlexLayoutModule
    ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [AppComponent]
})
export class AppModule {
}

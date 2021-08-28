import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AlertsComponent} from "./components/alerts/alerts.component";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuardService} from "./services/auth-guard.service";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'alerts', component: AlertsComponent, canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  error: any;
  form!: FormGroup;
  loginSubs: any;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(
        'test',
        Validators.compose([
          Validators.minLength(2),
          Validators.required
        ])
      ),
      password: new FormControl(
        'test',
        Validators.compose([
          Validators.minLength(2),
          Validators.required
        ])
      ),
    });

  }

  submit(): void {
    if (this.form.valid) {
      this.loginSubs = this.auth.login("test", "test").subscribe(re => {
          if (re.status == 'success') {
            this.auth.onLogged();
            this.router.navigateByUrl('/alerts')
              .then();
          }
        }
      )
    }
  }

  ngOnDestroy() {
    this.loginSubs.unsubscribe;
  }
}

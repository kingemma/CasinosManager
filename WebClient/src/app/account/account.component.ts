import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenAuthService, AuthenticateModel, AuthenticateResult, UserInfo } from '../shared/service-proxy/token-auth.service'
import { AppSessionService } from '../shared/auth/app-session.service'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  authenticateModel: AuthenticateModel = new AuthenticateModel();

  constructor(
    private _tokenAuthService: TokenAuthService,
    private _sessionService: AppSessionService,
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  authenticate(): void {

    this._tokenAuthService
      .authenticate(this.authenticateModel)
      .subscribe((result: AuthenticateResult) => {
        if (result) {
          this.setCookie("auth_token", result.access_token, result.expires_in);
          this._sessionService.init().then(() => {
            this._router.navigate(['content'])
          })
        }
      });
  }

  setCookie(name, value, expires): void {
    var exp = new Date();
    exp.setTime(exp.getTime() + expires * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toDateString();
  }
}

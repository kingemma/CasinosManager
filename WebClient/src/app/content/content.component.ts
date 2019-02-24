import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSessionService } from '../shared/auth/app-session.service'
import { TokenAuthService, UserInfo } from '../shared/service-proxy/token-auth.service'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  userinfo: UserInfo;
  isSmallMenuShow: boolean = false;

  constructor(
    private _sessionService: AppSessionService,
    private _tokenAuthService: TokenAuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.userinfo = this._sessionService.user;
  }

  smallMenuShow():void {
    this.isSmallMenuShow = !this.isSmallMenuShow;
  }

  logout() {
    this._tokenAuthService.logout()
      .subscribe((result) => {
        this._router.navigate(['account'])
        document.cookie = "auth_token=" + escape('') + ";expires=-1";
      })
  }

}

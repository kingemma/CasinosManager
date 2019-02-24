import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenAuthService, UserInfo } from '../service-proxy/token-auth.service'

@Injectable({
  providedIn: 'root',
})
export class AppSessionService {

  private _user: UserInfo;

  constructor(private _service: TokenAuthService,
    private _router: Router,) {
      console.log("TokenAuthService constructor");
      if(this._service.getCookie("auth_token")){
        this._service.authenticateUser().subscribe(result=>{
          this._user = result;
        });
      }
  }

  get user(): UserInfo {
    console.log("_user:" + this._user);

    return this._user;
  }

  init(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      console.log("TokenAuthService init");
      if(this._service.getCookie("auth_token")){
        this._service.authenticateUser().toPromise().then((result: UserInfo) => {
          this._user = result;    
          console.log(this._router.url);    
          resolve(true);
        }, (err) => {
            reject(err);
        });
      }
        
    });
}
}

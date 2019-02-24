import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponseBase, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenAuthService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.http = http;
    this.baseUrl = "http://localhost:53002";
  }

  authenticate(authenticateModel: AuthenticateModel): Observable<AuthenticateResult> {
    let url = "http://localhost:54225/api/identity";

    return this.http.post<AuthenticateResult>(url, authenticateModel).pipe(
      tap(item => console.log("authenticate user")),
      catchError(this.handleError<AuthenticateResult>("authenticate user"))
    );
  }

  authenticateUser(): Observable<UserInfo> {
    let url = "http://localhost:54225/api/identity";

    let options_ = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + this.getCookie("auth_token")
      })
    };

    return this.http.get<UserInfo>(url, options_).pipe(
      tap(item => console.log("authenticate user")),
      catchError(this.handleError<UserInfo>("authenticate user"))
    );
  }

  logout(): Observable<boolean> {
    let url = "http://localhost:54225/api/identity";
    let options_ = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + this.getCookie("auth_token")
      })
    };

    return this.http.delete<boolean>(url, options_).pipe(
      tap(item => console.log("authenticate logout")),
      catchError(this.handleError<boolean>("authenticate logout"))
    );
  }

  public getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
    if (arr = document.cookie.match(reg)) {
      return unescape(arr[2]);
    }
    else {
      return null;
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

export class AuthenticateModel {
  username: string;
  password: string;
  client_id: string;
  client_secret: string;
  grant_type: string;
  scope: string;

  constructor() {
    this.client_id = "angular.client";
    this.client_secret = "secret";
    this.grant_type = "password";
    this.scope = "CasinosApi";
  }
}

export class AuthenticateResult {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export class UserInfo {
  userId: string;
  userName: string;
  name: string;

}

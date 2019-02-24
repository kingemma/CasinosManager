import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponseBase, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.http = http;
    this.baseUrl = "http://localhost:54225";
  }

  //dashboard 示例api
  getDashboard(): Observable<DashboardDto> {
    let url = this.baseUrl + "/api/dashboard";

    let options_ = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + this.getCookie("auth_token")
      })
    };

    return this.http.get<DashboardDto>(url, options_).pipe(
      tap(item => console.log("get Dashboard")),
      catchError(this.handleError<DashboardDto>("get Dashboard"))
    );
  }

  //echart 示例api
  getEchartData(): Observable<ConsumeDto[]> {
    let url = this.baseUrl + "/api/dashboard/echart";

    let options_ = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + this.getCookie("auth_token")
      })
    };

    return this.http.get<ConsumeDto[]>(url, options_).pipe(
      tap(item => console.log("get echart data")),
      catchError(this.handleError<ConsumeDto[]>("get echart data"))
    );
  }

  //条件分页查询 api
  getPagedList(queryInput: StudentQueryInput): Observable<PagedStudentsOutput> {
    let url = this.baseUrl + "/api/student/query";

    let options_ = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + this.getCookie("auth_token")
      })
    };

    return this.http.post<PagedStudentsOutput>(url, queryInput, options_).pipe(
      tap(item => console.log("get paged students")),
      catchError(this.handleError<PagedStudentsOutput>("get students"))
    );
  }

  //添加对象api
  addStudent(student: Student): Observable<OperateResult> {
    let url = this.baseUrl + "/api/student/save";

    let options_ = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + this.getCookie("auth_token")
      })
    };

    return this.http.post<OperateResult>(url, student, options_).pipe(
      tap(item => console.log("save student")),
      catchError(this.handleError<OperateResult>("save student"))
    );
  }

  private getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
    if (arr = document.cookie.match(reg)) {
      return unescape(arr[2]);
    }
    else {
      return null;
    }
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

export class PagedStudentsOutput {
  total: number;
  data: Student[];
}

export class StudentQueryInput {
  page: number;
  pageSize: number;
  name: string;
  createFrom: Date;
  createTo: Date;
}

export class Student {
  id: number;
  name: string;
  age: number;
  sex: string;
  createTimeStr: string;

  constructor() {
    this.sex = "男";
  }
}

export class OperateResult{
  success:boolean;
  message:string;
}

export class PagedInput {
  page: number;
  pageSize: number;
  total: number;

  constructor() {
    this.page = 1;
    this.pageSize = 10;
    this.total = 0;
  }
}

export class DashboardDto {
  a: number;
  b: number;
  c: number;
  d: number;
}

export class ConsumeDto {
  date: string;
  amount: number;
}

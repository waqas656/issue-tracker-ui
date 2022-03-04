import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, Subscription, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  url = 'http://localhost:8080/hi';
  authToken: String | any= "";
  hardcoded_token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3YXFhc2FobWVkIiwiZXhwIjoxNjQ1NzQ1MDk3LCJpYXQiOjE2NDU3NDE0OTd9.DKI-WSgSPMfwqIxgfUB_JMfc5vz-NmVH_Jn5H12tya5WZS_XEb81UHn-R7ZA0jJxN91ijuV92TpCD7CMmooyYQ";

  constructor(private http: HttpClient) { }

  loginUser(username: String = "waqas", password: String = "waqas") : String {

    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${this.hardcoded_token}`,
    //   'Access-Control-Allow-Origin': '**'
    // })
     this.http.get<String>(this.url, { headers: {'Authorization': `Bearer ${this.hardcoded_token}`} } )
     .pipe(catchError(err => {
      console.log(err);
      return throwError(err);
    }))    
      .subscribe(token => {
        this.authToken = token;
        console.log("TOKEN: " + this.authToken.hi);
      });

      return this.authToken;
  }

}

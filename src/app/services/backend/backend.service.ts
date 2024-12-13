import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  authenticated = false;
  credentialHeader: { Authorization: string; } | undefined;
  constructor(private httpclient: HttpClient) { }

  authenticate(credentials?: { username: string; password: string; }, callback?: () => any) {
    let headers;
    if (credentials) {
      this.credentialHeader = {"Authorization": "Basic " + btoa(credentials.username + ":" + credentials.password)}
      headers = new HttpHeaders().set("Authorization", "Basic " + btoa(credentials.username + ":" + credentials.password));
    } else {
      this.credentialHeader = undefined;
      headers = new HttpHeaders();
    }

    this.httpclient.get('user', {headers}).subscribe((response: any) => {
      if (response["name"]) {
        this.authenticated = true;
      }  else {
        this.authenticated = false;
      }

      return callback && callback();
    })
  }
  
  getAuthenticationStatus() {
    return this.authenticated;
  }

  getResources(callback: (id: any, content: any) => void) {
    this.httpclient.get("/resources").subscribe((response: any) => {
      if (response && response.id && response.content) {
        callback(response.id, response.content)
      }
    });
  }

  logout(callback: ()=>void) {
    return this.httpclient.post('logout', {}).pipe(finalize(() => {
        this.authenticated = false;  
        callback();
      }))
    .subscribe();
  }
}

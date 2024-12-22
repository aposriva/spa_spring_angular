import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  _authenticated = new BehaviorSubject(false);
  authenticated: Observable<boolean>;
  resource_call = false;
  credentialHeader: { Authorization: string } | undefined;

  constructor(private readonly httpclient: HttpClient) {
    this.authenticated = this._authenticated.asObservable();
  }

  authenticate = (credentials?: { username: string; password: string }) => {
    let headers;
    if (credentials) {
      this.credentialHeader = {
        Authorization:
          'Basic ' + btoa(credentials.username + ':' + credentials.password),
      };
      headers = new HttpHeaders().set(
        'Authorization',
        this.credentialHeader['Authorization']
      );
    } else {
      this.credentialHeader = undefined;
      headers = new HttpHeaders();
    }

    this.httpclient.get('user', { headers }).subscribe({
      next: (response: any) => {
        if (response['name']) {
          this._authenticated.next(true);
        }
      },
    });
  };

  getResources = (callback: (id: any, content: any) => void) => {
    this.httpclient
      .get('/token')
      .pipe(
        finalize(() => {
          this.resource_call = false;
        })
      )
      .subscribe((data: any) => {
        const token = data['token'];
        this.resource_call = true;
        this.httpclient
          .get('http://localhost:9000/', {
            headers: new HttpHeaders().set('X-Auth-Token', token),
          })
          .subscribe((response: any) => {
            if (response?.id && response?.content) {
              console.log(response);
              callback(response.id, response.content);
            }
          });
      });
  };

  logout = (callback: () => void) => {
    return this.httpclient
      .post('logout', {})
      .pipe(
        finalize(() => {
          this._authenticated.next(false);
          callback();
        })
      )
      .subscribe();
  };
}

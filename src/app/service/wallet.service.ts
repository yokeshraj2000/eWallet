import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiEndpoint } from '../common/endpoint';


@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) { }

  getUserDetails(userId: number) {
    return this.http.get(environment.apiUrl + ApiEndpoint.USER.GET_USER_BY_ID.replace("{userId}", userId.toString()))
  }

  getPeerUsers() {
    return this.http.get(environment.apiUrl + ApiEndpoint.USER.GET_ALL_USERS)
  }
}

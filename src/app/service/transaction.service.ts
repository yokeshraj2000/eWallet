import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiEndpoint } from '../common/endpoint';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  createTransaction(transaction: any) {
    return this.http.post(environment.apiUrl+ApiEndpoint.TRANSACTIONS.CREATE_TRANSACTION, transaction);
  }

  getTransactionHistory(userId: number){
    return this.http.get(environment.apiUrl+ApiEndpoint.TRANSACTIONS.GET_TRANSACTION_BY_USERID.replace("{userId}", userId.toString()));
  }
}

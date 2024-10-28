import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataTable } from 'simple-datatables';
import { TransactionService } from 'src/app/service/transaction.service';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: any;
  searchText: string = '';

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getTransactionHistory();
  }

  getTransactionHistory() {
    this.transactionService.getTransactionHistory(2).subscribe((data: any) => {
      this.transactions = data;

      const dataTable = new DataTable("#walletHistoryTable", {
        data: {
          headings: [
            'S No',
            'Recipient',
            'Amount',
            'Date',
            'Status'
          ],
          data: this.transactions.map((item: any, index: number) => {
            const status = item.fromUserId === 1 ? 'Debit' : 'Credit';
            return [
              (index + 1).toString(),
              item.toUserName,
              '₹'+item.amount,
              moment(item.createdAt).format('MMM DD, YYYY HH:mm'),
              status
            ];
          })
        }
      });
    })
  }
}

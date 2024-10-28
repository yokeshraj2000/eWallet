import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { TransactionService } from 'src/app/service/transaction.service';
import { WalletService } from 'src/app/service/wallet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  user: any;
  peerUsers: any[] = [];
  transactionAmount: number = 0;
  selectedPeerId: number = 0;
  currentDateTime: string = moment().format('MMM DD, YYYY HH:mm');
  currentUserId: any;
  currentUserName:any;
  
  constructor(private walletService: WalletService, private transactionService: TransactionService, private router: Router) { }

  ngOnInit(){
    this.getUserDetails();
    this.getAllPeers();
  }

  getAllPeers(){
    this.walletService.getPeerUsers().subscribe((data:any) => {
      this.peerUsers = data.filter((user:any) => user.userId !== this.currentUserId);
      console.log("peerUsers", this.peerUsers);
    })
  }

  getUserDetails() {
    this.walletService.getUserDetails(2).subscribe((data:any) =>{
      this.user = data;
      this.currentUserId = this.user.userId;
      this.currentUserName = this.user.username;
      console.log("User details", this.user);
      
    })
  }

  sendMoney(): void {
    const transaction = {
      fromUserId: this.user.userId,
      toUserId: this.selectedPeerId,
      amount: this.transactionAmount
    };
    this.transactionService.createTransaction(transaction).subscribe(response => {
      Swal.fire({
        title: "Money send",
        text: "Your money send successfully.",
        icon: "success"
      }).then(() => {
        window.location.reload();
      })
      this.user.walletBalance -= this.transactionAmount;
    });
  }
  goToTransaction() {
    this.router.navigate(['/transactions']);
  }
  
}
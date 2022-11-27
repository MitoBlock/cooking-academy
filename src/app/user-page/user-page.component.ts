import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Token } from '../models/types';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {

  user: User = new User('Bob', 'loading...');

  // show single token in view if valid
  currentToken: Token | null = null;
  membershipClaimed = false;
  showTimer = false;
  counter = 5;
  score = '0';
  userRewarded = false; // used to toggle button content
  tokenList: Token[] = []; // list of tokens for user

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleOffersClick() {
    this.router.navigate(['/user', 'offers']);
  }

  // present user with 5% discount 5 seconds after button click
  handleMakeTacos() {
    var expDate = new Date();
    expDate.setMonth(expDate.getMonth() + 1);
    let expDateStr = this.fixDate(expDate.toString()); 
    let currDateStr = this.fixDate(new Date().toString());

    this.showTimer = true;
    let timer = setInterval(() => {
      if (this.counter <= 0) {
        clearInterval(timer);
        this.showTimer = false;
        // send token details to server
        this.userService
          .addDiscountToken({
            timestamp: currDateStr,
            activity_name: 'Learn to make tacos',
            score: '10',
            message: 'Excelente',
            discount_value: '5',
            eligible_companies: 'Cooking Academy',
            item_type: 'protein burrito cooking class',
            expiry_date: expDateStr
          })
          .subscribe(() => {
            console.log('setting reward claimed to true');
            this.userRewarded = true;
            this.refreshTokenList();
          });
      }
      this.counter--;
    }, 1000);
  }

  fixDate(date: string) {
    var dateArr = date.split(" ");
    let formattedDate = `${dateArr[1]} ${dateArr[2]} ${dateArr[3]}`
    return formattedDate
  }
  getCurrDate() {
    let currDate = new Date();
    return this.fixDate(currDate.toString());
  }
  getExpDate() {
    let expDate = new Date();
    expDate.setMonth(expDate.getMonth() + 1);
    return this.fixDate(expDate.toString()); 
  }

  // create and get token for gym membership
  getGymMembership() {
    // send token details to server
    this.userService
      .addMembershipToken({
        timestamp: this.getCurrDate(),
        activity_name: 'Weekly leaderboard',
        score: '10',
        message: 'Impresionante',
        membership_duration: '3',
        eligible_companies: 'Building Block Fitness',
        expiry_date: this.getExpDate()
      })
      .subscribe((data) => {
        console.log({ data });
      });
    this.membershipClaimed = true;
    console.log('get gym membership clicked');
  }

  // handle discount for 5% off. Marks token status as invalid. Using hardcoded token id for now
  handleUseDiscount() {
    console.log('handle use discount');
    this.userService
      .removeDiscountTokenStatus({ token_id: 0, id: 0, timestamp: this.getCurrDate(), status: "Invalid" })
      .subscribe((_) => {
        console.log('discount token invalidated');
        Swal.fire("Discount applied!","5% off the cooking class","success");
        this.userRewarded = false;
        this.refreshTokenList();
      });
  }

  ngOnInit() {
    this.refreshTokenList();
    this.userService.getUserAddress().subscribe((address) => {
      this.user.address = address;
    }) 
  }

  refreshTokenList() {
    this.userService.getDiscountTokens().subscribe((data) => {
      if (data.DiscountToken.length !== 0) {
        this.currentToken = data.DiscountToken[0]; // focus only on first token
        console.log({ currentToken: this.currentToken });
        this.userService.getDiscountTokenStatus().subscribe((statusData) => {
          if (
            statusData.DiscountTokenStatus &&
            statusData.DiscountTokenStatus[0].status == 'Valid'
          ) {
            console.log('status valid');
            this.tokenList = data.DiscountToken; // only display tokens that are valid
            this.userRewarded = true;
          } else this.tokenList = []; // if token is invalid, don't display it
        });
      }
    });
  }
}

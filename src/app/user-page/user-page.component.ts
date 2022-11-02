import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Token } from '../models/types';
import { User } from '../models/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  // create harcoded user
  user: User = new User('Bob', 'xxxx');

  // show single token in view if valid
  currentToken: Token | null = null;
  membershipClaimed = false;
  showTimer = false;
  counter = 5;
  score = 0;
  userRewarded = false; // used to toggle button content
  tokenList: Token[] = []; // list of tokens for user

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  onKeyChangeScore(event: KeyboardEvent) {
    this.score = +(event.target as HTMLInputElement).value;
  }

  handleOffersClick() {
    this.router.navigate(['/user', 'offers']);
  }

  // present user with 5% discount 5 seconds after button click
  handleMakeTacos() {
    // set expiry date to a month from now
    var expDate = new Date();
    expDate.setMonth(expDate.getMonth() + 1);

    this.showTimer = true;
    let timer = setInterval(() => {
      if (this.counter <= 0) {
        clearInterval(timer);
        this.showTimer = false;
        // send token details to server
        this.userService
          .addDiscountToken({
            Timestamp: new Date().toISOString().slice(0, 15),
            ActivityName: 'Learn to make tacos',
            Score: 10,
            Message: 'Excelente',
            DiscountValue: 5,
            EligibleCompanies: 'Cooking Academy',
            ItemType: 'protein burrito cooking class',
            ExpiryDate: expDate.toISOString().slice(0, 15),
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

  // create and get token for gym membership
  getGymMembership() {
    // set expiry date to a month from now
    var expDate = new Date();
    expDate.setMonth(expDate.getMonth() + 1);

    // send token details to server
    this.userService
      .addMembershipToken({
        Timestamp: new Date().toISOString().slice(0, 15),
        ActivityName: 'Weekly leaderboard',
        Score: 10,
        Message: 'Impresionante',
        MembershipDuration: '3',
        EligibleCompanies: 'Building Block Fitness', // membership applicable to this company
        ExpiryDate: expDate.toISOString().slice(0, 15),
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
      .removeDiscountTokenStatus({ DiscountTokenStatusID: 0, TokenID: 0 })
      .subscribe((_) => {
        console.log('discount token invalidated');
        this.userRewarded = false;
        this.refreshTokenList();
      });
  }

  ngOnInit() {
    this.refreshTokenList();
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

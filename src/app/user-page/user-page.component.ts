import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RewardToken, Token } from '../models/reward-token';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { Balance } from '../models/balance';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {

  // create harcoded user
  balance: Balance = { denom: 'mitocell', amount: '0' };
  user: User = new User(
    'Bob',
    'mito1ssl9xlelyk0u93w5x50snxwslcspfq4pdurj34',
    this.balance,
  );

  // show single token in view if valid
  currentToken : Token | null = null
  membershipClaimed = false
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
    this.showTimer = true;
    let timer = setInterval(() => {
      if (this.counter <= 0) {
        clearInterval(timer);
        this.showTimer = false;
        this.userService.addDiscountToken().subscribe(() => {
          console.log('setting reward claimed to true');
          this.userRewarded = true;
          this.refreshTokenList()
        });
      }
      this.counter--;
    }, 1000);
  }

  // get token for gym membership
  getGymMembership() {
    this.userService.addMembershipToken().subscribe((data) => {
      console.log({ data });
    });
    this.membershipClaimed = true
    console.log('get gym membership clicked');
  }

  // handle discount for 5% off. Mark token status as invalid
  handleUseDiscount() {
    console.log('handle use discount');
    this.userService.removeDiscountTokenStatus().subscribe((data) => {
      console.log('discount token invalidated');
      this.userRewarded = false;
      this.refreshTokenList()
    });
  }

  ngOnInit() {
    this.refreshTokenList();
  }

  refreshTokenList() {
    this.userService.getDiscountTokens().subscribe((data) => {
      if (data.DiscountToken.length !== 0) {
        this.currentToken = data.DiscountToken[0] // focus only on first token
        console.log({ currentToken : this.currentToken })
        this.userService.getDiscountTokenStatus().subscribe((statusData) => {
          if (
            statusData.DiscountTokenStatus &&
            statusData.DiscountTokenStatus[0].status == 'Valid'
          ) {
            console.log('status valid');
            this.tokenList = data.DiscountToken; // only display tokens that are valid
            this.userRewarded = true;
          } else this.tokenList = [] // if token is invalid, don't display it
        });
      }
    });
  }
}

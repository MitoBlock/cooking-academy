import { Component, OnInit } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RewardToken, Token } from '../models/reward-token';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { Balance } from '../models/balance';
import { BalanceWrapper } from '../models/balance-dto';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  balance: Balance = { denom: 'mitocell', amount: '0' };
  user: User = new User(
    'Bob',
    'mito1ssl9xlelyk0u93w5x50snxwslcspfq4pdurj34',
    this.balance,
  );

  showTimer = false;
  counter = 5;
  score = 0;
  accountAddress = 'mitoxxx'
  rewardClaimed = false;
  tokenList : Token[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

    onKeyChangeScore(event: KeyboardEvent) {
     this.score = +(event.target as HTMLInputElement).value
  }

  /*
  handleMainSubmit() {
    const rewardToken: RewardToken = {
      activityName: 'Weekly Score',
      activityCreator: 'Little Chef',
      publicAddress: this.accountAddress,
      result: {
        score: this.score,
        message: 'Well done!',
      },
      reward: {
        type: 'Points',
        value: this.score < 3 ? 5 : 10,
        targetPartner: 'Little Chef'
      },
    };

    this.userService
      .addToken(rewardToken)
      .subscribe((account) => {
        this.rewardTokens = account.rewardTokens;
      });
  }
 */
  handleOffersClick() {
    this.router.navigate(['/user', 'offers']);
  }

  handleMakeTacos() {
    /*
    const rewardToken: RewardToken = {
      activityName: 'Challenge: Make Tacos',
      activityCreator: 'Sukhdev',
      publicAddress: this.accountAddress,
      result: {
        score: 10,
        message: 'Well done!',
      },
      reward: {
        type: 'Monthly Membership',
        value: 1,
        targetPartner: 'Jacks Restaurant',
      },
    };
 */
    this.showTimer = true;
    let timer = setInterval(() => {
      if (this.counter <= 0) {
        clearInterval(timer);
        this.showTimer = false
        this.userService.addDiscountBurritoToken().subscribe(() => {
            this.userService.getTokens().subscribe((tokens) => {
              console.log( { tokens })
            });
            console.log("setting reward claimed to true")
            this.rewardClaimed = true;
            // .subscribe((account) => {
            //   this.rewardTokens = account.rewardTokens;
            // });
      })
    }
      this.counter--
  }, 1000);

  }

  // get token for gym membership
  getGymMembership() {
    // TODO: add gym membership token
    console.log('get gym membership clicked');
  }

  // handle discount for 5% off
  handleUseDiscount() {
    // TODO: add discount token
    console.log('handle use discount')
  }

  // handle learned tacos button click
  learnTacos() {
    const rewardToken: RewardToken = {
      activityName: 'Learn to make tacos',
      activityCreator: 'Sukhdev',
      publicAddress: this.accountAddress,
      result: {
        score: 10,
        message: 'Well done!',
      },
      reward: {
        type: 'Discount',
        value: 5,
        targetPartner: 'Little Chef',
      },
    };
    // this.userService
    //   .addToken(rewardToken)
    //   .subscribe((account) => {
    //     this.rewardTokens = account.rewardTokens;
    //   });
    console.log("learn tacos clicked");
  }

  ngOnInit() {
    this.userService
      .getBalance(this.user.account)
      .subscribe((balanceDTO: BalanceWrapper) => {
        const { balance } = balanceDTO;
        this.user.balance.denom = balance.denom;
        this.user.balance.amount = balance.amount;
      });

      this.userService.getUserAddress().subscribe(addr => {
        this.accountAddress = addr
      })

      this.userService.getTokenStatus(1).subscribe(data => {
        console.log({ data })
      })

    this.userService.getTokens().subscribe((data) => {
      this.tokenList = data.DiscountToken
      console.log({ tokenList: this.tokenList })
    })
  }
}

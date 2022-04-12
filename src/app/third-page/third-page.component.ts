import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RewardToken } from '../models/reward-token';
import { User } from '../models/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css'],
})
export class ThirdPageComponent implements OnInit {
  name = '';
  accountAddress = '';
  rewardTokens: RewardToken[] = [];
  accountId = -1;
  id = -1;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleUsePoints() {
    for (let token of this.rewardTokens) {
      if (token.activityName == 'Weekly Score') {
        //   "Discount") {
        let currentPoints = token.reward.value;
        if (currentPoints == 5) {
          this.userService.removeToken(token).subscribe((account) => {
            this.rewardTokens = account.rewardTokens;
          });
        } else {
          this.userService.reduceTokenPoints(token).subscribe((account) => {
            this.rewardTokens = account.rewardTokens;
          });
        }
      return
      }
    }
  }

  handleUseDiscount() {
    for (let token of this.rewardTokens) {
      if (token.activityName == 'Learn to make tacos') {
        //   "Discount") {
        // send request to delete token and update the list
        this.userService.removeToken(token).subscribe((account) => {
          this.rewardTokens = account.rewardTokens;
        });
      }
    }
  }

  handleMainSubmit(info: any) {
    this.router.navigate(['/user', this.id, 'offers']);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUser(this.id).subscribe((user: User) => {
      this.name = user.name;
      this.accountAddress = user.account?.publicAddress ?? '';
      this.accountId = user.account?.id ?? -1;
      this.rewardTokens = user.account?.rewardTokens ?? [];
    });
  }
}

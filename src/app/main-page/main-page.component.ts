import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  addUserName: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onUserAdd(data: any) {
    if(data.name.length > 0) {
      let user = new User(data.name);

      this.userService.addUser(user).subscribe((newUser: User) => {
        this.addUserName = '';
        this.userService.onUserAdded.emit(newUser);
        const { id } = newUser;
        this.router.navigate(['/user', id]);
      });
    }

    else {
      alert('Please enter the name');
    }
    
  }
}

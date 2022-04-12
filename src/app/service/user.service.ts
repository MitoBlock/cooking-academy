import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Account } from "../models/account";
import { RewardToken } from "../models/reward-token";
import { User } from "../models/user";
import { api } from "./api";

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers':
      'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  }),
};

@Injectable()
export class UserService {
	
	onUserAdded = new EventEmitter<User>();

	constructor(private http: HttpClient){}

  reduceTokenPoints(token: RewardToken) : Observable<Account>  {
		return this.http.put<Account>(`${api}rewardToken/${token.id}`, {});
  }

	removeToken(rewardToken : RewardToken) : Observable<Account> {
		// should be delete action, but that doesn't allow body
		return this.http.put<Account>(`${api}rewardToken`, rewardToken);
  }

	addToken(rewardToken : RewardToken) : Observable<Account> {
		return this.http.post<Account>(`${api}rewardToken`, rewardToken, HTTP_OPTIONS);
	}
	
	addUser(user : User) : Observable<User> {
		return this.http.post<User>(`${api}user`, user);
	}

	getUser(id : number) {
		return this.http.get<User>(`${api}user/${id}`);
	}
	
	
}
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Account } from "../models/account";
import { RewardToken, TokensResp, TokenStatusResp } from "../models/reward-token";
import { User } from "../models/user";
import { api, mitoapi } from "./api";
import { goapi } from "./api";
import { Balance } from "../models/balance";
import { BalanceWrapper } from "../models/balance-dto";

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


	// TODO: shoould the next endpoints be using api or mitoapi?
	removeDiscountTokenStatus() : Observable<any> {
		// should be delete action, but that doesn't allow body
		return this.http.get<any>(`${api}deleteDiscountTokenStatus`);
  }
	removeMembershipTokenStatus() : Observable<any> {
		return this.http.get<any>(`${api}deleteMembershipTokenStatus`);
  }

	// addDiscountBurritoToken() : Observable<Account> {
	addDiscountToken() : Observable<any> {
        console.log("add burito token")
		return this.http.get(`${goapi}discountToken`);
	}
	addMembershipToken() : Observable<any> {
        console.log("adding membership token")
		return this.http.get(`${goapi}membershipToken`);
	}

	// getTokenStatus(id: number) : Observable<TokenStatusResp> {
		// hardcoding token id
	getDiscountTokenStatus() : Observable<TokenStatusResp> {
		return this.http.get<TokenStatusResp>(`${mitoapi}discount_token_status_q/0`);
	}

	getMembershipTokenStatus() : Observable<TokenStatusResp> {
		return this.http.get<TokenStatusResp>(`${mitoapi}discount_token_status_q/0`);
	}

	getTokens() : Observable<TokensResp> {
		return this.http.get<TokensResp>(`${goapi}tokens`);
	}


	// getUser(id : number) {
	// 	return this.http.get<User>(`${api}user/${id}`);
	// }

	// getUserAddress() : Observable<string> {
	// 	return this.http.get<string>(`${goapi}user`);
	// }

	// getBalance(address: string){
	// 	return this.http.get<BalanceWrapper>(`${api}cosmos/bank/v1beta1/balances/${address}/by_denom?denom=mitocell`);
	// }
	
}

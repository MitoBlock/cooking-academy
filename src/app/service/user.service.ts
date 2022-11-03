import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  DeleteTokenStatusReq,
  DiscountTokenReq,
  DiscountTokenStatusResp,
  MembershipTokenReq,
  MembershipTokenStatusResp,
  TokensResp,
} from '../models/types';
import { User } from '../models/user';
import { mitoapi } from './api';
import { goapi } from './api';

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

  constructor(private http: HttpClient) {}

	getUserAddress(): Observable<any> {
		return this.http.get(`${goapi}addr`);
	}

  removeDiscountTokenStatus(
    body: DeleteTokenStatusReq,
  ): Observable<any> {
    return this.http.post<any>(`${goapi}discountTokenStatus`, body);
  }

  // only used in gym app
  removeMembershipTokenStatus(
    body: DeleteTokenStatusReq,
  ): Observable<any> {
    return this.http.post<any>(`${goapi}membershipTokenStatus`, body);
  }

  addDiscountToken(body: DiscountTokenReq): Observable<any> {
    return this.http.post(`${goapi}discountToken`, body);
  }

  addMembershipToken(body: MembershipTokenReq): Observable<any> {
    return this.http.post(`${goapi}membershipToken`, body);
  }

  getDiscountTokens(): Observable<TokensResp> {
    return this.http.get<TokensResp>(`${mitoapi}discount_tokens`);
  }

  getMembershipTokens(): Observable<TokensResp> {
    return this.http.get<TokensResp>(`${mitoapi}membership_tokens`);
  }

  // hardcoding token id
  getDiscountTokenStatus(): Observable<DiscountTokenStatusResp> {
    return this.http.get<DiscountTokenStatusResp>(
      `${mitoapi}discount_token_status_q/0`,
    );
  }

  getMembershipTokenStatus(): Observable<MembershipTokenStatusResp> {
    return this.http.get<MembershipTokenStatusResp>(
      `${mitoapi}membership_token_status_q/0`,
    );
  }

  getTokens(): Observable<TokensResp> {
    return this.http.get<TokensResp>(`${goapi}tokens`);
  }
}

import { Result } from "./result"
import { Reward } from "./reward"

export interface RewardToken {
	
	id? : number
	dateTime? : string
	activityName : string
	activityCreator : string
	publicAddress : string
	result : Result
	reward : Reward

}

export interface Token {
	id? : number
	itemType? : string
	dateTime? : string
	activityName : string
	activityCreator : string
	score: string
	message: string
	membershipDuration?: string
	expiryDate: string
	discountValue: string
	timestamp?: string
	creator?: string
}

export interface TokensResp {
	DiscountToken : Token[]
	pagination: { total : number }
}


export interface TokenStatusResp {
  DiscountToken: DiscountToken
  DiscountTokenStatus: DiscountTokenStatus[]
  pagination: Pagination
}

export interface DiscountToken {
  creator: string
  id: string
  timestamp: string
  activityName: string
  score: string
  message: string
  discountValue: string
  eligibleCompanies: string
  itemType: string
  expiryDate: string
  createdAt: string
}

export interface DiscountTokenStatus {
  id: string
  creator: string
  timestamp: string
  status: string
  tokenID: string
  createdAt: string
}

export interface Pagination {
  next_key: string
  total: string
}
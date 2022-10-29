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

}


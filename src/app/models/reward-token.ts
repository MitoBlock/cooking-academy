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


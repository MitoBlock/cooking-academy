import { RewardToken } from "./reward-token"

export interface Account {
	id : number
	publicAddress : string
	rewardTokens : RewardToken[]
}

// generic token type
export interface Token {
	id? : number
	itemType? : string
	dateTime? : string
	activityName : string
	activityCreator? : string
	score: string
	message: string
	membershipDuration?: string
	expiryDate: string
	discountValue?: string
	timestamp?: string
	creator?: string
}

export interface TokensResp {
	DiscountToken : Token[]
	pagination: { total : number }
}

export interface DiscountTokenStatusResp {
  DiscountToken: DiscountToken
  DiscountTokenStatus?: DiscountTokenStatus[]
  pagination: Pagination
}

export interface DiscountToken {
  timestamp: string
  activityName: string
  score: string
  message: string
  discountValue: string
  eligibleCompanies: string
  itemType: string
  expiryDate: string
}
export interface DiscountTokenStatus {
  id: string
  timestamp: string
  status: string
  tokenID: string
}

export interface Pagination {
  next_key: string
  total: string
}




export interface MembershipTokenStatusResp {
  MembershipToken: MembershipToken
  MembershipTokenStatus: MembershipTokenStatus[]
  pagination: Pagination
}

export interface MembershipToken {
  timestamp: string
  activityName: string
  score: string
  message: string
  membershipDuration: string
  eligibleCompanies: string
  expiryDate: string
}

export interface MembershipTokenStatus {
  id: string
  timestamp: string
  status: string
  tokenID: string
}


// --- DTO's for post requests ---

export interface DeleteDiscountTokenStatusReq {
  DiscountTokenStatusID: number,
	TokenID: number,
}

export interface DeleteMembershipTokenStatusReq {
  MembershipTokenStatusID: number,
	TokenID: number,
}

export interface DiscountTokenReq {
  Timestamp?: string
  ActivityName: string
  Score: string
  Message: string
  DiscountValue: string
  EligibleCompanies: string
  ItemType: string
  ExpiryDate?: string
}
export interface MembershipTokenReq {
  Timestamp?: string
  ActivityName: string
  Score: string
  Message: string
  MembershipDuration: string
  EligibleCompanies: string
  ExpiryDate?: string
}
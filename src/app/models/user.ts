import { Balance } from "./balance";

export class User {
	public name: string
	account : string
	balance : Balance
	
	constructor(name: string, account : string, balance : Balance) {
		this.name = name;
		this.account = account;
		this.balance = balance;
	}
}
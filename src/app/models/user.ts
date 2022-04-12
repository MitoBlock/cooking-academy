import { Account } from "./account"

export class User {
	id? : number
	public name: string
	account? : Account
	
	constructor(name: string,) {
		this.name = name;
	}
}
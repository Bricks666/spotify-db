import { Table } from "./Table";
import {
	IUsers,
	IUser,
	IUserRequest,
	IUserCreateRequest,
	ITablePage,
	IUserLoginRequest,
	IUserDeleteRequest,
	IUserChangeRequest,
} from "../../types";
import { usersConfig } from "../configs";
import { logged, tryCatch } from "../decorators";

export class Users extends Table implements IUsers {
	public constructor() {
		super(usersConfig);
	}

	@tryCatch()
	@logged()
	public async addUser(user: IUserCreateRequest) {
		return await this.insertData(user);
	}

	@tryCatch()
	@logged()
	public async getUsers(page?: ITablePage, filters?: IUserRequest) {
		return await this.selectData<IUser>(page, filters);
	}

	public async deleteUsers(filters: IUserDeleteRequest) {
		return await this.deleteData(filters);
	}

	@tryCatch()
	public async changeUserData(userId: number, newValues: IUserChangeRequest) {
		return await this.updateData(newValues, { userId });
	}

	@logged()
	public async login(loginParams: IUserLoginRequest) {
		const result = await this.selectData<IUser>(undefined, loginParams);
		return result.length === 1;
	}
}

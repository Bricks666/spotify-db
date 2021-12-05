import { PoolConnection } from "mariadb";
import { Table } from "./Table";
import {
	IUsers,
	IUser,
	IUserRequest,
	IUserCreateRequest,
	ITablePage,
	IUserLoginRequest,
	IUserChangeLoginRequest,
} from "../../types";
import { usersConfig } from "../configs";

export class Users extends Table implements IUsers {
	public constructor() {
		super(usersConfig);
	}

	public async init(connection: PoolConnection | null) {
		return await super.init(connection);
	}

	public async addUser(user: IUserCreateRequest) {
		await this.insertData(user);
	}

	public async getUsers(page?: ITablePage, filters?: IUserRequest) {
		return await this.selectData<IUser>(page, filters);
	}

	public async changeLogin(changeLoginParams: IUserChangeLoginRequest) {
		return await this.updateData<IUserRequest, IUserRequest>(
			{ login: changeLoginParams.login },
			{ userId: changeLoginParams.userId }
		);
	}

	public async login(loginParams: IUserLoginRequest) {
		const result = await this.selectData<IUser>(undefined, loginParams);
		return result.length === 1;
	}
}

import { Connection } from "mariadb";
import { Table } from "./Table";
import {
	IUsers,
	IUser,
	Tables,
	IUserRequest,
	IUserCreateRequest,
	ITablePage,
} from "../../types";
import { usersConfig } from "./configs";

export class Users extends Table implements IUsers {
	public constructor() {
		super(Tables.USERS, usersConfig);
	}

	public async init(connection: Connection) {
		return await super.init(connection);
	}

	public async addUser(user: IUserCreateRequest): Promise<void> {
		await this.insertData<IUserCreateRequest>(user);
	}

	public async getUsers(
		page?: ITablePage,
		filters?: IUserRequest
	): Promise<IUser[]> {
		if (typeof filters !== "undefined") {
			return await this.selectData<IUser>(page, filters);
		}
		return await this.selectData<IUser>(page, filters);
	}

	public async login(login: string, password: string): Promise<boolean> {
		console.log(login, password);
		return true;
	}
}

import {
	Table,
	TableFilter,
	TableSelectRequestConfig,
} from "mariadb-table-wrapper";
import { usersConfig } from "../../configs";
import { PartialUserModel, UserCreateOptions, UserModel } from "../../models";
import { UsersTable } from "../../types";

export class Users extends Table<UserModel> implements UsersTable {
	public constructor() {
		super(usersConfig);
	}

	public async addUser(user: UserCreateOptions) {
		return await this.insertData(user);
	}

	public async getUsers<Response extends PartialUserModel = UserModel>(
		config?: TableSelectRequestConfig<UserModel>
	) {
		return await this.selectData<Response>(config);
	}

	public async deleteUsers(filters: TableFilter<UserModel>) {
		return await this.deleteData(filters);
	}

	public async changeUserInfo(userId: number, newValues: UserCreateOptions) {
		return await this.updateData(newValues, { userId });
	}
}

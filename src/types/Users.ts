import { PoolConnection } from "mariadb";
import { TableFilter, TableSelectRequestConfig } from "mariadb-table-wrapper";
import {
	PartialUserModel,
	UserChangeInfoOptions,
	UserCreateOptions,
	UserModel,
} from "src/models";

export interface UsersTable {
	init(connection: PoolConnection): Promise<void>;

	addUser(user: UserCreateOptions): Promise<void>;

	getUsers<Response extends PartialUserModel = UserModel>(
		config?: TableSelectRequestConfig<UserModel>
	): Promise<Response[]>;

	deleteUsers(filters: TableFilter<UserModel>): Promise<void>;

	changeUserInfo(
		userId: number,
		newValues: UserChangeInfoOptions
	): Promise<void>;
}

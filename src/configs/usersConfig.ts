import { SQLTypes, TableConfig } from "mariadb-table-wrapper";
import { UserModel } from "../models";
import { Tables } from "../types";

export const usersConfig: TableConfig<UserModel> = {
	table: Tables.USERS,
	safeCreating: true,
	fields: {
		userId: {
			type: SQLTypes.SMALLINT,
			isUnsigned: true,
			isPrimaryKey: true,
			isNotNull: true,
			isAutoIncrement: true,
		},
		login: {
			type: SQLTypes.VARCHAR,
			varcharLen: 64,
			isNotNull: true,
			isUnique: true,
		},
		password: {
			type: SQLTypes.VARCHAR,
			varcharLen: 64,
			isNotNull: true,
		},
	},
};

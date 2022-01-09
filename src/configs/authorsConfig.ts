import { SQLTypes, TableConfig } from "mariadb-table-wrapper";
import { AuthorModel } from "../models";
import { Tables } from "../types";

export const authorsConfig: TableConfig<AuthorModel> = {
	table: Tables.AUTHORS,
	safeCreating: true,
	fields: {
		authorId: {
			type: SQLTypes.SMALLINT,
			isPrimaryKey: true,
			isAutoIncrement: true,
			isUnsigned: true,
			isNotNull: true,
		},
		authorName: {
			type: SQLTypes.VARCHAR,
			isNotNull: true,
			varcharLen: 64,
		},
	},
};

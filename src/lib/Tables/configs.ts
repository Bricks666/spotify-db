import { ITableConfig, SQLTypes, Tables } from "../../types";

export const usersConfig: ITableConfig = {
	safeCreating: true,
	fields: [
		{
			name: "userId",
			type: SQLTypes.SMALLINT,
			isUnsigned: true,
			isPrimaryKey: true,
			isNotNull: true,
			isAutoIncrement: true,
		},
		{
			name: "login",
			type: SQLTypes.VARCHAR,
			varcharLen: 64,
			isNotNull: true,
			isUnique: true,
		},
		{
			name: "password",
			type: SQLTypes.VARCHAR,
			varcharLen: 64,
			isNotNull: true,
		},
	],
};

export const musicsConfig: ITableConfig = {
	safeCreating: true,
	fields: [
		{
			name: "musicId",
			type: SQLTypes.SMALLINT,
			isUnsigned: true,
			isPrimaryKey: true,
			isAutoIncrement: true,
			isNotNull: true,
		},
		{
			name: "name",
			type: SQLTypes.VARCHAR,
			varcharLen: 64,
			isNotNull: true,
		},
		{
			name: "authorId",
			type: SQLTypes.SMALLINT,
			isUnsigned: true,
			isNotNull: true,
		},
		{
			name: "durationSec",
			type: SQLTypes.SMALLINT,
			isUnsigned: true,
			isNotNull: true,
		},
		{
			name: "albumId",
			type: SQLTypes.SMALLINT,
			isUnsigned: true,
		},
		{
			name: "URL",
			type: SQLTypes.VARCHAR,
			varcharLen: 64,
		},
	],
	foreignKeys: [
		{
			field: "authorId",
			reference: {
				tableName: Tables.AUTHORS,
				field: "authorId",
			},
		},
	],
};

export const authorsConfig: ITableConfig = {
	safeCreating: true,
	fields: [
		{
			name: "authorId",
			type: SQLTypes.SMALLINT,
			isPrimaryKey: true,
			isAutoIncrement: true,
			isUnsigned: true,
			isNotNull: true,
		},
		{
			name: "name",
			type: SQLTypes.VARCHAR,
			isNotNull: true,
			varcharLen: 64,
		},
	],
};

import { SQLTypes, TableConfig } from "mariadb-table-wrapper";
import { MusicModel } from "../models";
import { Tables } from "../types";

export const musicsConfig: TableConfig<MusicModel> = {
	table: Tables.MUSICS,
	safeCreating: true,
	fields: {
		musicId: {
			type: SQLTypes.SMALLINT,
			isUnsigned: true,
			isPrimaryKey: true,
			isAutoIncrement: true,
			isNotNull: true,
		},
		musicName: {
			type: SQLTypes.VARCHAR,
			varcharLen: 64,
			isNotNull: true,
		},
		authorId: {
			type: SQLTypes.SMALLINT,
			isUnsigned: true,
			isNotNull: true,
		},
		durationSec: {
			type: SQLTypes.SMALLINT,
			isUnsigned: true,
			isNotNull: true,
		},
		musicURL: {
			type: SQLTypes.VARCHAR,
			varcharLen: 64,
			isNotNull: true,
		},
		musicPhoto: {
			type: SQLTypes.VARCHAR,
			varcharLen: 64,
		},
		albumId: {
			type: SQLTypes.SMALLINT,
			isUnsigned: true,
		},
	},
	foreignKeys: {
		authorId: {
			tableName: Tables.AUTHORS,
			field: "authorId",
		},
		albumId: {
			tableName: Tables.ALBUMS,
			field: "albumId",
		},
	},
};

import { SQLTypes, TableConfig } from "mariadb-table-wrapper";
import { AlbumModel } from "../models";
import { Tables } from "../types";

export const albumsConfig: TableConfig<AlbumModel> = {
	table: Tables.ALBUMS,
	safeCreating: true,
	fields: {
		albumId: {
			type: SQLTypes.SMALLINT,
			isNotNull: true,
			isUnsigned: true,
			isPrimaryKey: true,
			isAutoIncrement: true,
		},
		albumName: {
			type: SQLTypes.VARCHAR,
			varcharLen: 64,
			isNotNull: true,
		},
		albumPhoto: {
			type: SQLTypes.VARCHAR,
			varcharLen: 64,
		},
	},
};

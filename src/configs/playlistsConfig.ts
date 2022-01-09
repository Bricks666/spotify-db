import { SQLTypes, TableConfig } from "mariadb-table-wrapper";
import { PlaylistModel } from "../models";
import { Tables } from "../types";

export const playlistsConfig: TableConfig<PlaylistModel> = {
	table: Tables.PLAYLISTS,
	safeCreating: true,
	fields: {
		playlistId: {
			type: SQLTypes.SMALLINT,
			isPrimaryKey: true,
			isNotNull: true,
			isUnsigned: true,
			isAutoIncrement: true,
		},
		playlistName: {
			type: SQLTypes.VARCHAR,
			varcharLen: 64,
			isNotNull: true,
		},
		userId: {
			type: SQLTypes.SMALLINT,
			isUnsigned: true,
			isNotNull: true,
		},
	},

	foreignKeys: {
		userId: {
			tableName: Tables.USERS,
			field: "userId",
		},
	},
};

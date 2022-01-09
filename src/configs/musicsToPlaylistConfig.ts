import { SQLTypes, TableConfig } from "mariadb-table-wrapper";
import { MusicToPlaylistModel } from "../models";
import {  Tables } from "../types";

export const musicsToPlaylistConfig: TableConfig<MusicToPlaylistModel> = {
	table: Tables.MUSICS_TO_PLAYLISTS,
	safeCreating: true,
	fields: {
		playlistId: {
			type: SQLTypes.SMALLINT,
			isNotNull: true,
			isUnsigned: true,
			isPrimaryKey: true,
		},
		musicId: {
			type: SQLTypes.SMALLINT,
			isNotNull: true,
			isUnsigned: true,
			isPrimaryKey: true,
		},
	},
	foreignKeys: {
		playlistId: {
			tableName: Tables.PLAYLISTS,
			field: "playlistId",
		},
		musicId: {
			tableName: Tables.MUSICS,
			field: "musicId",
		},
	},
};

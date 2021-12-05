import { ITableConfig, SQLTypes, Tables } from "../types";

export const usersConfig: ITableConfig = {
	table: Tables.USERS,
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
	table: Tables.MUSICS,
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
			name: "musicName",
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
			name: "musicURL",
			type: SQLTypes.VARCHAR,
			varcharLen: 64,
			isNotNull: true,
		},
		{
			name: "musicPhoto",
			type: SQLTypes.VARCHAR,
			varcharLen: 64,
		},
		{
			name: "albumId",
			type: SQLTypes.SMALLINT,
			isUnsigned: true,
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
	table: Tables.AUTHORS,
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
			name: "authorName",
			type: SQLTypes.VARCHAR,
			isNotNull: true,
			varcharLen: 64,
		},
	],
};

export const albumsConfig: ITableConfig = {
	table: Tables.ALBUMS,
	safeCreating: true,
	fields: [
		{
			name: "albumId",
			type: SQLTypes.SMALLINT,
			isNotNull: true,
			isUnsigned: true,
			isPrimaryKey: true,
			isAutoIncrement: true,
		},
		{
			name: "albumName",
			type: SQLTypes.VARCHAR,
			varcharLen: 64,
			isNotNull: true,
		},
		{
			name: "albumPhoto",
			type: SQLTypes.VARCHAR,
			varcharLen: 64,
		},
	],
};

export const playlistsConfig: ITableConfig = {
	table: Tables.PLAYLISTS,
	safeCreating: true,
	fields: [
		{
			name: "playlistId",
			type: SQLTypes.SMALLINT,
			isPrimaryKey: true,
			isNotNull: true,
			isUnsigned: true,
			isAutoIncrement: true,
		},
		{
			name: "playlistName",
			type: SQLTypes.VARCHAR,
			varcharLen: 64,
			isNotNull: true,
		},
		{
			name: "userId",
			type: SQLTypes.SMALLINT,
			isUnsigned: true,
			isNotNull: true,
		},
	],

	foreignKeys: [
		{
			field: "userId",
			reference: {
				tableName: Tables.USERS,
				field: "userId",
			},
		},
	],
};

export const musicsToPlaylistConfig: ITableConfig = {
	table: Tables.MUSIC_TO_PLAYLIST,
	safeCreating: true,
	fields: [
		{
			name: "playlistId",
			type: SQLTypes.SMALLINT,
			isNotNull: true,
			isUnsigned: true,
			isPrimaryKey: true,
		},
		{
			name: "musicId",
			type: SQLTypes.SMALLINT,
			isNotNull: true,
			isUnsigned: true,
			isPrimaryKey: true,
		},
	],
	foreignKeys: [
		{
			field: "playlistId",
			reference: {
				tableName: Tables.PLAYLISTS,
				field: "playlistId",
			},
		},
		{
			field: "musicId",
			reference: {
				tableName: Tables.MUSICS,
				field: "musicId",
			},
		},
	],
};

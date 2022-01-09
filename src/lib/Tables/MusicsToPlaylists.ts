import {
	JoinOperators,
	Table,
	TableFilter,
	TableJoin,
	TableSelectRequestConfig,
} from "mariadb-table-wrapper";
import { musicsToPlaylistConfig } from "../../configs";
import {
	MusicToPlaylistCreateOptions,
	MusicToPlaylistJoinModel,
	MusicToPlaylistModel,
	PartialMusicToPlaylistJoinModel,
	PartialMusicToPlaylistModel,
} from "../../models";
import { MusicsToPlaylistsTable, Tables } from "../../types";

export class MusicsToPlaylists
	extends Table<MusicToPlaylistModel>
	implements MusicsToPlaylistsTable
{
	private readonly join: TableJoin[] = [
		{
			innerTable: Tables.MUSICS_TO_PLAYLISTS,
			outerTable: Tables.PLAYLISTS,
			expressions: [
				{
					innerField: "playlistId",
					outerField: "playlistId",
					operator: JoinOperators.EQUAL,
				},
			],
		},
		{
			innerTable: Tables.PLAYLISTS,
			outerTable: Tables.USERS,
			expressions: [
				{
					innerField: "userId",
					outerField: "userId",
					operator: JoinOperators.EQUAL,
				},
			],
		},
		{
			innerTable: Tables.MUSICS_TO_PLAYLISTS,
			outerTable: Tables.MUSICS,
			expressions: [
				{
					innerField: "musicId",
					outerField: "musicId",
					operator: JoinOperators.EQUAL,
				},
			],
		},
		{
			innerTable: Tables.MUSICS,
			outerTable: Tables.AUTHORS,
			expressions: [
				{
					innerField: "authorId",
					outerField: "authorId",
					operator: JoinOperators.EQUAL,
				},
			],
		},
		{
			innerTable: Tables.MUSICS,
			outerTable: Tables.ALBUMS,
			expressions: [
				{
					innerField: "albumId",
					outerField: "albumId",
					operator: JoinOperators.EQUAL,
				},
			],
		},
	];
	public constructor() {
		super(musicsToPlaylistConfig);
	}

	public async addMusicToPlaylist(
		musicToPlaylist: MusicToPlaylistCreateOptions
	) {
		return await this.insertData(musicToPlaylist);
	}

	public async getMusicsToPlaylists<
		Response extends PartialMusicToPlaylistModel = MusicToPlaylistModel
	>(config?: TableSelectRequestConfig<MusicToPlaylistModel>) {
		return await this.selectData<Response>(config);
	}

	public async getMusicsToPlaylistsJoin<
		Response extends PartialMusicToPlaylistJoinModel = MusicToPlaylistJoinModel
	>(config?: TableSelectRequestConfig<MusicToPlaylistModel>) {
		return await this.selectData<Response>({ ...config, join: this.join });
	}

	public async deleteMusicFromPlaylist(
		filters: TableFilter<MusicToPlaylistModel>
	) {
		return await this.deleteData(filters);
	}
}

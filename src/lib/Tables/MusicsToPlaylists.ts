import { musicsToPlaylistConfig } from "../configs";
import {
	IMusicsToPlaylists,
	IMusicToPlaylistCreateRequest,
	IMusicToPlaylist,
	ITablePage,
	IMusicToPlaylistRequest,
	ITableJoin,
	IMusicToPlaylistJoin,
	Tables,
	JoinOperators,
	IMusicToPlaylistDeleteRequest,
} from "../../types";
import { Table } from "./Table";
import { logged } from "../decorators";

export class MusicsToPlaylists extends Table implements IMusicsToPlaylists {
	public constructor() {
		super(musicsToPlaylistConfig);
	}

	public async addMusicToPlaylist(
		musicToPlaylist: IMusicToPlaylistCreateRequest
	) {
		return await this.insertData(musicToPlaylist);
	}

	@logged()
	public async getMusicsToPlaylists(
		page?: ITablePage,
		filters?: IMusicToPlaylistRequest
	) {
		return await this.selectData<IMusicToPlaylist>(page, filters);
	}

	@logged()
	public async getMusicsToPlaylistsJoin(
		page?: ITablePage,
		filters?: IMusicToPlaylistRequest
	) {
		const join: ITableJoin[] = [
			{
				innerTable: Tables.MUSIC_TO_PLAYLIST,
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
				innerTable: Tables.MUSIC_TO_PLAYLIST,
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

		return await this.selectData<IMusicToPlaylistJoin>(page, filters, join);
	}

	public async deleteMusicFromPlaylist(filters: IMusicToPlaylistDeleteRequest) {
		return await this.deleteData(filters);
	}
}

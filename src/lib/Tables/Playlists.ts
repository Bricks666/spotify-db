import { playlistsConfig } from "../configs";
import { logged } from "../decorators";
import {
	Tables,
	IPlaylists,
	IPlaylistCreateRequest,
	ITablePage,
	IPlaylistRequest,
	IPlaylist,
	IPlaylistDeleteRequest,
	IPlaylistJoin,
	ITableJoin,
	JoinOperators,
	IPlaylistChangeRequest,
} from "./../../types";
import { Table } from "./Table";

export class Playlists extends Table implements IPlaylists {
	public constructor() {
		super(playlistsConfig);
	}

	public async addPlaylist(playlist: IPlaylistCreateRequest) {
		return await this.insertData(playlist);
	}

	@logged()
	public async getPlaylists(page?: ITablePage, filters?: IPlaylistRequest) {
		return await this.selectData<IPlaylist>(page, filters);
	}

	@logged()
	public async getPlaylistsJoin(page?: ITablePage, filters?: IPlaylistRequest) {
		const join: ITableJoin[] = [
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
		];
		return await this.selectData<IPlaylistJoin>(page, filters, join);
	}

	public async changePlaylist(
		playlistId: number,
		newValues: IPlaylistChangeRequest
	) {
		return await this.updateData(newValues, { playlistId });
	}

	public async deletePlaylists(filters: IPlaylistDeleteRequest) {
		return await this.deleteData(filters);
	}
}

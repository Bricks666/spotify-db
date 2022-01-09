import {
	JoinOperators,
	Table,
	TableFilter,
	TableJoin,
	TableSelectRequestConfig,
} from "mariadb-table-wrapper";
import { playlistsConfig } from "../../configs";
import {
	PartialPlaylistJoinModel,
	PartialPlaylistModel,
	PlaylistChangeInfoOptions,
	PlaylistCreateOptions,
	PlaylistJoinModel,
	PlaylistModel,
} from "../../models";
import { PlaylistsTable, Tables } from "./../../types";

export class Playlists extends Table<PlaylistModel> implements PlaylistsTable {
	private readonly join: TableJoin[] = [
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
	public constructor() {
		super(playlistsConfig);
	}

	public async addPlaylist(playlist: PlaylistCreateOptions) {
		return await this.insertData(playlist);
	}

	public async getPlaylists<
		Response extends PartialPlaylistModel = PlaylistModel
	>(config?: TableSelectRequestConfig<PlaylistModel>) {
		return await this.selectData<Response>(config);
	}

	public async getPlaylistsJoin<
		Response extends PartialPlaylistJoinModel = PlaylistJoinModel
	>(config?: TableSelectRequestConfig<PlaylistModel>) {
		return await this.selectData<Response>({ ...config, join: this.join });
	}

	public async changePlaylistInfo(
		playlistId: number,
		newValues: PlaylistChangeInfoOptions
	) {
		return await this.updateData(newValues, { playlistId });
	}

	public async deletePlaylists(filters: TableFilter<PlaylistModel>) {
		return await this.deleteData(filters);
	}
}

import { PoolConnection } from "mariadb";
import { TableFilter, TableSelectRequestConfig } from "mariadb-table-wrapper";
import {
	PartialPlaylistJoinModel,
	PartialPlaylistModel,
	PlaylistChangeInfoOptions,
	PlaylistCreateOptions,
	PlaylistJoinModel,
	PlaylistModel,
} from "src/models";

export interface PlaylistsTable {
	init(connection: PoolConnection): Promise<void>;

	addPlaylist(playlist: PlaylistCreateOptions): Promise<void>;

	getPlaylists<Response extends PartialPlaylistModel = PlaylistModel>(
		config?: TableSelectRequestConfig<PlaylistModel>
	): Promise<Response[]>;
	getPlaylistsJoin<
		Response extends PartialPlaylistJoinModel = PlaylistJoinModel
	>(
		config?: TableSelectRequestConfig<PlaylistJoinModel>
	): Promise<Response[]>;

	deletePlaylists(filters: TableFilter<PlaylistModel>): Promise<void>;

	changePlaylistInfo(
		playlistId: number,
		newValues: PlaylistChangeInfoOptions
	): Promise<void>;
}

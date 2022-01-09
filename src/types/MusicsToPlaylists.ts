import { PoolConnection } from "mariadb";
import { TableFilter, TableSelectRequestConfig } from "mariadb-table-wrapper";
import {
	MusicToPlaylistCreateOptions,
	MusicToPlaylistJoinModel,
	MusicToPlaylistModel,
	PartialMusicToPlaylistJoinModel,
	PartialMusicToPlaylistModel,
} from "src/models";

export interface MusicsToPlaylistsTable {
	init(connection: PoolConnection): Promise<void>;

	addMusicToPlaylist(
		musicToPlaylist: MusicToPlaylistCreateOptions
	): Promise<void>;

	getMusicsToPlaylists<
		Response extends PartialMusicToPlaylistModel = MusicToPlaylistModel
	>(
		config?: TableSelectRequestConfig<MusicToPlaylistModel>
	): Promise<Response[]>;

	getMusicsToPlaylistsJoin<
		Response extends PartialMusicToPlaylistJoinModel = MusicToPlaylistJoinModel
	>(
		config?: TableSelectRequestConfig<MusicToPlaylistJoinModel>
	): Promise<Response[]>;

	deleteMusicFromPlaylist(
		filters: TableFilter<MusicToPlaylistModel>
	): Promise<void>;
}

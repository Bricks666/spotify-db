import { IMusic, IPlaylist, ITablePage, Request } from ".";
import { PoolConnection } from "mariadb";

export interface IMusicsToPlaylists {
	init(connection: PoolConnection | null): Promise<void>;

	addMusicToPlaylist(
		musicToPlaylist: IMusicToPlaylistCreateRequest
	): Promise<void>;

	deleteMusicFromPlaylist(musicToPlaylist: IMusicToPlaylistDeleteRequest): Promise<void>;

	getMusicsToPlaylists(): Promise<IMusicToPlaylist[]>;
	getMusicsToPlaylists(page: ITablePage): Promise<IMusicToPlaylist[]>;
	getMusicsToPlaylists(
		page: ITablePage,
		filters: IMusicToPlaylistRequest
	): Promise<IMusicToPlaylist[]>;

	getMusicsToPlaylistsJoin(): Promise<IMusicToPlaylistJoin[]>;
	getMusicsToPlaylistsJoin(page: ITablePage): Promise<IMusicToPlaylistJoin[]>;
	getMusicsToPlaylistsJoin(
		page: ITablePage,
		filters: IMusicToPlaylistRequest
	): Promise<IMusicToPlaylistJoin[]>;
}
export interface IMusicToPlaylist {
	playlistId: number;
	musicId: number;
}

export interface IMusicToPlaylistDeleteRequest
	extends Required<IMusicToPlaylistRequest> {}

export interface IMusicToPlaylistCreateRequest extends IMusicToPlaylist {}

export interface IMusicToPlaylistRequest extends Request<IMusicToPlaylist> {}

export interface IMusicToPlaylistJoin
	extends IMusicToPlaylist,
		IPlaylist,
		IMusic {}

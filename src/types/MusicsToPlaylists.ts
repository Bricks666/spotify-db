import { IMusic, IPlaylist, ITablePage } from ".";
import { PoolConnection } from "mariadb";
import { Request } from "./common";
export interface IMusicsToPlaylists {
	init(connection: PoolConnection | null): Promise<void>;
	addMusicToPlaylist(
		musicToPlaylist: IMusicToPlaylistCreateRequest
	): Promise<void>;
	deleteMusicToPlaylist(musicToPlaylist: IMusicToPlaylist): Promise<void>;
	getMusicToPlaylist(): Promise<IMusicToPlaylist[]>;
	getMusicToPlaylist(page: ITablePage): Promise<IMusicToPlaylist[]>;
	getMusicToPlaylist(
		page: ITablePage,
		filters: IMusicToPlaylistRequest
	): Promise<IMusicToPlaylist[]>;
}
export interface IMusicToPlaylist {
	playlistId: number;
	musicId: number;
}

export interface IMusicToPlaylistCreateRequest extends IMusicToPlaylist {}

export interface IMusicToPlaylistRequest extends Request<IMusicToPlaylist> {}

export interface IMusicToPlaylistJoin
	extends Omit<IMusicToPlaylist, "playlistId" | "musicId">,
		IPlaylist,
		IMusic {}

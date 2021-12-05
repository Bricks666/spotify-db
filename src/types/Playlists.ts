import { PoolConnection } from "mariadb";
import { ITablePage, IUser } from ".";
import { Request } from "./common";
export interface IPlaylists {
	init(connection: PoolConnection | null): Promise<void>;
	addPlaylist(playlist: IPlaylistCreateRequest): Promise<void>;
	getPlaylists(): Promise<IPlaylist[]>;
	getPlaylists(page: ITablePage): Promise<IPlaylist[]>;
	getPlaylists(
		page: ITablePage,
		filter: IPlaylistRequest
	): Promise<IPlaylist[]>;
}

export interface IPlaylist {
	playlistId: number;
	playlistName: string;
	userId: number;
}

export interface IPlaylistJoin extends IPlaylist, IUser {}

export interface IPlaylistCreateRequest extends Omit<IPlaylist, "playlistId"> {}

export interface IPlaylistRequest extends Request<IPlaylist> {}

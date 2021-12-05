import { PoolConnection } from "mariadb";
import { FromRequest, ITablePage, IUser, Request } from ".";

export interface IPlaylists {
	init(connection: PoolConnection | null): Promise<void>;

	addPlaylist(playlist: IPlaylistCreateRequest): Promise<void>;

	getPlaylists(): Promise<IPlaylist[]>;
	getPlaylists(page: ITablePage): Promise<IPlaylist[]>;
	getPlaylists(
		page: ITablePage,
		filter: IPlaylistRequest
	): Promise<IPlaylist[]>;

	getPlaylistsJoin(): Promise<IPlaylistJoin[]>;
	getPlaylistsJoin(page: ITablePage): Promise<IPlaylistJoin[]>;
	getPlaylistsJoin(
		page: ITablePage,
		filter: IPlaylistRequest
	): Promise<IPlaylistJoin[]>;

	deletePlaylists(filters: IPlaylistDeleteRequest): Promise<void>;

	changePlaylist(
		playlistId: number,
		newValues: IPlaylistChangeRequest
	): Promise<void>;
}

export interface IPlaylist {
	playlistId: number;
	playlistName: string;
	userId: number;
}

export interface IPlaylistJoin extends IPlaylist, IUser {}

export interface IPlaylistCreateRequest extends Omit<IPlaylist, "playlistId"> {}

export interface IPlaylistRequest extends Request<IPlaylist> {}

export interface IPlaylistDeleteRequest
	extends Required<Pick<IPlaylistRequest, "playlistId">> {}

export interface IPlaylistChangeRequest
	extends Omit<FromRequest<IPlaylistRequest>, "playlistId" | "userId"> {}

import {
	IAlbums,
	IAuthors,
	IMusics,
	IMusicsToPlaylists,
	IPlaylists,
	IUsers,
} from ".";

export interface ISpotifyDB {
	readonly users: IUsers;
	readonly authors: IAuthors;
	readonly musics: IMusics;
	readonly playlists: IPlaylists;
	readonly albums: IAlbums;
	readonly musicsToPlaylists: IMusicsToPlaylists;
	disconnect(): void;
	connect(): Promise<void>;
	changeUser(user: string, password: string): Promise<void>;
}

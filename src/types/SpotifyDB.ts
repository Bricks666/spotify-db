import {
	AlbumsTable,
	AuthorsTable,
	MusicsTable,
	MusicsToPlaylistsTable,
	PlaylistsTable,
	UsersTable,
} from ".";

export interface ISpotifyDB {
	readonly users: UsersTable;
	readonly authors: AuthorsTable;
	readonly musics: MusicsTable;
	readonly playlists: PlaylistsTable;
	readonly albums: AlbumsTable;
	readonly musicsToPlaylists: MusicsToPlaylistsTable;

	disconnect(): void;

	connect(): Promise<void>;

	changeUser(user: string, password: string): Promise<void>;
}

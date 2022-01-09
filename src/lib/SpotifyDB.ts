import {
	ISpotifyDB,
	UsersTable,
	AuthorsTable,
	MusicsTable,
	AlbumsTable,
	PlaylistsTable,
	MusicsToPlaylistsTable,
} from "../types";
import mariadb, { Pool, PoolConfig, PoolConnection } from "mariadb";
import {
	Users,
	Authors,
	Musics,
	Albums,
	Playlists,
	MusicsToPlaylists,
} from "./Tables";

export class SpotifyDB implements ISpotifyDB {
	private readonly _pool: Pool;
	private _connection: PoolConnection | null;

	public readonly users: UsersTable;
	public readonly authors: AuthorsTable;
	public readonly musics: MusicsTable;
	public readonly albums: AlbumsTable;
	public readonly playlists: PlaylistsTable;
	public readonly musicsToPlaylists: MusicsToPlaylistsTable;

	public constructor(poolConfig: PoolConfig) {
		this._pool = mariadb.createPool({
			...poolConfig,
			checkDuplicate: false,
			initSql: ["CREATE DATABASE IF NOT EXISTS Spotify;", "USE Spotify;"],
		});

		this._connection = null;

		this.users = new Users();
		this.authors = new Authors();
		this.musics = new Musics();
		this.albums = new Albums();
		this.playlists = new Playlists();
		this.musicsToPlaylists = new MusicsToPlaylists();
	}

	public async connect() {
		this._connection = await this._pool.getConnection();

		const tables = [
			this.users,
			this.authors,
			this.musics,
			this.albums,
			this.playlists,
			this.musicsToPlaylists,
		];

		const inits = tables.map((table) =>
			table.init(this._connection as PoolConnection)
		);

		await Promise.all(inits);
	}

	public disconnect() {
		this._connection?.end();
	}

	public async changeUser(user: string, password: string) {
		await this._connection?.changeUser({ user, password });
	}
}

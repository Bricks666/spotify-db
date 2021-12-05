import {
	ISpotifyDB,
	IUsers,
	IAuthors,
	IMusics,
	IAlbums,
	IPlaylists,
	IMusicsToPlaylists,
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

	public readonly users: IUsers;
	public readonly authors: IAuthors;
	public readonly musics: IMusics;
	public readonly albums: IAlbums;
	public readonly playlists: IPlaylists;
	public readonly musicsToPlaylists: IMusicsToPlaylists;

	public constructor(poolConfig: PoolConfig) {
		this._pool = mariadb.createPool({
			...poolConfig,
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

		if (typeof this._connection !== "undefined") {
			tables.map((table) => table.init(this._connection));

			await Promise.all(tables);
		}
	}

	public disconnect(): void {
		this._connection!.end();
	}

	public async changeUser(user: string, password: string) {
		await this._connection!.changeUser({ user, password });
	}
}

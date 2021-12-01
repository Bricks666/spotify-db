import { ISpotifyDB, IUsers, IAuthors } from "../types";
import mariadb, { Pool, PoolConfig, PoolConnection } from "mariadb";
import { Users, Authors, Musics } from "./Tables";

export class SpotifyDB implements ISpotifyDB {
    private readonly _pool: Pool;
    private _connection: PoolConnection | null;

    public readonly users: IUsers;
    public readonly authors: IAuthors;
    public readonly musics: any;
    public readonly playlists: any;
    public readonly albums: any;

    public constructor(poolConfig: PoolConfig) {
        this._pool = mariadb.createPool({
            ...poolConfig,
            initSql: "CREATE DATABASE IF NOT EXISTS Spotify;",
            database: "Spotify",
        });
        this._connection = null;
        this.users = new Users();
        this.authors = new Authors();
        this.musics = new Musics();
    }

    public async connect() {
        this._connection = await this._pool.getConnection();
        const tables = [this.users, this.authors, this.musics];

        tables.map((table) => table.init(this._connection));

        await Promise.all(tables);
    }

    public disconnect(): void {
        this._connection!.end();
    }

    public async changeUser(user: string, password: string) {
        await this._connection!.changeUser({ user, password });
    }
}

import { PoolConnection } from "mariadb";
import { ITablePage } from ".";
import { Request, URL } from "./common";

export interface IAlbums {
	init(connection: PoolConnection | null): Promise<void>;
	addAlbum(album: IAlbumCreateRequest): Promise<void>;
	getAlbums(): Promise<IAlbum[]>;
	getAlbums(page: ITablePage): Promise<IAlbum[]>;
	getAlbums(page: ITablePage, filters: IAlbumRequest): Promise<IAlbum[]>;
}

export interface IAlbum {
	albumId: number;
	albumName: string;
	albumPhoto?: URL;
}
export interface IAlbumCreateRequest extends Omit<IAlbum, "albumId"> {}

export interface IAlbumRequest extends Request<IAlbum> {}

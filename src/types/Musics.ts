import { ITablePage } from "./Table";
import { PoolConnection } from "mariadb";
import { IAuthor, IAlbum } from ".";
import { Request, URL } from "./common";

export interface IMusics {
	init(connection: PoolConnection | null): Promise<void>;
	getMusics(): Promise<IMusic[]>;
	getMusics(page: ITablePage): Promise<IMusic[]>;
	getMusics(page: ITablePage, filters: IMusicRequest): Promise<IMusic[]>;
	/* Может быть можно как то свести с функцией getMusics */
	getMusicsJoin(): Promise<IMusicJoin[]>;
	getMusicsJoin(page: ITablePage): Promise<IMusicJoin[]>;
	getMusicsJoin(
		page: ITablePage,
		filters: IMusicRequest
	): Promise<IMusicJoin[]>;
	addMusic(music: IMusicCreateRequest): Promise<void>;
}

export interface IMusic {
	musicId: number;
	musicName: string;
	authorId: number;
	durationSec: number;
	musicURL: URL;
	musicPhoto?: URL;
	albumId?: number;
}

export interface IMusicJoin
	extends Omit<IMusic, "albumId" | "authorId">,
		IAuthor,
		IAlbum {}

export interface IMusicCreateRequest extends Omit<IMusic, "musicId"> {}

export interface IMusicStruct extends Required<IMusic> {}

export interface IMusicRequest extends Request<IMusic> {}

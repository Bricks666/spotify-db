import { ITablePage } from "./Table";
import { PoolConnection } from "mariadb";
import { IAuthor, ITableJoin } from ".";

export interface IMusics {
	init(connection: PoolConnection): Promise<void>;
	getMusics(): Promise<IMusic[]>;
	getMusics(page: ITablePage): Promise<IMusic[]>;
	getMusics(page: ITablePage, filters: IMusicRequest): Promise<IMusic[]>;
	getMusics(
		page: ITablePage,
		filters: IMusicRequest,
		join: ITableJoin<IMusicStruct, IAuthor>
	): Promise<IMusic[]>;
	addMusic(music: IMusicCreateRequest): Promise<void>;
}

export interface IMusicCreateRequest {
	name: string;
	authorId: number;
	durationSec: number;
	URL?: string;
	albumId?: number;
}

export interface IMusic extends IMusicCreateRequest {
	author: IAuthor;
}
export interface IMusicStruct extends IMusicCreateRequest {
	authorsId: number;
}

export interface IMusicRequest {
	authorsId?: number;
	name?: string;
	authorId?: string;
	durationSec?: number;
	albumId?: number;
}

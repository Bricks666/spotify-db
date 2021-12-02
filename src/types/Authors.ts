import { ITablePage } from "./Table";
import { PoolConnection } from "mariadb";
export interface IAuthor {
	authorId: number;
	name: string;
}

export interface IAuthorRequest {
	authorId?: number | number[];
	name?: string | string[];
}
export interface IAuthorCreateRequest {
	name: string;
}

export interface IAuthors {
	init(connection: PoolConnection): Promise<void>;
	getAuthors(): Promise<IAuthor[]>;
	getAuthors(page: ITablePage): Promise<IAuthor[]>;
	getAuthors(page: ITablePage, filters: IAuthorRequest): Promise<IAuthor[]>;
	addAuthor(author: IAuthorCreateRequest): Promise<void>;
}

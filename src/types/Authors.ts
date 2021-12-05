import { ITablePage } from "./Table";
import { PoolConnection } from "mariadb";
import { Request } from "./common";

export interface IAuthors {
	init(connection: PoolConnection | null): Promise<void>;
	getAuthors(): Promise<IAuthor[]>;
	getAuthors(page: ITablePage): Promise<IAuthor[]>;
	getAuthors(page: ITablePage, filters: IAuthorRequest): Promise<IAuthor[]>;
	addAuthor(author: IAuthorCreateRequest): Promise<void>;
}

export interface IAuthor {
	authorId: number;
	authorName: string;
}

export interface IAuthorRequest extends Request<IAuthor> {}
export interface IAuthorCreateRequest extends Omit<IAuthor, "authorId"> {}

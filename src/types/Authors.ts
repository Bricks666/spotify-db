import { ITablePage } from "./Table";
import { PoolConnection } from "mariadb";
import { FromRequest, Request } from ".";

export interface IAuthors {
	init(connection: PoolConnection | null): Promise<void>;

	getAuthors(): Promise<IAuthor[]>;
	getAuthors(page: ITablePage): Promise<IAuthor[]>;
	getAuthors(page: ITablePage, filters: IAuthorRequest): Promise<IAuthor[]>;

	addAuthor(author: IAuthorCreateRequest): Promise<void>;

	deleteAuthors(filters: IAuthorDeleteRequest): Promise<void>;
}

export interface IAuthor {
	authorId: number;
	authorName: string;
}

export interface IAuthorRequest extends Request<IAuthor> {}

export interface IAuthorCreateRequest extends Omit<IAuthor, "authorId"> {}

export interface IAuthorDeleteRequest
	extends Required<Pick<IAuthorRequest, "authorId">> {}

export interface IAuthorChangeRequest
	extends Omit<FromRequest<IAuthorRequest>, "authorId"> {}

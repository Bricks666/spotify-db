import { PoolConnection } from "mariadb";
import { TableFilter, TableSelectRequestConfig } from "mariadb-table-wrapper";
import {
	AuthorCreateOptions,
	AuthorModel,
	PartialAuthorModel,
} from "../models";

export interface AuthorsTable {
	init(connection: PoolConnection | null): Promise<void>;

	getAuthors<Response extends PartialAuthorModel = AuthorModel>(
		config?: TableSelectRequestConfig<AuthorModel>
	): Promise<Response[]>;

	addAuthor(author: AuthorCreateOptions): Promise<void>;

	deleteAuthors(filters: TableFilter<AuthorModel>): Promise<void>;
}

import {
	IAuthors,
	IAuthor,
	IAuthorRequest,
	IAuthorCreateRequest,
	ITablePage,
} from "../../types";
import { PoolConnection } from "mariadb";
import { Table } from "./Table";
import { authorsConfig } from "../configs";

export class Authors extends Table implements IAuthors {
	public constructor() {
		super(authorsConfig);
	}

	public async init(connection: PoolConnection | null) {
		return await super.init(connection);
	}

	public async getAuthors(page?: ITablePage, filters?: IAuthorRequest) {
		if (typeof filters !== "undefined") {
			return await this.selectData<IAuthor>(page, filters);
		}
		return await this.selectData<IAuthor>(page);
	}

	public async addAuthor(author: IAuthorCreateRequest) {
		return await this.insertData<IAuthorRequest>(author);
	}
}

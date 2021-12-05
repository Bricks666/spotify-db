import {
	IAuthors,
	IAuthor,
	IAuthorRequest,
	IAuthorCreateRequest,
	ITablePage,
	IAuthorDeleteRequest,
	IAuthorChangeRequest,
} from "../../types";
import { Table } from "./Table";
import { authorsConfig } from "../configs";
import { logged } from "../decorators";

export class Authors extends Table implements IAuthors {
	public constructor() {
		super(authorsConfig);
	}

	@logged()
	public async getAuthors(page?: ITablePage, filters?: IAuthorRequest) {
		if (typeof filters !== "undefined") {
			return await this.selectData<IAuthor>(page, filters);
		}
		return await this.selectData<IAuthor>(page);
	}

	public async addAuthor(author: IAuthorCreateRequest) {
		return await this.insertData<IAuthorRequest>(author);
	}

	public async deleteAuthors(filters: IAuthorDeleteRequest) {
		return await this.deleteData(filters);
	}

	public async changeAuthor(authorId: number, newValues: IAuthorChangeRequest) {
		return await this.updateData(newValues, { authorId });
	}
}

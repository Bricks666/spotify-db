import {
	Table,
	TableFilter,
	TableSelectRequestConfig,
} from "mariadb-table-wrapper";
import {
	AuthorChangeInfoOptions,
	AuthorCreateOptions,
	AuthorModel,
	PartialAuthorModel,
} from "../../models";
import { authorsConfig } from "../../configs";
import { AuthorsTable } from "../../types";

export class Authors extends Table<AuthorModel> implements AuthorsTable {
	public constructor() {
		super(authorsConfig);
	}

	public async addAuthor(author: AuthorCreateOptions) {
		return await this.insertData(author);
	}

	public async getAuthors<Response extends PartialAuthorModel = AuthorModel>(
		config?: TableSelectRequestConfig<AuthorModel>
	) {
		return await this.selectData<Response>(config);
	}

	public async deleteAuthors(filters: TableFilter<AuthorModel>) {
		return await this.deleteData(filters);
	}

	public async changeAuthorInfo(
		authorId: number,
		newValues: AuthorChangeInfoOptions
	) {
		return await this.updateData(newValues, { authorId });
	}
}

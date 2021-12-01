import {
    Tables,
    IAuthors,
    IAuthor,
    IAuthorRequest,
    IAuthorCreateRequest,
} from "../../types";
import { Connection } from "mariadb";
import { Table } from "./Table";
import { authorsConfig } from "./configs";

export class Authors extends Table implements IAuthors {
    public constructor() {
        super(Tables.AUTHORS);
    }

    public async init(connection: Connection) {
        return await super.init(connection, authorsConfig);
    }

    public async getAuthors(filters?: IAuthorRequest) {
        if (typeof filters !== "undefined") {
            return await this.selectData<IAuthor>(filters);
        }
        return await this.selectData<IAuthor>();
    }

    public async addAuthor(author: IAuthorCreateRequest) {
        return await this.insertData<IAuthorRequest>(author);
    }
}

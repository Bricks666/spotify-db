import { Connection } from "mariadb";
import {
	ITable,
	Tables,
	ITableConfig,
	ITablePage,
	ITableJoin,
} from "../../types";
import { Services } from "../Services";

export class Table implements ITable {
	private connection: Connection | null;
	private readonly tableName: Tables;
	private readonly config: ITableConfig;

	public constructor(tableName: Tables, config: ITableConfig) {
		this.tableName = tableName;
		this.config = config;
		this.connection = null;
	}

	public async init(connection: Connection) {
		this.connection = connection;
		const intiSQL: string = Services.parseCreateTable(
			this.tableName,
			this.config
		);
		await this.connection.query(intiSQL);
	}

	public async insertData<Response>(params: Response) {
		const fields: string = Services.toValidSQLKeys(params);
		const values: string = Services.toValidSQLValues(params);
		await this.connection?.query(
			`INSERT ${this.tableName}(${fields}) VALUES(${values});`
		);
	}

	public async selectData<Response, InnerTable = {}, OuterTable = {}>(
		page: ITablePage = { page: 1, countOnPage: 100 },
		filters?: Object,
		join?: ITableJoin<InnerTable, OuterTable>
	) {
		let where: string = "";
		let association: string = "";

		if (filters !== undefined) {
			where = Services.toValidSQLWhere(filters);
		}

		if (typeof join !== "undefined") {
			association = Services.parseJoinTable<InnerTable, OuterTable>(join);
		}

		const start = (page.page - 1) * page.countOnPage;
		const end = page.page * page.countOnPage;

		const response: Response[] = await this.connection?.query(
			`SELECT * FROM ${this.tableName} ${where || ""} ${
				association || ""
			} LIMIT ${start}, ${end};`
		);

		return Array.from(response) as Response[];
	}

	public async deleteData() {}

	public async updateData() {}
}

import { PoolConnection } from "mariadb";
import { ITable, ITableConfig, ITablePage, ITableJoin, SQL } from "../../types";
import {
	parseCreateTable,
	toValidSQLKeys,
	toValidSQLValues,
	parseJoinTables,
	toValidSQLWhere,
	parseSetParams,
} from "../Services";

export class Table implements ITable {
	private connection: PoolConnection | null;
	private readonly config: ITableConfig;

	public constructor(config: ITableConfig) {
		this.config = config;
		this.connection = null;
	}

	public async init(connection: PoolConnection | null) {
		this.connection = connection;

		const intiSQL: string = parseCreateTable(this.config);

		await this.connection!.query(intiSQL);
	}

	public async insertData<Request extends Object>(params: Request) {
		const fields: string = toValidSQLKeys(params);
		const values: string = toValidSQLValues(params);

		await this.connection?.query(
			`INSERT ${this.config.table}(${fields}) VALUES(${values});`
		);
	}

	public async selectData<Response>(
		page: ITablePage = { page: 1, countOnPage: 100 },
		filters?: Object,
		join?: ITableJoin[]
	) {
		let where: SQL = "";
		let association: SQL = "";

		if (typeof filters !== "undefined") {
			where = toValidSQLWhere(filters);
		}

		if (typeof join !== "undefined") {
			association = parseJoinTables(join);
		}

		const start: number = (page.page - 1) * page.countOnPage;
		const end: number = page.page * page.countOnPage;

		const response: Response[] = await this.connection?.query(
			`SELECT * FROM ${this.config.table} ${where} ${association} LIMIT ${start}, ${end};`
		);

		return Array.from(response);
	}

	public async deleteData<Filters extends Object>(filters: Filters) {
		if (Object.getOwnPropertyNames(filters).length === 0) {
			throw new Error("filters must have any property");
		}
		const where: SQL = toValidSQLWhere(filters);

		await this.connection?.query(`DELETE FROM ${this.config.table} ${where};`);
	}

	public async updateData<Values extends Object, Filters extends Object>(
		newValues: Values,
		filters: Filters
	) {
		if (
			Object.getOwnPropertyNames(newValues).length === 0 ||
			Object.getOwnPropertyNames(filters).length === 0
		) {
			throw new Error("newValues and Filter must have any property");
		}
		console.log(Object.getOwnPropertyNames(newValues));
		const update: SQL = parseSetParams(newValues);
		const where: SQL = toValidSQLWhere(filters);

		await this.connection?.query(
			`UPDATE ${this.config.table} SET ${update} ${where};`
		);
	}
}

import { Connection } from "mariadb";

export type SQL = string;

export enum Tables {
	USERS = "users",
	AUTHORS = "authors",
	PLAYLISTS = "playlists",
	MUSICS = "musics",
}

export enum SQLTypes {
	SMALLINT = "SMALLINT",
	VARCHAR = "VARCHAR",
}

export interface IField {
	name: string;
	type: SQLTypes;
	varcharLen?: number;
	isPrimaryKey?: boolean;
	isUnique?: boolean;
	isUnsigned?: boolean;
	isNotNull?: boolean;
	isAutoIncrement?: boolean;
}
export interface IReference {
	tableName: Tables;
	field: string;
}

export interface IForeignKey {
	field: string;
	reference: IReference;
}

export interface ITableConfig {
	safeCreating?: boolean;
	fields?: IField[];
	foreignKeys?: IForeignKey[];
}
export interface ITablePage {
	page: number;
	countOnPage: number;
}

export enum IJoinOperators {
	LESS_THAN = "<",
	EQUAL = "=",
	MORE_THAN = ">",
}

export interface ITableJoin<InnerTable, OuterTable> {
	outerTable: Tables;
	innerTable: Tables;
	expressions: IJoinExpression<InnerTable, OuterTable>[];
}
export interface IJoinExpression<InnerTable, OuterTable> {
	innerField: keyof InnerTable;
	operator: IJoinOperators;
	outerField: keyof OuterTable;
}

export interface ITable {
	init(connection: Connection, tableConfig?: ITableConfig): Promise<void>;
	insertData<Request>(params: Request): Promise<void>;
	updateData(): Promise<void>;
	deleteData(): Promise<void>;
	selectData<Response>(): Promise<Response[]>;
	selectData<Response>(page: ITablePage): Promise<Response[]>;
	selectData<Response>(page: ITablePage, filters: Object): Promise<Response[]>;
	selectData<Response, InnerTable, OuterTable>(
		page: ITablePage,
		filters: Object,
		join: ITableJoin<InnerTable, OuterTable>
	): Promise<Response[]>;
}

import { PoolConnection } from "mariadb";

export interface ITable {
	init(connection: PoolConnection | null): Promise<void>;

	insertData<Request extends Object>(params: Request): Promise<void>;

	updateData<Values extends Object, Filters extends Object>(
		newValues: Values,
		filters: Filters
	): Promise<void>;

	deleteData<Filters extends Object>(filters: Filters): Promise<void>;

	selectData<Response>(): Promise<Response[]>;
	selectData<Response>(page: ITablePage): Promise<Response[]>;
	selectData<Response>(page: ITablePage, filters: Object): Promise<Response[]>;
	selectData<Response>(
		page: ITablePage,
		filters: Object,
		join: ITableJoin[]
	): Promise<Response[]>;
}
export enum Tables {
	USERS = "users",
	AUTHORS = "authors",
	PLAYLISTS = "playlists",
	MUSICS = "musics",
	ALBUMS = "albums",
	MUSIC_TO_PLAYLIST = "musicsToPlaylists",
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
	table: Tables;
	fields: IField[];
	safeCreating?: boolean;
	foreignKeys?: IForeignKey[];
}
export interface ITablePage {
	page: number;
	countOnPage: number;
}

export enum JoinOperators {
	LESS_THAN = "<",
	EQUAL = "=",
	MORE_THAN = ">",
}

export interface ITableJoin {
	outerTable: Tables;
	innerTable: Tables;
	expressions: IJoinExpression[];
}
export interface IJoinExpression {
	innerField: `${string}Id`;
	operator: JoinOperators;
	outerField: `${string}Id`;
}

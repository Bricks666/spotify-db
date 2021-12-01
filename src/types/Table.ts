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

export interface ICreateTable {
    safeCreating?: boolean;
    fields?: IField[];
    foreignKeys?: IForeignKey[];
}

export interface ITable {
    init(connection: Connection, tableConfig?: ICreateTable): Promise<void>;
    insertData<Request>(params: Request): Promise<void>;
    updateData(): Promise<void>;
    deleteData(): Promise<void>;
    selectData<Response>(): Promise<Response[]>;
    selectData<Response>(filters: Object): Promise<Response[]>;
}

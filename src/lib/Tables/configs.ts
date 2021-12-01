import { ICreateTable, SQLTypes, Tables } from "../../types";

export const usersConfig: ICreateTable = {
    safeCreating: true,
    fields: [
        {
            name: "id",
            type: SQLTypes.SMALLINT,
            isUnsigned: true,
            isPrimaryKey: true,
            isNotNull: true,
            isAutoIncrement: true,
        },
        {
            name: "login",
            type: SQLTypes.VARCHAR,
            varcharLen: 64,
            isNotNull: true,
            isUnique: true,
        },
        {
            name: "password",
            type: SQLTypes.VARCHAR,
            varcharLen: 64,
            isNotNull: true,
        },
    ],
};

export const musicsConfig: ICreateTable = {
    safeCreating: true,
    fields: [
        {
            name: "id",
            type: SQLTypes.SMALLINT,
            isUnsigned: true,
            isPrimaryKey: true,
            isAutoIncrement: true,
            isNotNull: true,
        },
        {
            name: "name",
            type: SQLTypes.VARCHAR,
            varcharLen: 64,
            isNotNull: true,
        },
        {
            name: "authorId",
            type: SQLTypes.SMALLINT,
            isUnsigned: true,
            isNotNull: true,
        },
        {
            name: "durationSec",
            type: SQLTypes.SMALLINT,
            isUnsigned: true,
            isNotNull: true,
        },
        {
            name: "albumId",
            type: SQLTypes.SMALLINT,
            isUnsigned: true,
        },
    ],
    foreignKeys: [
        {
            field: "authorId",
            reference: {
                tableName: Tables.AUTHORS,
                field: "id",
            },
        },
    ],
};

export const authorsConfig: ICreateTable = {
    safeCreating: true,
    fields: [
        {
            name: "id",
            type: SQLTypes.SMALLINT,
            isPrimaryKey: true,
            isAutoIncrement: true,
            isUnsigned: true,
            isNotNull: true,
        },
        {
            name: "name",
            type: SQLTypes.VARCHAR,
            isNotNull: true,
            varcharLen: 64,
        },
    ],
};

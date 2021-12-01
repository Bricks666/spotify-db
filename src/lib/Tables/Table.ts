import { Connection } from "mariadb";
import { ITable, Tables, ICreateTable } from "../../types";
import { Services } from "../Services";

export class Table implements ITable {
    private connection: Connection | null;
    private readonly tableName: Tables;

    public constructor(tableName: Tables) {
        this.tableName = tableName;
        this.connection = null;
    }

    public async init(connection: Connection, tableConfig?: ICreateTable) {
        this.connection = connection;
        if (typeof tableConfig !== "undefined") {
            const intiSQL: string = Services.parseCreateTable(
                this.tableName,
                tableConfig
            );
            await this.connection.query(intiSQL);
        }
    }

    public async insertData<Response>(params: Response) {
        const fields: string = Services.toValidSQLKeys(params);
        const values: string = Services.toValidSQLValues(params);
        await this.connection?.query(
            `INSERT ${this.tableName}(${fields}) VALUES(${values});`
        );
    }

    public async selectData<Response>(filters?: Object) {
        let where = "";
        if (filters !== null) {
            where = Services.toValidSQLWhere(filters);
        }

        const response: any[] = await this.connection?.query(
            `SELECT * FROM ${this.tableName} ${where || ""};`
        );

        return Array.from(response) as Response[];
    }

    public async deleteData() {}

    public async updateData() {}
}

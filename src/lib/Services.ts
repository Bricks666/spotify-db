import { SQLTypes } from "./../types/Table";
import { Tables, ICreateTable, IField, IForeignKey } from "./../types";
export class Services {
    public static toJSON(values: string[]): string[] {
        return values.map((el: string) => JSON.stringify(el));
    }

    private static toString(array: any[], separator: string = ", "): string {
        return array.join(separator);
    }

    public static toValidSQLValues(object: any): string {
        return Services.toString(this.toJSON(Object.values(object)));
    }

    public static toValidSQLKeys(object: any): string {
        return Object.keys(object).join(", ");
    }

    public static toValidSQLWhere(object: any): string {
        const pairs: any[][] = Object.entries(object);
        const filtersArray: any[] = pairs.map((pair) => {
            let filter: string = `${pair[0]} `;
            let filterValue: string = "";
            if (Array.isArray(pair[1])) {
                filterValue = `IN (${Services.toValidSQLValues(pair[1])})`;
            } else {
                filterValue = `= "${pair[1].toString()}"`;
            }

            return filter + filterValue;
        });

        return `WHERE ${Services.toString(filtersArray, " AND ")}`;
    }
    private static parseTableField(field: IField): string {
        let validField: string = `${field.name}`;

        switch (field.type) {
            case SQLTypes.VARCHAR: {
                if (
                    typeof field.varcharLen === "undefined" ||
                    field.varcharLen <= 0
                ) {
                    throw new Error(
                        "When field have type VARCHAR, varchar must not be undefined and less than 0"
                    );
                }
                validField += ` ${SQLTypes.VARCHAR}(${field.varcharLen}) `;
                break;
            }
            case SQLTypes.SMALLINT: {
                validField += ` ${SQLTypes.SMALLINT} `;
                if (field.isUnsigned) {
                    validField += " UNSIGNED";
                }
                break;
            }
        }
        if (field.isUnique) {
            validField += " UNIQUE";
        }

        if (field.isPrimaryKey) {
            validField += " PRIMARY KEY";
        }

        if (field.isAutoIncrement) {
            validField += " AUTO_INCREMENT";
        }

        if (field.isNotNull) {
            validField += " NOT NULL";
        }

        return validField;
    }

    private static parseForeignKey(key: IForeignKey): string {
        const validKey: string = `FOREIGN KEY (${key.field}) REFERENCES ${key.reference.tableName} (${key.reference.field})`;
        return validKey;
    }

    public static parseCreateTable(name: Tables, config: ICreateTable): string {
        let fields: string = "";
        let foreignKeys: string = "";
        if (typeof config.fields !== "undefined") {
            fields += Services.toString(
                config.fields.map(Services.parseTableField)
            );
        }

        if (typeof config.foreignKeys !== "undefined") {
            foreignKeys = Services.toString(
                config.foreignKeys.map(Services.parseForeignKey)
            );
        }

        const SQLScript: string = `CREATE TABLE ${
            config.safeCreating ? "IF NOT EXISTS" : ""
        } ${name}(${fields} ${
            fields !== "" && foreignKeys !== "" ? "," : ""
        } ${foreignKeys});`;

        return SQLScript;
    }
}

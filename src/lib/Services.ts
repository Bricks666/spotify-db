import {
	Tables,
	ITableConfig,
	IField,
	IForeignKey,
	IJoinExpression,
	SQLTypes,
	ITableJoin,
	SQL,
} from "./../types";
const toJSON = (values: string[]): string[] => {
	return values.filter((s) => s !== "").map((el: string) => JSON.stringify(el));
};

const toString = <T extends Object>(
	array: T[],
	separator: string = ", "
): string => {
	return array.join(separator);
};

export const toValidSQLValues = <T extends Object>(object: T): string => {
	return toString(toJSON(Object.values(object)));
};

export function toValidSQLKeys<T extends Object>(object: T): string {
	return toString(Object.keys(object));
}

export function toValidSQLWhere<T extends Object>(object: T): SQL {
	const keys: string[] = Object.keys(object);
	const values: any[] = Object.values(object);

	const filtersArray: SQL[] = keys.map((key, i) => {
		let filter: string = `${key} `;
		let filterValue: SQL = "";
		if (Array.isArray(values[i])) {
			filterValue = `IN (${toValidSQLValues(values[i])})`;
		} else {
			filterValue = `= "${values[i].toString()}"`;
		}

		return filter + filterValue;
	});

	return `WHERE ${toString(filtersArray, " AND ")}`;
}
const parseTableField = (field: IField): SQL => {
	let validField: SQL = `${field.name}`;

	switch (field.type) {
		case SQLTypes.VARCHAR: {
			if (typeof field.varcharLen === "undefined" || field.varcharLen <= 0) {
				throw new Error(
					"When field have type VARCHAR, varchar must not be undefined and less than 0"
				);
			}
			validField += ` ${SQLTypes.VARCHAR}(${field.varcharLen})`;
			break;
		}
		case SQLTypes.SMALLINT: {
			validField += ` ${SQLTypes.SMALLINT}`;
			if (field.isUnsigned) {
				validField += " UNSIGNED";
			}
			break;
		}
	}

	if (field.isUnique) {
		validField += " UNIQUE";
	}

	if (field.isAutoIncrement) {
		validField += " AUTO_INCREMENT";
	}

	if (field.isNotNull) {
		validField += " NOT NULL";
	}

	return validField;
};

const parseForeignKey = (key: IForeignKey): SQL => {
	const validKey: SQL = `FOREIGN KEY (${key.field}) REFERENCES ${key.reference.tableName} (${key.reference.field}) ON DELETE CASCADE ON UPDATE CASCADE`;
	return validKey;
};

const parsePrimaryKeys = (fields: IField[]): SQL => {
	const primaryKeyNames: SQL[] = fields
		.filter((field) => field.isPrimaryKey)
		.map((field) => field.name);

	return `PRIMARY KEY(${toString(primaryKeyNames)})`;
};

export const parseCreateTable = (config: ITableConfig): SQL => {
	const fields: SQL = toString(config.fields.map(parseTableField));

	let foreignKeys: SQL = "";
	if (typeof config.foreignKeys !== "undefined") {
		foreignKeys = toString(config.foreignKeys.map(parseForeignKey));
	}

	const primaryKey = parsePrimaryKeys(config.fields);
	const SQLScript: SQL = `CREATE TABLE ${
		config.safeCreating ? "IF NOT EXISTS" : ""
	} ${config.table}(${fields},${primaryKey}${
		foreignKeys !== "" ? "," + foreignKeys : ""
	});`;

	return SQLScript;
};

const parseExpression = (
	expression: IJoinExpression,
	innerTable: Tables,
	outerTable: Tables
): SQL => {
	return `${innerTable}.${expression.innerField} ${expression.operator} ${outerTable}.${expression.outerField}`;
};

const parseJoinTable = (join: ITableJoin): SQL => {
	const expressions: SQL[] = join.expressions.map((exp) =>
		parseExpression(exp, join.innerTable, join.outerTable)
	);
	const expression: SQL = toString(expressions, " AND ");
	const SQLScript: SQL = `JOIN ${join.outerTable} ON  ${expression}`;

	return SQLScript;
};

export const parseJoinTables = (joins: ITableJoin[]): SQL => {
	const SQLcommands: SQL[] = joins.map(parseJoinTable);

	return toString(SQLcommands, " ");
};

export const parseSetParams = (params: Object): string => {
	const keys: string[] = Object.keys(params);
	const values: string[] = toJSON(Object.values(params));
	const pairs: SQL[] = keys.map((key, i) => `${key} = ${values[i]}`);

	return toString(pairs);
};

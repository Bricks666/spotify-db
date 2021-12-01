import { Connection } from "mariadb";
import { Tables } from "./../../types/";
import { musicsConfig } from "./configs";
import { Table } from "./Table";

export class Musics extends Table {
    constructor() {
        super(Tables.MUSICS);
    }

    public async init(connection: Connection) {
        return await super.init(connection, musicsConfig);
    }
}

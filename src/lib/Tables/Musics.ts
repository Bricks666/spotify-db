import { Connection } from "mariadb";
import {
	Tables,
	IMusics,
	IMusicRequest,
	IMusic,
	ITablePage,
	IAuthor,
	IMusicStruct,
	IJoinOperators,
} from "./../../types/";
import { musicsConfig } from "./configs";
import { Table } from "./Table";

export class Musics extends Table implements IMusics {
	constructor() {
		super(Tables.MUSICS, musicsConfig);
	}

	public async init(connection: Connection) {
		return await super.init(connection);
	}

	public async getMusics(page?: ITablePage, filters?: IMusicRequest) {
		return await this.selectData<IMusic, IMusicStruct, IAuthor>(page, filters, {
			innerTable: Tables.MUSICS,
			outerTable: Tables.AUTHORS,
			expressions: [
				{
					innerField: "authorId",
					outerField: "authorId",
					operator: IJoinOperators.EQUAL,
				},
			],
		});
	}

	public async addMusic(music: IMusic) {
		await this.insertData<IMusic>(music);
	}
}

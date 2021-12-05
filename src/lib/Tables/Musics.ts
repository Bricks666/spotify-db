import { PoolConnection } from "mariadb";
import {
	Tables,
	IMusics,
	IMusicRequest,
	IMusic,
	ITablePage,
	ITableJoin,
	IJoinOperators,
	IMusicJoin,
} from "./../../types/";
import { musicsConfig } from "../configs";
import { Table } from "./Table";

export class Musics extends Table implements IMusics {
	public constructor() {
		super(musicsConfig);
	}

	public async init(connection: PoolConnection | null) {
		return await super.init(connection);
	}

	public async getMusics(page?: ITablePage, filters?: IMusicRequest) {
		return await this.selectData<IMusic>(page, filters);
	}

	public async getMusicsJoin(page?: ITablePage, filters?: IMusicRequest) {
		const join: ITableJoin[] = [
			{
				innerTable: Tables.MUSICS,
				outerTable: Tables.AUTHORS,
				expressions: [
					{
						innerField: "authorId",
						operator: IJoinOperators.EQUAL,
						outerField: "authorId",
					},
				],
			},
			{
				innerTable: Tables.MUSICS,
				outerTable: Tables.ALBUMS,
				expressions: [
					{
						innerField: "albumId",
						outerField: "albumId",
						operator: IJoinOperators.EQUAL,
					},
				],
			},
		];
		return await this.selectData<IMusicJoin>(page, filters, join);
	}

	public async addMusic(music: IMusic) {
		await this.insertData<IMusic>(music);
	}
}

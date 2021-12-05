import {
	Tables,
	IMusics,
	IMusicRequest,
	IMusic,
	ITablePage,
	ITableJoin,
	JoinOperators,
	IMusicJoin,
	IMusicDeleteRequest,
	IMusicChangeRequest,
} from "./../../types/";
import { musicsConfig } from "../configs";
import { Table } from "./Table";
import { logged } from "../decorators";

export class Musics extends Table implements IMusics {
	public constructor() {
		super(musicsConfig);
	}

	@logged()
	public async getMusics(page?: ITablePage, filters?: IMusicRequest) {
		return await this.selectData<IMusic>(page, filters);
	}

	@logged()
	public async getMusicsJoin(page?: ITablePage, filters?: IMusicRequest) {
		const join: ITableJoin[] = [
			{
				innerTable: Tables.MUSICS,
				outerTable: Tables.AUTHORS,
				expressions: [
					{
						innerField: "authorId",
						operator: JoinOperators.EQUAL,
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
						operator: JoinOperators.EQUAL,
					},
				],
			},
		];
		return await this.selectData<IMusicJoin>(page, filters, join);
	}

	public async addMusic(music: IMusic) {
		await this.insertData<IMusic>(music);
	}

	public async deleteMusics(filters: IMusicDeleteRequest) {
		return await this.deleteData(filters);
	}

	public async changeMusic(musicId: number, newValues: IMusicChangeRequest) {
		return await this.updateData(newValues, { musicId });
	}
}

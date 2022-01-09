import {
	Table,
	TableJoin,
	JoinOperators,
	TableSelectRequestConfig,
	TableFilter,
} from "mariadb-table-wrapper";
import { musicsConfig } from "../../configs";
import {
	MusicChangeInfoOptions,
	MusicCreateOptions,
	MusicJoinModel,
	MusicModel,
	PartialMusicModel,
	PartialMusicToPlaylistJoinModel,
} from "../../models";
import { MusicsTable, Tables } from "./../../types/";

export class Musics extends Table<MusicModel> implements MusicsTable {
	private readonly join: TableJoin[];
	public constructor() {
		super(musicsConfig);
		this.join = [
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
	}

	public async addMusic(music: MusicCreateOptions) {
		await this.insertData(music);
	}

	public async getMusics<Response extends PartialMusicModel = MusicModel>(
		config?: TableSelectRequestConfig<MusicModel>
	) {
		return await this.selectData<Response>(config);
	}

	public async getMusicsJoin<
		Response extends PartialMusicToPlaylistJoinModel = MusicJoinModel
		/* TODO: В обертку нужно поставить ограничения на фильтр, чтобы проходили и расширяющие классы */
	>(config?: TableSelectRequestConfig<MusicModel>) {
		return await this.selectData<Response>({ ...config, join: this.join });
	}

	public async deleteMusics(filters: TableFilter<MusicModel>) {
		return await this.deleteData(filters);
	}

	public async changeMusic(musicId: number, newValues: MusicChangeInfoOptions) {
		return await this.updateData(newValues, { musicId });
	}
}

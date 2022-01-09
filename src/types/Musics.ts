import { PoolConnection } from "mariadb";
import { TableSelectRequestConfig } from "mariadb-table-wrapper";
import {
	MusicChangeInfoOptions,
	MusicCreateOptions,
	MusicJoinModel,
	MusicModel,
	PartialMusicModel,
} from "../models";

export interface MusicsTable {
	init(connection: PoolConnection | null): Promise<void>;

	addMusic(music: MusicCreateOptions): Promise<void>;

	getMusics<Response extends PartialMusicModel = MusicModel>(
		config?: TableSelectRequestConfig<MusicModel>
	): Promise<Response[]>;
	/* Может быть можно как то свести с функцией getMusics */
	getMusicsJoin<Response extends PartialMusicModel = MusicJoinModel>(
		config?: TableSelectRequestConfig<MusicModel>
	): Promise<Response[]>;

	changeMusic(
		musicId: number,
		newValues: MusicChangeInfoOptions
	): Promise<void>;
}

import { AlbumModel, AuthorModel } from ".";

export interface MusicModel {
	readonly musicId: number;
	readonly musicName: string;
	readonly authorId: number;
	readonly durationSec: number;
	readonly musicURL: URL;
	readonly musicPhoto?: URL;
	readonly albumId?: number;
}

export type PartialMusicModel = Partial<MusicModel>;

export type MusicJoinModel = MusicModel & AlbumModel & AuthorModel;
export type PartialMusicJoinModel = Partial<MusicJoinModel>;

export type MusicCreateOptions = Omit<MusicModel, "musicId">;
export type MusicChangeInfoOptions = Partial<MusicCreateOptions>;

import { URL } from "../types";

export interface AlbumModel {
	readonly albumId: number;
	readonly albumName: string;
	readonly albumPhoto?: URL;
}
export type PartialAlbumModel = Partial<AlbumModel>;

export type AlbumCreateOptions = Omit<AlbumModel, "albumId">;
export type AlbumChangeInfoOptions = Partial<AlbumCreateOptions>;

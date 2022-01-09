import { UserModel } from ".";

export interface PlaylistModel {
	readonly playlistId: number;
	readonly playlistName: string;
	readonly userId: number;
}

export type PlaylistJoinModel = PlaylistModel & UserModel;
export type PlaylistCreateOptions = Omit<PlaylistModel, "playlistId">;
export type PartialPlaylistModel = Partial<PlaylistModel>;
export type PartialPlaylistJoinModel = Partial<PlaylistJoinModel>;
export type PlaylistChangeInfoOptions = Partial<PlaylistCreateOptions>;

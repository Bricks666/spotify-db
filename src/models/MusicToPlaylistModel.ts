import { MusicJoinModel, PlaylistJoinModel } from ".";

export interface MusicToPlaylistModel {
	readonly musicId: number;
	readonly playlistId: number;
}
export type PartialMusicToPlaylistModel = Partial<MusicToPlaylistModel>;

export type MusicToPlaylistJoinModel = MusicJoinModel &
	PlaylistJoinModel &
	MusicToPlaylistModel;
export type PartialMusicToPlaylistJoinModel = Partial<MusicToPlaylistJoinModel>;

export type MusicToPlaylistCreateOptions = MusicToPlaylistModel;

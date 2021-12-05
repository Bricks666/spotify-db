import { musicsToPlaylistConfig } from "../configs";
import {
	IMusicsToPlaylists,
	IMusicToPlaylistCreateRequest,
	IMusicToPlaylist,
	ITablePage,
	IMusicToPlaylistRequest,
} from "../../types";
import { Table } from "./Table";

export class MusicsToPlaylists extends Table implements IMusicsToPlaylists {
	public constructor() {
		super(musicsToPlaylistConfig);
	}

	public async addMusicToPlaylist(
		musicToPlaylist: IMusicToPlaylistCreateRequest
	) {
		return await this.insertData(musicToPlaylist);
	}

	public async getMusicToPlaylist(
		page?: ITablePage,
		filters?: IMusicToPlaylistRequest
	) {
		return await this.selectData<IMusicToPlaylist>(page, filters);
	}

	public async deleteMusicToPlaylist(musicToPlaylist: IMusicToPlaylist) {
		return await this.deleteData(musicToPlaylist);
	}
}

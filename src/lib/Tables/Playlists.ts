import { PoolConnection } from "mariadb";
import { playlistsConfig } from "../configs";
import {
	IPlaylists,
	IPlaylistCreateRequest,
	ITablePage,
	IPlaylistRequest,
	IPlaylist,
} from "./../../types";
import { Table } from "./Table";

export class Playlists extends Table implements IPlaylists {
	public constructor() {
		super(playlistsConfig);
	}

	public async init(connection: PoolConnection | null) {
		return await super.init(connection);
	}

	public async addPlaylist(playlist: IPlaylistCreateRequest) {
		return await this.insertData<IPlaylistCreateRequest>(playlist);
	}

	public async getPlaylists(page?: ITablePage, filters?: IPlaylistRequest) {
		return await this.selectData<IPlaylist>(page, filters);
	}
}

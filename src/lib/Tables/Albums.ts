import { PoolConnection } from "mariadb";
import {
	IAlbums,
	IAlbumRequest,
	ITablePage,
	IAlbum,
	IAlbumCreateRequest,
} from "./../../types";
import { albumsConfig } from "../configs";
import { Table } from "./Table";

export class Albums extends Table implements IAlbums {
	public constructor() {
		super(albumsConfig);
	}
	public async init(connection: PoolConnection) {
		return await super.init(connection);
	}
	public async getAlbums(page?: ITablePage, filters?: IAlbumRequest) {
		return await this.selectData<IAlbum>(page, filters);
	}

	public async addAlbum(album: IAlbumCreateRequest) {
		return await this.insertData<IAlbumCreateRequest>(album);
	}
}

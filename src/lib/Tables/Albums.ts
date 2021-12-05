import {
	IAlbums,
	IAlbumRequest,
	ITablePage,
	IAlbum,
	IAlbumCreateRequest,
	IAlbumDeleteRequest,
	IAlbumChangeRequest,
} from "./../../types";
import { albumsConfig } from "../configs";
import { Table } from "./Table";
import { logged } from "../decorators";

export class Albums extends Table implements IAlbums {
	public constructor() {
		super(albumsConfig);
	}

  @logged()
	public async getAlbums(page?: ITablePage, filters?: IAlbumRequest) {
		return await this.selectData<IAlbum>(page, filters);
	}

	public async addAlbum(album: IAlbumCreateRequest) {
		return await this.insertData<IAlbumCreateRequest>(album);
	}

	public async deleteAlbum(filters: IAlbumDeleteRequest) {
		return await this.deleteData(filters);
	}

	public async changeAlbum(albumId: number, newValues: IAlbumChangeRequest) {
		return await this.updateData(newValues, { albumId });
	}
}

import {
	Table,
	TableFilter,
	TableSelectRequestConfig,
} from "mariadb-table-wrapper";
import {
	AlbumChangeInfoOptions,
	AlbumCreateOptions,
	PartialAlbumModel,
} from "./../../models/AlbumModel";
import { AlbumModel } from "../../models";
import { albumsConfig } from "../../configs";
import { AlbumsTable } from "./../../types";

export class Albums extends Table<AlbumModel> implements AlbumsTable {
	public constructor() {
		super(albumsConfig);
	}

	public async addAlbum(album: AlbumCreateOptions) {
		return await this.insertData(album);
	}

	public async getAlbums<Response extends PartialAlbumModel = AlbumModel>(
		config?: TableSelectRequestConfig<AlbumModel>
	) {
		return await this.selectData<Response>(config);
	}

	public async deleteAlbum(filters: TableFilter<AlbumModel>) {
		return await this.deleteData(filters);
	}

	public async changeAlbumInfo(
		albumId: number,
		newValues: AlbumChangeInfoOptions
	) {
		return await this.updateData(newValues, { albumId });
	}
}

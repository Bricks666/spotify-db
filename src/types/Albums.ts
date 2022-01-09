import { PoolConnection } from "mariadb";
import { TableFilter, TableSelectRequestConfig } from "mariadb-table-wrapper";
import {
	AlbumChangeInfoOptions,
	AlbumCreateOptions,
	AlbumModel,
	PartialAlbumModel,
} from "src/models";

export interface AlbumsTable {
	init(connection: PoolConnection): Promise<void>;

	addAlbum(album: AlbumCreateOptions): Promise<void>;

	getAlbums<Response extends PartialAlbumModel = AlbumModel>(
		config?: TableSelectRequestConfig<AlbumModel>
	): Promise<Response[]>;

	deleteAlbum(filters: TableFilter<AlbumModel>): Promise<void>;

	changeAlbumInfo(
		albumId: number,
		newValues: AlbumChangeInfoOptions
	): Promise<void>;
}

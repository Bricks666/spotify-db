import { PoolConnection } from "mariadb";
import { ITablePage } from ".";

export interface IUserRequest {
	usersId?: number[] | number;
	login?: string[] | string;
	password?: string[] | string;
}

export interface IUserCreateRequest {
	login: string;
	password: string;
}
export interface IUser extends IUserCreateRequest {
	usersId: number;
}

export interface IUsers {
	init(connection: PoolConnection): Promise<void>;
	addUser(user: IUserCreateRequest): Promise<void>;
	getUsers(): Promise<IUser[]>;
	getUsers(page: ITablePage): Promise<IUser[]>;
	getUsers(page: ITablePage, filters: IUserRequest): Promise<IUser[]>;
	login(login: string, password: string): Promise<boolean>;
}

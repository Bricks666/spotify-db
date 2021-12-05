import { PoolConnection } from "mariadb";
import { ITablePage } from ".";
import { Request } from "./common";

export interface IUser {
	userId: number;
	login: string;
	password: string;
}

export interface IUserRequest extends Request<Omit<IUser, "password">> {}

export interface IUserCreateRequest extends Omit<IUser, "userId"> {}

export interface IUserLoginRequest extends IUserCreateRequest {}

export interface IUserChangeLoginRequest extends Omit<IUser, "password"> {}

export interface IUsers {
	init(connection: PoolConnection | null): Promise<void>;
	addUser(user: IUserCreateRequest): Promise<void>;
	getUsers(): Promise<IUser[]>;
	getUsers(page?: ITablePage): Promise<IUser[]>;
	getUsers(page?: ITablePage, filters?: IUserRequest): Promise<IUser[]>;
	login(loginParams: IUserLoginRequest): Promise<boolean>;
	changeLogin(changeLoginParams: IUserChangeLoginRequest): Promise<void>;
}

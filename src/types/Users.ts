import { PoolConnection } from "mariadb";
import { ITablePage, Request } from ".";

export interface IUsers {
	init(connection: PoolConnection | null): Promise<void>;

	addUser(user: IUserCreateRequest): Promise<void>;

	getUsers(): Promise<IUser[]>;
	getUsers(page?: ITablePage): Promise<IUser[]>;
	getUsers(page?: ITablePage, filters?: IUserRequest): Promise<IUser[]>;

	deleteUsers(filters: IUserDeleteRequest): Promise<void>;

	login(loginParams: IUserLoginRequest): Promise<boolean>;

	changeUserData(userId: number, newValues: IUserChangeRequest): Promise<void>;
}

export interface IUser {
	userId: number;
	login: string;
	password: string;
}

export interface IUserRequest extends Request<Omit<IUser, "password">> {}

export interface IUserCreateRequest extends Omit<IUser, "userId"> {}

export interface IUserLoginRequest extends Omit<IUser, "userId"> {}

export interface IUserChangeRequest extends Partial<Omit<IUser, "userId">> {}

export interface IUserDeleteRequest
	extends Required<Pick<IUserRequest, "userId">> {}

import { Connection } from "mariadb";

export interface IUser {
    id: number | null;
    login: string;
    password: string;
}

export interface IUserRequest {
    id?: number[] | number;
    login?: string[] | string;
    password?: string[] | string;
}

export interface IUserCreateRequest {
    login: string;
    password: string;
}

export interface IUsers {
    init(connection: Connection): Promise<void>;
    addUser(user: IUserCreateRequest): Promise<void>;
    getUsers(): Promise<IUser[]>;
    getUsers(filters: IUserRequest): Promise<IUser[]>;
    login(login: string, password: string): Promise<boolean>;
}

import { Connection } from "mariadb";
import { Table } from "./Table";
import {
    IUsers,
    IUser,
    Tables,
    IUserRequest,
    IUserCreateRequest,
} from "../../types";
import { usersConfig } from "./configs";

export class Users extends Table implements IUsers {
    public constructor() {
        super(Tables.USERS);
    }

    public async init(connection: Connection) {
        return await super.init(connection, usersConfig);
    }

    public async addUser(user: IUserCreateRequest): Promise<void> {
        console.log(user);
        await super.insertData<IUserCreateRequest>(user);
    }

    public async getUsers(filters?: IUserRequest): Promise<IUser[]> {
        if (typeof filters !== "undefined") {
            return await super.selectData<IUser>(filters);
        }
        return await super.selectData<IUser>();
    }

    public async getUser(id: number): Promise<IUser> {
        return (await super.selectData<IUser>({ id }))[0];
    }
    public async login(login: string, password: string): Promise<boolean> {
        console.log(login, password);
        return true;
    }
}

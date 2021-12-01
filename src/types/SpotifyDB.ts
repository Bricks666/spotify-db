import { IUsers, IAuthors } from ".";

export interface ISpotifyDB {
    users: IUsers;
    authors: IAuthors;
    disconnect(): void;
    connect(): Promise<void>;
    changeUser(user: string, password: string): Promise<void>;
}

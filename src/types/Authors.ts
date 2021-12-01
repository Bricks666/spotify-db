import { Connection } from "mariadb";
export interface IAuthor {
    id: number;
    name: string;
}

export interface IAuthorRequest {
    id?: number | number[];
    name?: string | string[];
}
export interface IAuthorCreateRequest {
    name: string;
}

export interface IAuthors {
    init(connection: Connection): Promise<void>;
    getAuthors(): Promise<IAuthor[]>;
    getAuthors(filters: IAuthorRequest): Promise<IAuthor[]>;
    addAuthor(author: IAuthorCreateRequest): Promise<void>;
}

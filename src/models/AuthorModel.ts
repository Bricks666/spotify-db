export interface AuthorModel {
	readonly authorId: number;
	readonly authorName: string;
}

export type PartialAuthorModel = Partial<AuthorModel>;

export type AuthorCreateOptions = Omit<AuthorModel, "authorId">;

export type AuthorChangeInfoOptions = Partial<AuthorCreateOptions>;

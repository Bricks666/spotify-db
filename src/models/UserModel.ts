export interface UserModel {
	readonly userId: number;
	readonly login: string;
	readonly password: string;
}

export type PartialUserModel = Partial<UserModel>;

export type UserCreateOptions = Omit<UserModel, "userId">;

export type UserChangeInfoOptions = Partial<UserCreateOptions>;

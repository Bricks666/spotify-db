export type Request<T> = {
	[P in keyof T]?: T[P] | T[P][];
};

export type URL = string;
export type SQL = string;

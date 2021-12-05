export type Request<T> = {
	[P in keyof T]?: T[P] | T[P][];
};

export type URL = string;

export type SQL = string;

export type RequestValues = number | string | Array<number | string>;

export type FromRequest<T> = {
	[P in keyof T]: Exclude<T[P], any[]>;
};

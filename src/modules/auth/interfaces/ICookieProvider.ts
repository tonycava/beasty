
export type ICookieProvider = {
	remove: (key: string, cookieOptions: any) => void;
	get: (key: string) => string | undefined;
};

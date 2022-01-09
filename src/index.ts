import { SpotifyDB } from "./lib";

const bd = new SpotifyDB({ user: "root", password: "Root123" });

const start = async () => {
	try {
		await bd.connect();
		await bd.users.addUser({ login: "asasdasdd", password: "asd" });
		const users = await bd.users.getUsers({
			filters: {
				login: ["asd"],
			},
			excludes: ["password"],
		});
		console.log(users);
	} catch (e) {
		console.log(e);
	}
};

start();

export { SpotifyDB };

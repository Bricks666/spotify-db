import { SpotifyDB } from "./lib";

const spotifyDb = new SpotifyDB({ user: "root", password: "Root123" });

console.log(spotifyDb);

const foo = async () => {
	try {
		await spotifyDb.connect();
	} catch (e) {
		console.log(e);
	} finally {
		spotifyDb.disconnect();
	}
};

foo();

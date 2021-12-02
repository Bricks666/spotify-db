import { SpotifyDB } from "./lib/";
const start = async () => {
	const spotifyDb = new SpotifyDB({
		user: "root",
		password: "Root123",
		checkDuplicate: false,
	});

	try {
		await spotifyDb.connect();
		const users = await spotifyDb.users.getUsers({ page: 1, countOnPage: 10 });
		console.log(users);
		await spotifyDb.authors.addAuthor({ name: "asdasd" });
		for (let i = 0; i < 500; i++) {
			spotifyDb.musics.addMusic({
				name: "I'm still standing",
				authorId: 1,
				durationSec: 120,
			});
		}

		const music = await spotifyDb.musics.getMusics({
			page: 1,
			countOnPage: 150,
		});
		console.log(music);
	} catch (e: any) {
		console.log(e);
	} finally {
		spotifyDb.disconnect();
	}
};

start();

import { Tables } from "./types/Table";
import { SpotifyDB } from "./lib/SpotifyDB";
const start = async () => {
    const spotifyDb = new SpotifyDB({
        user: "root",
        password: "Root123",
    });

    const { users: usersTable, authors: authorsTable } = spotifyDb;

    try {
        await spotifyDb.connect();
        console.log(spotifyDb);
        const user = await usersTable.getUsers({ id: 1 });
        console.log(user);
        const users = await usersTable.getUsers({ id: [1, 2, 4, 5, 6, 7] });
        console.log(users);
        users.forEach((user) => console.log(user.id));
        await authorsTable.addAuthor({ name: "Katy Perry" });
        const authors = await authorsTable.getAuthors({ id: [1, 2, 3] });
        console.log(authors[0].id, authors[0].name);
        console.log(Tables["USERS"]);
    } catch (e: any) {
        console.log(e);
    } finally {
        spotifyDb.disconnect();
    }
};

start();

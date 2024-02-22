import { saveGame, getGameById, getAllGames, getGamesByPlayer } from '../persistence/mongodb.js';

test('saveGame should save a game in the database', async () => {
    const game = { players: [{ name: 'player1', score: [] }, { name: 'player2', score: [] }], rounds: [] };
    await saveGame(game);
    const savedGame = await getGameById(game._id); // Assuming _id is generated during save
    expect(savedGame).toEqual(game);
});

test('getGameById should retrieve a game by its ID', async () => {
    //get random number but not a number already in the database
    const gameId = Math.floor(Math.random() * 1000000);
    const game = { _id: gameId, players: [{ name: 'player1', score: [] }, { name: 'player2', score: [] }], rounds: [] };
    await saveGame(game);
    const retrievedGame = await getGameById(gameId);
    expect(retrievedGame).toEqual(game);
});

test('getAllGames should retrieve all games from the database', async () => {
    const games = [
        { players: [{ name: 'player1', score: [] }, { name: 'player2', score: [] }], rounds: [] },
        { players: [{ name: 'player3', score: [] }, { name: 'player4', score: [] }], rounds: [] }
    ];
    for (const game of games) {
        await saveGame(game);
    }
    const retrievedGames = await getAllGames();
    expect(retrievedGames).toEqual(expect.arrayContaining(games));
});

test('getGamesByPlayer should retrieve games by player name', async () => {
    const playerName = 'player1';
    const games = [
        { players: [{ name: playerName, score: [] }, { name: 'player2', score: [] }], rounds: [] },
        { players: [{ name: 'player3', score: [] }, { name: 'player4', score: [] }], rounds: [] }
    ];
    for (const game of games) {
        await saveGame(game);
    }
    const retrievedGames = await getGamesByPlayer(playerName);
    expect(retrievedGames.every(game => game.players.some(player => player.name === playerName))).toBe(true);
});

import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://p1ame:dev@cluster0.rv3srzm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const dbName = 'Cluster0';

export async function connectToDatabase() {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    return client.db(dbName);
}

export async function saveGame(game) {
    const db = await connectToDatabase();
    const gamesCollection = db.collection('games');
    await gamesCollection.insertOne(game);
}

export async function getGameById(gameId) {
    const db = await connectToDatabase();
    const gamesCollection = db.collection('games');
    return gamesCollection.findOne({ _id: gameId });
}

export async function getAllGames() {
    const db = await connectToDatabase();
    const gamesCollection = db.collection('games');
    return gamesCollection.find({}).toArray();
}

export async function getGamesByPlayer(playerName) {
    const db = await connectToDatabase();
    const gamesCollection = db.collection('games');
    return gamesCollection.find({ $or: [{ 'players.0.name': playerName }, { 'players.1.name': playerName }] }).toArray();
}
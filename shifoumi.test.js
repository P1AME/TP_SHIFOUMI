import { createPlayer, createGame, playRound, getWinner, getGameWinner, playGame } from './shifoumi.js';

const players = [];

test('createPlayer should create a player object', () => {
    const player = createPlayer('p1ame');
    expect(player).toEqual({ name: 'p1ame', score: [] });
});

const games = [];
test('createGame should create a game object', () => {
    const player1 = createPlayer('p1ame');
    const player2 = createPlayer('player2');
    const game = createGame(player1, player2);
    expect(game).toEqual({ players: [player1, player2], rounds: [] });
});

test('playRound should create a round object', () => {
    const player1 = createPlayer('p1ame');
    const player2 = createPlayer('player2');
    const game = createGame(player1, player2);
    const round = playRound(game, 'pierre', 'ciseaux');
    expect(round).toEqual({ player1, player2, sign1: 'pierre', sign2: 'ciseaux' });
}); 

test('playRound should add the round to the game rounds array', () => {
    const player1 = createPlayer('p1ame');
    const player2 = createPlayer('player2');
    const game = createGame(player1, player2);
    const round = playRound(game, 'pierre', 'ciseaux');
    expect(game.rounds).toEqual([round]);
});

test('playRound should return the round object', () => {
    const player1 = createPlayer('p1ame');
    const player2 = createPlayer('player2');
    const game = createGame(player1, player2);
    const round = playRound(game, 'pierre', 'ciseaux');
    expect(round).toEqual(game.rounds[0]);
});

test('getWinner should return null if both signs are the same', () => {
    const round = { sign1: 'pierre', sign2: 'pierre' };
    expect(getWinner(round)).toBeNull();
});

test('getWinner should return the player1 if player1 wins', () => {
    const player1 = createPlayer('p1ame');
    const player2 = createPlayer('player2');
    const round = { player1, player2, sign1: 'pierre', sign2: 'ciseaux' };
    expect(getWinner(round)).toBe(player1);
});

test('getWinner should return the player2 if player2 wins', () => {
    const player1 = createPlayer('p1ame');
    const player2 = createPlayer('player2');
    const round = { player1, player2, sign1: 'ciseaux', sign2: 'pierre' };
    expect(getWinner(round)).toBe(player2);
});

test('getGameWinner should return null if the game is a tie', () => {
    const player1 = createPlayer('player1');
    const player2 = createPlayer('player2');
    const game = createGame(player1, player2);
    playRound(game, 'pierre', 'ciseaux');
    playRound(game, 'ciseaux', 'pierre');
    expect(getGameWinner(game)).toBeNull();
});

test('getGameWinner should return the player1 if player1 wins', () => {
    const player1 = createPlayer('player1');
    const player2 = createPlayer('player2');
    const game = createGame(player1, player2);
    playRound(game, 'pierre', 'ciseaux');
    playRound(game, 'pierre', 'ciseaux');
    expect(getGameWinner(game)).toBe(player1);
});
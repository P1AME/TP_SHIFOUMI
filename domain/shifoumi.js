const players = [];
const games = [];
const signs = ['pierre', 'feuille', 'ciseaux'];

export function createPlayer(name) {
    const player = {
        name,
        score: [],
    };
    players.push(player);
    return player;
}

export function createGame(player1, player2) {
    const game = {
        players: [player1, player2],
        rounds: [],
    };
    games.push(game);
    return game;
}

export function playRound(game, sign1, sign2) {
    const round = {
        player1: game.players[0],
        player2: game.players[1],
        sign1,
        sign2,
    };
    game.rounds.push(round);
    return round;
}

export function getWinner(round) {
    if (round.sign1 === round.sign2) {
        return null;
    }
    if (
        (round.sign1 === 'pierre' && round.sign2 === 'ciseaux') ||
        (round.sign1 === 'ciseaux' && round.sign2 === 'feuille') ||
        (round.sign1 === 'feuille' && round.sign2 === 'pierre')
    ) {
        return round.player1;
    }
    return round.player2;
}

export function getGameWinner(game) {
    const player1 = game.players[0];
    const player2 = game.players[1];
    const player1Score = game.rounds.filter((round) => getWinner(round) === player1).length;
    const player2Score = game.rounds.filter((round) => getWinner(round) === player2).length;
    if (player1Score === player2Score) {
        return null;
    }
    if (player1Score > player2Score) {
        return player1;
    }
    return player2;
}

export function playGame(player1, player2) {
    const game = createGame(player1, player2);
    for (let i = 0; i < 3; i++) {
        const sign1 = signs[Math.floor(Math.random() * signs.length)];
        const sign2 = signs[Math.floor(Math.random() * signs.length)];
        const round = playRound(game, sign1, sign2);
        const winner = getWinner(round);
        const loser = winner === round.player1 ? round.player2 : round.player1;
        if (winner) {
            winner.score[`Round ${i}`] += 1;
            loser.score[`Round ${i}`] += 0;
        } else {
            player1.score[`Round ${i}`] += 0;
            player2.score[`Round ${i}`] += 0;
        }
    }
    return getGameWinner(game);
}

const player1 = createPlayer('P1AME');
const player2 = createPlayer('P2AME');
playGame(player1, player2);

for (let i = 0; i < players.length; i++) {
    console.table(games[i]);
    console.table(players[i]);
}

console.log('Winner:', getGameWinner(games[0]));
const express = require('express');          // Express: Webserver
const http = require('http');                // HTTP-Server erstellen
const { Server } = require('socket.io');     // Socket.IO: Realtime Kommunikation

const app = express();
const server = http.createServer(app);       // Verbinde HTTP mit Express
const io = new Server(server);               // Socket.IO auf dem Server

app.use(express.static('public'));           // Static Files wie index.html

const lobbies = {}; // globale Variable für alle Lobbys

function genDeck() {

    // Beispielhafte Emoji-Liste (mindestens 57 Emojis)
    const emojis = [
        // Tiere & Natur
        "🐶", "🐱", "🐭", "🐸", "🐢", "🐝", "🐙", "🌵", "🌈", "🌻",
        // Gesichter & Emotionen
        "😀", "😎", "😡", "😱", "😴", "🤔", "🤪", "🥶",
        // Essen & Trinken
        "🍎", "🍌", "🍕", "🍩", "🍔", "🍦", "🍇", "🥕",
        // Objekte & Symbole
        "🎈", "🎁", "🕶️", "⏰", "💡", "🔒", "🔑", "📎", "📌", "🧲",
        // Sport & Freizeit
        "⚽", "🏀", "🏓", "🎲", "🎯", "🧩",
        // Transport & Orte
        "🚗", "🚀", "✈️", "🚲", "🚦", "🗻",
        // Formen & Zeichen
        "❤️", "⭐", "🔺", "🔵",
        // ➕ Ergänzte Symbole
        "🪐", "🧃", "🪁", "🧸", "🪄"
    ];

    // Kartenliste
    const cards = [
        [0, 1, 2, 3, 4, 5, 6, 7],
        [0, 8, 9, 10, 11, 12, 13, 14],
        [0, 15, 16, 17, 18, 19, 20, 21],
        [0, 22, 23, 24, 25, 26, 27, 28],
        [0, 29, 30, 31, 32, 33, 34, 35],
        [0, 36, 37, 38, 39, 40, 41, 42],
        [0, 43, 44, 45, 46, 47, 48, 49],
        [0, 50, 51, 52, 53, 54, 55, 56],
        [1, 8, 15, 22, 29, 36, 43, 50],
        [1, 9, 16, 23, 30, 37, 44, 51],
        [1, 10, 17, 24, 31, 38, 45, 52],
        [1, 11, 18, 25, 32, 39, 46, 53],
        [1, 12, 19, 26, 33, 40, 47, 54],
        [1, 13, 20, 27, 34, 41, 48, 55],
        [1, 14, 21, 28, 35, 42, 49, 56],
        [2, 8, 16, 24, 32, 40, 48, 56],
        [2, 9, 17, 25, 33, 41, 49, 50],
        [2, 10, 18, 26, 34, 42, 43, 51],
        [2, 11, 19, 27, 35, 36, 44, 52],
        [2, 12, 20, 28, 29, 37, 45, 53],
        [2, 13, 21, 22, 30, 38, 46, 54],
        [2, 14, 15, 23, 31, 39, 47, 55],
        [3, 8, 17, 26, 35, 37, 46, 55],
        [3, 9, 18, 27, 29, 38, 47, 56],
        [3, 10, 19, 28, 30, 39, 48, 50],
        [3, 11, 20, 22, 31, 40, 49, 51],
        [3, 12, 21, 23, 32, 41, 43, 52],
        [3, 13, 15, 24, 33, 42, 44, 53],
        [3, 14, 16, 25, 34, 36, 45, 54],
        [4, 8, 18, 28, 31, 41, 44, 54],
        [4, 9, 19, 22, 32, 42, 45, 55],
        [4, 10, 20, 23, 33, 36, 46, 56],
        [4, 11, 21, 24, 34, 37, 47, 50],
        [4, 12, 15, 25, 35, 38, 48, 51],
        [4, 13, 16, 26, 29, 39, 49, 52],
        [4, 14, 17, 27, 30, 40, 43, 53],
        [5, 8, 19, 23, 34, 38, 49, 53],
        [5, 9, 20, 24, 35, 39, 43, 54],
        [5, 10, 21, 25, 29, 40, 44, 55],
        [5, 11, 15, 26, 30, 41, 45, 56],
        [5, 12, 16, 27, 31, 42, 46, 50],
        [5, 13, 17, 28, 32, 36, 47, 51],
        [5, 14, 18, 22, 33, 37, 48, 52],
        [6, 8, 20, 25, 30, 42, 47, 52],
        [6, 9, 21, 26, 31, 36, 48, 53],
        [6, 10, 15, 27, 32, 37, 49, 54],
        [6, 11, 16, 28, 33, 38, 43, 55],
        [6, 12, 17, 22, 34, 39, 44, 56],
        [6, 13, 18, 23, 35, 40, 45, 50],
        [6, 14, 19, 24, 29, 41, 46, 51],
        [7, 8, 21, 27, 33, 39, 45, 51],
        [7, 9, 15, 28, 34, 40, 46, 52],
        [7, 10, 16, 22, 35, 41, 47, 53],
        [7, 11, 17, 23, 29, 42, 48, 54],
        [7, 12, 18, 24, 30, 36, 49, 55],
        [7, 13, 19, 25, 31, 37, 43, 56],
        [7, 14, 20, 26, 32, 38, 44, 50]
    ];



    // Emojis den Karten zuweisen
    const emojiCards = cards.map(card => card.map(index => emojis[index]));
    // Karten anzeigen
    return emojiCards;

}

io.on('connection', (socket) => {
    console.log('Spieler verbunden:', socket.id);
    socket.on("createLobby", ({ lobbyId, maxPlayers }) => {
        if (lobbies[lobbyId]) {
            socket.emit("lobbyExists");
        } else {
            lobbies[lobbyId] = {
                players: [socket.id],
                maxPlayers,
                gamestartet: false,
                cardDeck: genDeck(),
                maincard: "",
                p1points: 0,
                p2points: 0,
                p1: "",
                p2: ""
            };
            socket.join(lobbyId);
            socket.emit("lobbyCreated", { lobbyId });
            console.log(`Lobby ${lobbyId} erstellt von ${socket.id}`);
        }
    });
    function endgame(lobbyId) {
         const lobby = lobbies[lobbyId];
         let winner
        gamestartet = false;
        if(lobby.p1points < lobby.p2points){
            winner = "p2"
        }else if(lobby.p2points < lobby.p1points){
            winner = "p1"
        }else{
            winner = "patt"
        }
        io.to(lobbyId).emit("endgame", {winner, p1points: lobby.p1points, p2points: lobby.p2points})

    }
    socket.on("getothernameendgame", ({ lobbyId }) => {
        socket.to(lobbyId).emit("getplayernameendgame");
    })
    socket.on("giveothernameendgame", ({ lobbyId, othername }) => {
        socket.to(lobbyId).emit("saveothernameendgame", { othername });
    })
    socket.on("startGame", ({ lobbyId }) => {
        const lobby = lobbies[lobbyId];
        if (lobby.gamestartet == false) {
            if (lobby.cardDeck.length === 0) {
                endgame(lobbyId)
            } else {
                const rndCardIndex = Math.floor(Math.random() * lobby.cardDeck.length)
                const rndCard = lobby.cardDeck[rndCardIndex];
                lobby.cardDeck.splice(rndCard, 1)
                io.to(lobbyId).emit("gameStardet", { mainCard: rndCard });
                console.log(lobby.cardDeck)
                lobby.gamestartet = true;
                lobby.mainCard = rndCard;
                console.log(lobby.mainCard)
            }
        }

    })
    socket.on("getPlayercard", ({ lobbyId }) => {
        const lobby = lobbies[lobbyId];
        if (lobby.p1 == "") {
            socket.emit("regSelf", { player: "p1" })
            lobby.p1 = socket.id;
        } else if (lobby.p2 == "") {
            socket.emit("regSelf", { player: "p2" })
            lobby.p2 = socket.id;
        }
        if (lobby.gamestartet == true) {
            if (lobby.cardDeck.length === 0) {
                endgame(lobbyId)
            } else {
                const rndCardIndex = Math.floor(Math.random() * lobby.cardDeck.length)
                const rndCard = lobby.cardDeck[rndCardIndex];
                lobby.cardDeck.splice(rndCard, 1)
                socket.emit("newPlayerCard", { playerCard: rndCard });
            }
        }
    })
    function giveNewMainCard(lobbyId) {
        const lobby = lobbies[lobbyId];
        if (lobby.gamestartet == true) {
            if (lobby.cardDeck.length === 0) {
                endgame(lobbyId)
            } else {
                const rndCardIndex = Math.floor(Math.random() * lobby.cardDeck.length)
                const rndCard = lobby.cardDeck[rndCardIndex];
                lobby.cardDeck.splice(rndCard, 1)
                lobby.mainCard = rndCard;
                io.to(lobbyId).emit("newMainCard", { mainCard: rndCard });
            }
        }
    }
    socket.on("guess", ({ lobbyId, ico, playerNr }) => {
        const lobby = lobbies[lobbyId];
        mainCard = lobby.mainCard
        if (mainCard.includes(ico)) {
            console.log("True")
            if (playerNr = "p1") {
                lobby.p1points += 1
                console.log("Player 1: " + lobby.p1points + " Player 2: " + lobby.p2points)
                socket.emit("mainToPlayerCard")
                giveNewMainCard(lobbyId)
            } else {
                lobby.p1points += 1
                console.log("Player 1: " + lobby.p1points + " Player 2: " + lobby.p2points)
                socket.emit("mainToPlayerCard")
                giveNewMainCard(lobbyId)
            }
        } else {
            if (playerNr = "p1") {
                lobby.p1points -= 1
                console.log("Player 1: " + lobby.p1points + " Player 2: " + lobby.p2points)
            } else {
                lobby.p1points -= 1
                console.log("Player 1: " + lobby.p1points + " Player 2: " + lobby.p2points)

            }
        }

    })
    socket.on("joinLobby", ({ lobbyId, playerName }) => {
        const lobby = lobbies[lobbyId];
        if (!lobby) {
            socket.emit("lobbyNotFound");
            return;
        }
        if (lobby.players.length >= lobby.maxPlayers) {
            socket.emit("lobbyFull");
            return;
        }

        lobby.players.push(socket.id);
        socket.join(lobbyId);
        io.to(lobbyId).emit("playerJoined", { playerId: playerName });
        socket.to(lobbyId).emit("getname");
        console.log(`Spieler ${playerName} ist Lobby ${lobbyId} beigetreten.`);
    });
    socket.on("nametoothers", ({ playerName, lobbyId }) => {
        io.to(lobbyId).emit("displayp1", { p1name: playerName })
        console.log(`Send name from ${playerName} to Others in Lobby ${lobbyId}`)
    })
    socket.on("disconnect", () => {
        console.log("Spieler getrennt:", socket.id);
        for (const [lobbyId, lobby] of Object.entries(lobbies)) {
            const index = lobby.players.indexOf(socket.id);
            if (index !== -1) {
                lobby.players.splice(index, 1);
                io.to(lobbyId).emit("playerLeft", { playerId: socket.id });

                if (lobby.players.length === 0) {
                    delete lobbies[lobbyId];
                    console.log(`Lobby ${lobbyId} gelöscht.`);
                }
                break;
            }
        }
    });

});



const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
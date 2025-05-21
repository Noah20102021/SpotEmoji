console.log("Client geladen!");
let playerName;
const socket = io(); // Verbindung zum Server herstellen
var lobbyId;
var emojis = [
  '😄', '😃', '😀', '😊', '😉', '😍', '😘', '😚', '😗', '😙', '😜', '😝', '😛', '😳', '😁', '😔', '😌', '😒', '😞', '😣', '😢', '😂', '😭', '😪', '😥', '😰', '😅', '😓', '😩', '😫', '😨', '😱', '😠', '😡', '😤', '😖', '😆', '😋', '😷', '😎', '😴', '😵', '😲', '😟', '😦', '😧', '😈', '👿', '😮', '😬', '😐', '😕', '😯', '😶', '😇', '😏', '😑', '👲', '👳', '👮', '👷', '💂', '👶', '👦', '👧', '👨', '👩', '👴', '👵', '👱', '👼', '👸', '😺', '😸', '😻', '😽', '😼', '🙀', '😿', '😹', '😾', '👹', '👺', '🙈', '🙉', '🙊', '💀', '👽', '💩', '🔥', '✨', '🌟', '💫', '💥', '💢', '💦', '💧', '💤', '💨', '👂', '👀', '👃', '👅', '👄', '👍', '👎', '👌', '👊', '✊', '✌', '👋', '✋', '👐', '👆', '👇', '👉', '👈', '🙌', '🙏', '☝', '👏', '💪', '🚶', '🏃', '💃', '👫', '👪', '👬', '👭', '💏', '💑', '👯', '🙆', '🙅', '💁', '🙋', '💆', '💇', '💅', '👰', '🙎', '🙍', '🙇', '🎩', '👑', '👒', '👟', '👞', '👡', '👠', '👢', '👕', '👔', '👚', '👗', '🎽', '👖', '👘', '👙', '💼', '👜', '👝', '👛', '👓', '🎀', '🌂', '💄', '💛', '💙', '💜', '💚', '❤', '💔', '💗', '💓', '💕', '💖', '💞', '💘', '💌', '💋', '💍', '💎', '👤', '👥', '💬', '👣', '💭', '🐶', '🐺', '🐱', '🐭', '🐹', '🐰', '🐸', '🐯', '🐨', '🐻', '🐷', '🐽', '🐮', '🐗', '🐵', '🐒', '🐴', '🐑', '🐘', '🐼', '🐧', '🐦', '🐤', '🐥', '🐣', '🐔', '🐍', '🐢', '🐛', '🐝', '🐜', '🐞', '🐌', '🐙', '🐚', '🐠', '🐟', '🐬', '🐳', '🐋', '🐄', '🐏', '🐀', '🐃', '🐅', '🐇', '🐉', '🐎', '🐐', '🐓', '🐕', '🐖', '🐁', '🐂', '🐲', '🐡', '🐊', '🐫', '🐪', '🐆', '🐈', '🐩', '🐾', '💐', '🌸', '🌷', '🍀', '🌹', '🌻', '🌺', '🍁', '🍃', '🍂', '🌿', '🌾', '🍄', '🌵', '🌴', '🌲', '🌳', '🌰', '🌱', '🌼', '🌐', '🌞', '🌝', '🌚', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌜', '🌛', '🌙', '🌍', '🌎', '🌏', '🌋', '🌌', '🌠', '⭐', '☀', '⛅', '☁', '⚡', '☔', '❄', '⛄', '🌀', '🌁', '🌈', '🌊', '🎍', '💝', '🎎', '🎒', '🎓', '🎏', '🎆', '🎇', '🎐', '🎑', '🎃', '👻', '🎅', '🎄', '🎁', '🎋', '🎉', '🎊', '🎈', '🎌', '🔮', '🎥', '📷', '📹', '📼', '💿', '📀', '💽', '💾', '💻', '📱', '☎', '📞', '📟', '📠', '📡', '📺', '📻', '🔊', '🔉', '🔈', '🔇', '🔔', '🔕', '📢', '📣', '⏳', '⌛', '⏰', '⌚', '🔓', '🔒', '🔏', '🔐', '🔑', '🔎', '💡', '🔦', '🔆', '🔅', '🔌', '🔋', '🔍', '🛁', '🛀', '🚿', '🚽', '🔧', '🔩', '🔨', '🚪', '🚬', '💣', '🔫', '🔪', '💊', '💉', '💰', '💴', '💵', '💷', '💶', '💳', '💸', '📲', '📧', '📥', '📤', '✉', '📩', '📨', '📯', '📫', '📪', '📬', '📭', '📮', '📦', '📝', '📄', '📃', '📑', '📊', '📈', '📉', '📜', '📋', '📅', '📆', '📇', '📁', '📂', '✂', '📌', '📎', '✒', '✏', '📏', '📐', '📕', '📗', '📘', '📙', '📓', '📔', '📒', '📚', '📖', '🔖', '📛', '🔬', '🔭', '📰', '🎨', '🎬', '🎤', '🎧', '🎼', '🎵', '🎶', '🎹', '🎻', '🎺', '🎷', '🎸', '👾', '🎮', '🃏', '🎴', '🀄', '🎲', '🎯', '🏈', '🏀', '⚽', '⚾', '🎾', '🎱', '🏉', '🎳', '⛳', '🚵', '🚴', '🏁', '🏇', '🏆', '🎿', '🏂', '🏊', '🏄', '🎣', '☕', '🍵', '🍶', '🍼', '🍺', '🍻', '🍸', '🍹', '🍷', '🍴', '🍕', '🍔', '🍟', '🍗', '🍖', '🍝', '🍛', '🍤', '🍱', '🍣', '🍥', '🍙', '🍘', '🍚', '🍜', '🍲', '🍢', '🍡', '🍳', '🍞', '🍩', '🍮', '🍦', '🍨', '🍧', '🎂', '🍰', '🍪', '🍫', '🍬', '🍭', '🍯', '🍎', '🍏', '🍊', '🍋', '🍒', '🍇', '🍉', '🍓', '🍑', '🍈', '🍌', '🍐', '🍍', '🍠', '🍆', '🍅', '🌽', '🏠', '🏡', '🏫', '🏢', '🏣', '🏥', '🏦', '🏪', '🏩', '🏨', '💒', '⛪', '🏬', '🏤', '🌇', '🌆', '🏯', '🏰', '⛺', '🏭', '🗼', '🗾', '🗻', '🌄', '🌅', '🌃', '🗽', '🌉', '🎠', '🎡', '⛲', '🎢', '🚢', '⛵', '🚤', '🚣', '⚓', '🚀', '✈', '💺', '🚁', '🚂', '🚊', '🚉', '🚞', '🚆', '🚄', '🚅', '🚈', '🚇', '🚝', '🚋', '🚃', '🚎', '🚌', '🚍', '🚙', '🚘', '🚗', '🚕', '🚖', '🚛', '🚚', '🚨', '🚓', '🚔', '🚒', '🚑', '🚐', '🚲', '🚡', '🚟', '🚠', '🚜', '💈', '🚏', '🎫', '🚦', '🚥', '⚠', '🚧', '🔰', '⛽', '🏮', '🎰', '♨', '🗿', '🎪', '🎭', '📍', '🚩', '⬆', '⬇', '⬅', '➡', '🔠', '🔡', '🔤', '↗', '↖', '↘', '↙', '↔', '↕', '🔄', '◀', '▶', '🔼', '🔽', '↩', '↪', 'ℹ', '⏪', '⏩', '⏫', '⏬', '⤵', '⤴', '🆗', '🔀', '🔁', '🔂', '🆕', '🆙', '🆒', '🆓', '🆖', '📶', '🎦', '🈁', '🈯', '🈳', '🈵', '🈴', '🈲', '🉐', '🈹', '🈺', '🈶', '🈚', '🚻', '🚹', '🚺', '🚼', '🚾', '🚰', '🚮', '🅿', '♿', '🚭', '🈷', '🈸', '🈂', 'Ⓜ', '🛂', '🛄', '🛅', '🛃', '🉑', '㊙', '㊗', '🆑', '🆘', '🆔', '🚫', '🔞', '📵', '🚯', '🚱', '🚳', '🚷', '🚸', '⛔', '✳', '❇', '❎', '✅', '✴', '💟', '🆚', '📳', '📴', '🅰', '🅱', '🆎', '🅾', '💠', '➿', '♻', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '⛎', '🔯', '🏧', '💹', '💲', '💱', '©', '®', '™', '〽', '〰', '🔝', '🔚', '🔙', '🔛', '🔜', '❌', '⭕', '❗', '❓', '❕', '❔', '🔃', '🕛', '🕧', '🕐', '🕜', '🕑', '🕝', '🕒', '🕞', '🕓', '🕟', '🕔', '🕠', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '✖', '➕', '➖', '➗', '♠', '♥', '♣', '♦', '💮', '💯', '✔', '☑', '🔘', '🔗', '➰', '🔱', '🔲', '🔳', '◼', '◻', '◾', '◽', '▪', '▫', '🔺', '⬜', '⬛', '⚫', '⚪', '🔴', '🔵', '🔻', '🔶', '🔷', '🔸', '🔹'
];
var playerNr;
var gamestardet;
function randomEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
}
function joinCreateStart() {
  var url_string = window.location.href;
  var url = new URL(url_string);
  lobbyId = url.searchParams.get("lobbyid");
  playerName = document.getElementById("playerNameTextFeald").value + randomEmoji()
  document.getElementById("menueContainer").innerHTML = "";
  joinLobby();
}

function createLobby() {

  // Nachricht an den Server schicken
  socket.emit("createLobby", {
    lobbyId,
    maxPlayers: 2 // z. B. maximal 2 Spieler
  });
};

function joinLobby() {
  socket.emit("joinLobby", { lobbyId, playerName })
};
socket.on("regSelf", ({player}) => {
  playerNr = player;
  console.log("You are: "+playerNr)
})
socket.on("lobbyNotFound", () => {
  createLobby();
});

socket.on("lobbyFull", () => {
  showStatus("❌ Diese Lobby ist voll.");
});
socket.on("getname", () => {
  console.log("Send name to other Player")
  socket.emit("nametoothers", { playerName, lobbyId })
})
socket.on("displayp1", ({ p1name }) => {
    document.getElementById("menueContainer").innerHTML = "<h1 class='menue-item'>Lobby: "+lobbyId+"</h1><p class='menue-item disciption' > Press the button to start the game or invite someone via this link:</p><p class='menue-item link' id='playerNameTextFeald'   placeholder='Dein toller name!' value=''>https://spotemoji.4lima.de/lobby.html?lobbyid="+lobbyId+"</p><br><button id='joinCreateStartBtn' class='menue-item joinBtn' onclick='startgame()'>Start game</button><br></br>";

  const playerNameonly = p1name + "";
  const playerEmoji = Array.from(playerNameonly).slice(-1)[0];
  console.log(playerEmoji)
  document.getElementById("emojip1").innerHTML = playerEmoji;
  document.getElementById("namep1").innerHTML = playerNameonly;
})
socket.on("playerJoined", ({ playerId }) => {
  const playerNameonly2 = playerId + "";
  const playerEmoji2 = Array.from(playerNameonly2).slice(-1)[0];
  console.log(playerEmoji2)
  document.getElementById("emojip2").innerHTML = playerEmoji2;
  document.getElementById("namep2").innerHTML = playerNameonly2;
});

socket.on("lobbyCreated", ({ lobbyId }) => {
  document.getElementById("menueContainer").innerHTML = "<h1 class='menue-item'>Lobby: "+lobbyId+"</h1><p class='menue-item disciption' > Press the button to start the game or invite someone via this link:</p><p class='menue-item link' id='playerNameTextFeald'   placeholder='Dein toller name!' value=''>https://spotemoji.4lima.de/lobby.html?lobbyid="+lobbyId+"</p><br><button id='joinCreateStartBtn' class='menue-item joinBtn' onclick='startgame()'>Start game</button><br></br>";
  const playerNameonly = playerName + "";
  const playerEmoji = Array.from(playerNameonly).slice(-1)[0];
  console.log(playerEmoji)
  document.getElementById("emojip1").innerHTML = playerEmoji;
  document.getElementById("namep1").innerHTML = playerNameonly;
});

socket.on("playerLeft", ({playerId}) => {
    if (gamestardet) {
        location.reload();
    }else {

  if(document.getElementById("namep1").innerHTML == playerName){
 document.getElementById("namep2").innerHTML = "❓";
    document.getElementById("emojip2").innerHTML = "❓";
  }else{
    document.getElementById("namep1").innerHTML = "❓";
    document.getElementById("emojip1").innerHTML = "❓";
  }
    }
})
socket.on("getplayernameendgame", () =>{
    socket.emit("giveothernameendgame", {lobbyId, othername: playerName})
})
socket.on("endgame", ({winner, p1points, p2points}) => {
    gamestardet = false;
    console.log("winner: " + winner);
    var otherName;
    socket.emit("getothernameendgame", {lobbyId})
    socket.on("saveothernameendgame", ({othername}) =>{
         otherName = othername;

    document.getElementById("main").innerHTML = "";
    document.getElementById("main").innerHTML = "<div class=\"menue\">\n" +
        "            <div class=\"player1\"><a  class=\"emoji-container\">\n" +
        "                <span id=\"emojip1\" class=\"emoji\">👑</span>\n" +
        "                <p id=\"namep1\" class=\"text\">❓</p>\n" +
        "            </a>\n" +
        "            </div>\n" +
        "            <div class=\"versusDiv\"><img class=\"vsImage\" src=\"/assets/images/imageedit_2_8073919138.png\" alt=\"Versus\">\n" +
        "            </div>\n" +
        "            <div class=\"player2\"><a class=\"emoji-container\">\n" +
        "                <span id=\"emojip2\" class=\"emoji\">❌</span>\n" +
        "                <p id=\"namep2\" class=\"text\">❓</p>\n" +
        "            </a>\n" +
        "                \n" +
        "            </div>\n" +
        "        </div>"
    if(winner == playerNr) {
        if (playerNr == "p1") {
            document.getElementById("namep1").innerText = playerName + " | " + p1points + " Points";
            document.getElementById("namep2").innerText = otherName + " | " + p2points + " Points";
            console.log("You won and you are: " + playerNr + "and the other is: " + otherName);
        } else {
            document.getElementById("namep1").innerText = playerName + " | " + p2points + " Points";
            document.getElementById("namep2").innerText = otherName + " | " + p1points + " Points";
            console.log("You won and you are: " + playerNr + "and the other is: " + otherName);
        }
    }else if(winner == "patt") {
        if (playerNr == "p1") {
            document.getElementById("namep1").innerText = playerName + " | " + p1points + " Points";
            document.getElementById("namep2").innerText = otherName + " | " + p2points + " Points";
            console.log("You won and you are: " + playerNr + "and the other is: " + otherName);
        } else {
            document.getElementById("namep1").innerText = playerName + " | " + p2points + " Points";
            document.getElementById("namep2").innerText = otherName + " | " + p1points + " Points";
            console.log("You won and you are: " + playerNr + "and the other is: " + otherName);
        }
        document.getElementById("patt").innerText = "👑";

    }else {
        if(playerNr == "p2") {
            document.getElementById("namep2").innerText = playerName + " | " + p2points + " Punkte";
            document.getElementById("namep1").innerText = otherName + " | " + p1points + " Punkte";
            console.log("You lost and you are: " + playerNr + "and the other is: " + otherName);
        }else{
            document.getElementById("namep2").innerText = playerName + " | " + p1points + " Punkte";
            document.getElementById("namep1").innerText = otherName + " | " + p2points + " Punkte";
            console.log("You lost and you are: " + playerNr + "and the other is: " + otherName);
        }
    }
    });
})


socket.on("gameStardet", ({mainCard}) => {
  mainCard = mainCard + "";
  const mainCardArray = mainCard.split(",");
  
  console.log("mainCard: " + mainCardArray );
  document.getElementById("main").innerHTML = "";
  document.getElementById("main").innerHTML = "<div class='game'><div id='mainCard' class='mainCard'><div class='cardItemDiv1'><span class='cardItem'>🐖</span></div><div class='cardItemDiv2'><span class='cardItem'>💾</span></div><div class='cardItemDiv3'><span class='cardItem'>⚙️</span></div><div class='cardItemDiv4'><span class='cardItem'>💿</span></div><div class='cardItemDiv5'><span class='cardItem'>❤️</span></div><div class='cardItemDiv6'><span class='cardItem'>😀</span></div><div class='cardItemDiv7'><span class='cardItem'>👌</span></div><div class='cardItemDiv8'><span class='cardItem'>👀</span></div></div><div id='playerCard' class='playerCard'></div></div>";
  renderDobbleCard(mainCardArray, "main");
  socket.emit("getPlayercard", {lobbyId})
    gamestardet = true;
})

function startgame(){
  if(document.getElementById("namep1").innerHTML == "❓" || document.getElementById("namep2").innerHTML == "❓"){

  }else{
      socket.emit("startGame", {lobbyId})

  }
}
socket.on("newPlayerCard", ({playerCard}) => {
  playerCard = playerCard + "";
  const playerCardArray = playerCard.split(",");
  console.log("playerCard: " + playerCardArray );
  renderDobbleCard(playerCardArray, "player")
    

})
socket.on("newMainCard", ({mainCard}) => {
  mainCard = mainCard + "";
  const mainCardArray = mainCard.split(",");
  console.log("playerCard: " + mainCardArray );
  renderDobbleCard(mainCardArray, "main")
    

})
socket.on("lobbyExists", () => {
  showStatus("❌ Diese Lobby existiert bereits.");
});
socket.on("mainToPlayerCard", () => {
  const mainCard = document.getElementById('mainCard');
  const playerCard = document.getElementById('playerCard');

  playerCard.innerHTML = ''; // Spielerkarte leeren

  // Hole alle emoji-Divs aus der mainCard
  const emojiDivs = mainCard.querySelectorAll('div');

  emojiDivs.forEach(div => {
    // Klone das gesamte div (deep clone: true)
    const clonedDiv = div.cloneNode(true);

    // Finde das Emoji-Element im geklonten Div
    const emojiElement = clonedDiv.querySelector('.cardItem');

    if (emojiElement) {
      // EventListener hinzufügen
      emojiElement.addEventListener('click', icoClick);
    }

    // In die playerCard einfügen
    playerCard.appendChild(clonedDiv);
  });
})
function showStatus(msg) {
  const div = document.getElementById("status");
  const p = document.createElement("p");
  p.textContent = msg;
  div.appendChild(p);
}
function shuffle (myArray) {
  var arrayLength = myArray.length;
  if ( arrayLength == 0 ) return false; // false wenn das Array leer ist
  for(var i =0; i < arrayLength; i++) {
     //zufaellige Nummer aus dem Array auswaehlen
     var j = Math.floor( Math.random() * ( arrayLength-1 ) );
	 	 //aktuelle Arraynummer mit dem zufaellig generierten austauschen (swap)
     var tempi = myArray[i];
     var tempj = myArray[j];
     myArray[i] = tempj;
     myArray[j] = tempi;
   }
   return myArray;
}
function icoClick(event) {
  const clickedEmoji = event.target.textContent;
  console.log("Geklicktes Emoji:", clickedEmoji);
  socket.emit("guess", {lobbyId, ico: clickedEmoji, playerNr})
}
function renderDobbleCard(emojiArray, cardType) {
  let span;
  const mainCard = document.getElementById(cardType+'Card');
  console.log(cardType)
  mainCard.innerHTML = ''; // Vorherige Karte löschen
 emojiArray = shuffle(emojiArray);
  for (let i = 0; i < emojiArray.length; i++) {
    const emoji = emojiArray[i];

    // Erstelle das äußere Div mit der richtigen Position
    const itemDiv = document.createElement('div');
    itemDiv.classList.add(`cardItemDiv${i + 1}`);
 span = document.createElement('span');
    // Erstelle das innere Span mit dem Emoji
    if(cardType == "main"){
   
    }else{
          span.addEventListener('click', icoClick);
    }
    span.classList.add('cardItem');
    span.textContent = emoji;

    // Zufällige Rotation zwischen -30° und +30°
    const rotation = Math.floor(Math.random() * 360);

    // Zufällige Skalierung zwischen 0.8 und 1.2
    const scale = 0.5 + Math.random() * 0.7;

    // Kombiniere beides in transform
    span.style.transform = `rotate(${rotation}deg) scale(${scale})`;


    // Füge das Emoji in die Karte ein
    itemDiv.appendChild(span);
    mainCard.appendChild(itemDiv);
  }
}
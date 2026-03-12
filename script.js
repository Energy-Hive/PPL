// ===============================
// PASSWORD SYSTEM
// ===============================

let passwords = {
admin: "admin123",
OM: "om123",
VR: "vr123",
SC: "sc123",
PI: "riya paglu",
AB: "ab123",
AT: "at123",
viewer: "view123"
}

// ===============================
// TEAM DATA
// ===============================

let teams = {

OM:{name:"Om Strikers",coins:500,players:[]},
VR:{name:"Vedant Riders",coins:500,players:[]},
SC:{name:"Siddhant Challengers",coins:500,players:[]},
PI:{name:"Prabal Indians",coins:500,players:[]},
AB:{name:"Ayush Blasters",coins:500,players:[]},
AT:{name:"Ansh Titan",coins:500,players:[]}

}

// ===============================
// PLAYER LIST
// ===============================

let players = [

{name:"Prabal Tiwari",base:50},
{name:"Ansh Kumar",base:36},
{name:"Ayush Jha",base:30},
{name:"Om Singh",base:34},
{name:"Siddhant Pandey",base:39},
{name:"Vedant Pandey",base:34}

]

// ===============================
// GLOBAL VARIABLES
// ===============================

let currentUser = ""

let auctionTeams = []

let currentPlayer = null

let bidPrice = 0

let highestBidder = null

let timer = 10

let interval = null

// ===============================
// LOGIN SYSTEM
// ===============================

function login(){

let user = document.getElementById("loginUser").value
let pass = document.getElementById("loginPass").value

if(passwords[user] !== pass){

alert("Wrong password")
return

}

currentUser = user

document.getElementById("loginPage").style.display="none"

document.getElementById("auctionPage").style.display="block"

if(user === "admin"){

document.getElementById("adminPage").style.display="block"

initAdmin()

}

else{

document.getElementById("adminPage").style.display="none"

}

renderTeams()

}

// ===============================
// ADMIN PANEL SETUP
// ===============================

function initAdmin(){

let team1 = document.getElementById("team1")
let team2 = document.getElementById("team2")

let playerSelect = document.getElementById("playerSelect")

team1.innerHTML=""
team2.innerHTML=""

for(let id in teams){

team1.innerHTML += `<option value="${id}">${teams[id].name}</option>`

team2.innerHTML += `<option value="${id}">${teams[id].name}</option>`

}

players.forEach((p,i)=>{

playerSelect.innerHTML += `<option value="${i}">${p.name}</option>`

})

}

// ===============================
// ADMIN SELECTS TEAMS
// ===============================

function setTeams(){

let t1 = document.getElementById("team1").value
let t2 = document.getElementById("team2").value

if(t1 === t2){

alert("Choose two different teams")
return

}

auctionTeams = [t1,t2]

document.getElementById("team1Name").innerText = teams[t1].name
document.getElementById("team2Name").innerText = teams[t2].name

document.getElementById("team1Bid").onclick = () => bid(t1)
document.getElementById("team2Bid").onclick = () => bid(t2)

}

// ===============================
// LOAD PLAYER
// ===============================

function loadPlayer(){

let index = document.getElementById("playerSelect").value

currentPlayer = players[index]

bidPrice = currentPlayer.base

highestBidder = null

document.getElementById("playerName").innerText = currentPlayer.name

document.getElementById("basePrice").innerText = currentPlayer.base

document.getElementById("currentBid").innerText = bidPrice

document.getElementById("highestBid").innerText = "None"

}

// ===============================
// START AUCTION
// ===============================

function startAuction(){

if(!currentPlayer){

alert("Load a player first")
return

}

timer = 10

document.getElementById("timer").innerText = timer

if(interval) clearInterval(interval)

interval = setInterval(function(){

timer--

if(timer <= 0){

clearInterval(interval)

finishAuction()

return

}

document.getElementById("timer").innerText = timer

},1000)

}

// ===============================
// BID SYSTEM
// ===============================

function bid(team){

if(currentUser !== team){

alert("You cannot bid for another team")
return

}

if(!auctionTeams.includes(team)){

alert("Your team is not in this auction")
return

}

let t = teams[team]

if(t.players.length >= 3){

alert("Team already has 3 players")
return

}

if(t.coins < bidPrice + 5){

alert("Not enough coins")
return

}

bidPrice += 5

highestBidder = team

document.getElementById("currentBid").innerText = bidPrice

document.getElementById("highestBid").innerText = t.name

// RESET TIMER

timer = 10

document.getElementById("timer").innerText = timer

}

// ===============================
// FINISH AUCTION
// ===============================

function finishAuction(){

if(!highestBidder){

alert("Player Unsold")
return

}

let team = teams[highestBidder]

team.coins -= bidPrice

team.players.push(currentPlayer.name)

renderTeams()

let row = document.createElement("tr")

row.innerHTML = `

<td>${currentPlayer.name}</td>

<td>${currentPlayer.base}</td>

<td>${bidPrice}</td>

<td>${team.name}</td>

`

document.getElementById("results").appendChild(row)

}

// ===============================
// TEAM DISPLAY
// ===============================

function renderTeams(){

let container = document.getElementById("teams")

container.innerHTML=""

for(let id in teams){

let t = teams[id]

let card = document.createElement("div")

card.className="teamCard"

card.innerHTML = `

<h3>${t.name}</h3>

<p>Coins: ${t.coins}</p>

<p>Players: ${t.players.join(", ")}</p>

`

container.appendChild(card)

}

}

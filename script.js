let passwords={
admin:"admin123",
OM:"om123",
VR:"vr123",
SC:"sc123",
PI:"pi123",
AB:"ab123",
AT:"at123"
}

let teams={
OM:{name:"Om Strikers",coins:500,players:[]},
VR:{name:"Vedant Riders",coins:500,players:[]},
SC:{name:"Siddhant Challengers",coins:500,players:[]},
PI:{name:"Prabal Indians",coins:500,players:[]},
AB:{name:"Ayush Blasters",coins:500,players:[]},
AT:{name:"Ansh Titan",coins:500,players:[]}
}

let players=[

{name:"Prabal Tiwari",base:50},
{name:"Ansh Kumar",base:36},
{name:"Ayush Jha",base:30},
{name:"Om Singh",base:34},
{name:"Siddhant Pandey",base:39},
{name:"Vedant Pandey",base:34}

]

let auctionTeams=[]
let currentUser=""
let currentPlayer=null
let bidPrice=0
let highestBidder=null
let timer=10
let interval=null

function login(){

let user=document.getElementById("loginUser").value
let pass=document.getElementById("loginPass").value

if(passwords[user]!=pass){

alert("Wrong password")
return

}

currentUser=user

document.getElementById("loginPage").style.display="none"
document.getElementById("auctionPage").style.display="block"

initAdmin()

renderTeams()

}

function initAdmin(){

let t1=document.getElementById("team1")
let t2=document.getElementById("team2")
let p=document.getElementById("playerSelect")

for(let id in teams){

t1.innerHTML+=`<option value="${id}">${teams[id].name}</option>`
t2.innerHTML+=`<option value="${id}">${teams[id].name}</option>`

}

players.forEach((pl,i)=>{

p.innerHTML+=`<option value="${i}">${pl.name}</option>`

})

}

function setTeams(){

let t1=document.getElementById("team1").value
let t2=document.getElementById("team2").value

auctionTeams=[t1,t2]

document.getElementById("team1Name").innerText=teams[t1].name
document.getElementById("team2Name").innerText=teams[t2].name

document.getElementById("team1Bid").onclick=()=>bid(t1)
document.getElementById("team2Bid").onclick=()=>bid(t2)

}

function loadPlayer(){

let index=document.getElementById("playerSelect").value

currentPlayer=players[index]

bidPrice=currentPlayer.base
highestBidder=null

document.getElementById("playerName").innerText=currentPlayer.name
document.getElementById("basePrice").innerText=currentPlayer.base
document.getElementById("currentBid").innerText=bidPrice
document.getElementById("highestBid").innerText="None"

}

function startAuction(){

timer=10

document.getElementById("timer").innerText=timer

interval=setInterval(()=>{

timer--

if(timer<=0){

clearInterval(interval)

finishAuction()

return

}

document.getElementById("timer").innerText=timer

},1000)

}

function bid(team){

if(!auctionTeams.includes(team)) return

let t=teams[team]

if(t.coins < bidPrice+5) return

if(t.players.length>=3) return

bidPrice+=5

highestBidder=team

document.getElementById("currentBid").innerText=bidPrice
document.getElementById("highestBid").innerText=t.name

timer=10

}

function finishAuction(){

if(!highestBidder) return

let t=teams[highestBidder]

t.coins-=bidPrice

t.players.push(currentPlayer.name)

renderTeams()

let row=document.createElement("tr")

row.innerHTML=`
<td>${currentPlayer.name}</td>
<td>${currentPlayer.base}</td>
<td>${bidPrice}</td>
<td>${t.name}</td>
`

document.getElementById("results").appendChild(row)

}

function renderTeams(){

let div=document.getElementById("teams")

div.innerHTML=""

for(let id in teams){

let t=teams[id]

div.innerHTML+=`

<div class="teamCard">

<b>${t.name}</b>

<p>Coins: ${t.coins}</p>

<p>Players: ${t.players.length}</p>

</div>

`

}

}
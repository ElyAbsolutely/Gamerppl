const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

document.getElementById("button").addEventListener("click", start);

function start() {
    document.getElementById("button").disabled = true;
    update();
}

var midx = canvas.width / 2;
var midy = canvas.height / 2;

const player = {
    x: midx - 10,
    y: midy - 10,
    h: 20,
    w: 20,
    speed: 1,
    color: "red",
    png: null //Halutaanko kuvat myöhemmin?
}

const wall = {
    x: 500, //Pitää muuttaa
    y: Math.random() * canvas.height,
    h: Math.random() * canvas.height,
    w: Math.random() * 40,
    speed: 0,
    color: 'blue',
    dx: 0,
    dy: 0
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.w, player.h);
}

function drawWall() { 
    ctx.fillStyle = wall.color;   
    ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function newPos() {


    detectWalls();
}

function detectWalls() {
    //Vasen puoli seinästä
    if (player.x + player.w > wall.x && player.y + player.h > wall.y && player.y > wall.y + wall.h) {
        //törmää seinään pääse ohi ylä- ja alapuolelta?
        console.log('hit left');
    }
    //Oikea puoli seinästä
    if (player.x < wall.x + wall.w && player.y + player.h > wall.y && player.y > wall.y + wall.h) {
        //törmää seinään pääse ohi ylä- ja alapuolelta?
        console.log('hit right');
    }
}

function update() {
    clear();

    drawWall();
    drawPlayer();
    
    newPos();
    
    requestAnimationFrame(update);
}

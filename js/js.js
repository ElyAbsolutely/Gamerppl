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

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.w, player.h);
}

function drawWalls() {    
    ctx.fillRect(20, 20, 40, 40);
    ctx.fillStyle = 'orange';
    ctx.translate
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function newPos() {


    detectWalls();
}

function detectWalls() {

}

function update() {
    clear();
    drawPlayer();
    newPos();
    requestAnimationFrame(update);
}

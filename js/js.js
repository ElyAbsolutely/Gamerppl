const canvas = document.getElementById('canvas');
const ctx = canvas.getContext;

document.getElementById("button").addEventListener("click", start);

function start() {
    document.getElementById("button").disabled = true;
    update();
}

var midx = game.width / 2;
var midy = game.height / 2;

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

function clear() {
    ctx.clearRect(0, 0, game.width, game.height)
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

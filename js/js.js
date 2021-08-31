const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

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

document.addEventListener("keydown", function (event) {
    //move
    if (event.key === "w") {
        //go up
        console.log("W")
    } else if (event.key === "a") {
        //go left
        console.log("A")
    } else if (event.key === "s") {
        //go down
        console.log("S")
    } else if (event.key === "d") {
        //go right
        console.log("D")
    }
    //attack
    if (event.key === "ArrowUp") {
        //attact up
        console.log("keyUp")
    } else if (event.key === "ArrowLeft") {
        //attack left
        console.log("keyLeft")
    } else if (event.key === "ArrowDown") {
        //attack down
        console.log("keyDown")
    } else if (event.key === "ArrowRight") {
        //attack right
        console.log("keyRight")
    }
})

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.w, player.h);
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

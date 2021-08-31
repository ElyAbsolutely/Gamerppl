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

const wall = [
    { // Left
        x: 0,
        y: 0,
        h: canvas.height,
        w: 100,
        speed: 5,
        color: 'blue',
    }, 
    { // Top
        x: 0,
        y: 0,
        h: 100,
        w: canvas.width,
        speed: 5,
        color: 'blue',
    },
    { // Bottom
        x: 100,
        y: canvas.height - 100,
        h: 100,
        w: canvas.width,
        speed: 5,
        color: 'blue',
    }, 
    { // Right
        x: canvas.width - 100,
        y: 0,
        h: canvas.height - 100,
        w: 100,
        speed: 5,
        color: 'blue',
    }
]

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.w, player.h);
}

function drawWalls() { 
    for (let i = 0; i < wall.length; i++) {
        ctx.fillStyle = wall[i].color;   
        ctx.fillRect(wall[i].x, wall[i].y, wall[i].w, wall[i].h);
    }
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos() {

    detectWalls();
}

function detectWalls() {
    //Ei toimi oikein
    // for (let i = 0; i < wall.length; i++) {
    //     if (player.x > 0 + wall[i].x + wall[i].w) {
    //         wall[i].speed = 0;
    //     } else {
    //         wall[i].speed = 5;
    //     }
    // }
}

function moveLeft() {
    for (let i = 0; wall.length > i; i++) {
        wall[i].x += wall[i].speed;
    }
}

function moveRight() {
    for (let i = 0; wall.length > i; i++) {
        wall[i].x -= wall[i].speed;
    }
}

function moveUp() {
    for (let i = 0; wall.length > i; i++) {
        wall[i].y += wall[i].speed;
    }
}

function moveDown() {
    for (let i = 0; wall.length > i; i++) {
        wall[i].y -= wall[i].speed;
    }
}

document.addEventListener("keydown", function (event) {
    //move
    if (event.key === "w") {
        //go up
        moveUp();
    } else if (event.key === "s") {
        //go down
        moveDown();
    } else if (event.key === "a") {
        //go left
        moveLeft();
    } else if (event.key === "d") {
        //go right
        moveRight();
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

function update() {
    clear();

    drawPlayer();
    drawWalls();
    
    newPos();
    
    requestAnimationFrame(update);
}
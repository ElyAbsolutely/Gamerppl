const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

document.getElementById("button").addEventListener("click", start);

function start() {
    document.getElementById("button").disabled = true;
    update();
}

var midx = canvas.width / 2;
var midy = canvas.height / 2;

var weapon01 = document.getElementById("dagger");

const player = {
    x: midx - 10,
    y: midy - 10,
    h: 20,
    w: 20,
    speed: 1,
    color: "red",
    attackFrames: -1, //max 25, -1 for default stance, 0 to start attacking
    attackDir: "none",
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

function drawAttack() {
    console.log(player.attackFrames + player.attackDir);
    if (player.attackFrames > -1) {
        switch (player.attackDir) {
            case "up":
                ctx.drawImage(weapon01, player.x, player.y - player.h, player.h, player.w);
                break;
            case "left":
                ctx.drawImage(weapon01, player.x - player.w, player.y, player.h, player.w);
                break;
            case "down":
                ctx.drawImage(weapon01, player.x, player.y + player.h, player.h, player.w);
                break;
            case "right":
                ctx.drawImage(weapon01, player.x + player.w, player.y, player.h, player.w);
                break;
        }

        player.attackFrames++;

        if (player.attackFrames == 25) {
            player.attackFrames = -1;

            player.attackDir = "none";
        }
    }
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
    switch (event.key) {
        case "w":
            //go up
            moveUp();
            break;
        case "a":
            //go left
            moveLeft();
            break;
        case "s":
            //go down
            moveDown();
            break;
        case "d":
            //go right
            moveRight();
            break;
    }

    //attack
    if (player.attackFrames == -1) {
        switch (event.key) {
            case "ArrowUp":
                //attact up
                player.attackDir = "up";
                player.attackFrames = 0;
                break;
            case "ArrowLeft":
                //attack left
                player.attackDir = "left";
                player.attackFrames = 0;
                break;
            case "ArrowDown":
                //attack down
                player.attackDir = "down";
                player.attackFrames = 0;
                break;
            case "ArrowRight":
                //attack right
                player.attackDir = "right";
                player.attackFrames = 0;
                break;
        }
    }
})

function update() {
    clear();

    drawPlayer();
    drawWalls();
    drawAttack();

    // newPos();

    requestAnimationFrame(update);
}
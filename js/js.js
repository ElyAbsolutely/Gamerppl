const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

document.getElementById("button").addEventListener("click", start);

function start() {
    document.getElementById("button").disabled = true;
    update();
}

let midx = canvas.width / 2;
let midy = canvas.height / 2;

let weapon01 = document.getElementById("dagger");

const player = {
    x: midx - 10,
    y: midy - 10,
    h: 20,
    w: 20,
    speed: 1,
    color: "red",
    attackFrames: -1, //max 25, -1 for default stance, 0 to start attacking
    attackDir: "none", // none, up, left, down, right
    moveDir: "none", // none, up, left, down, right
    png: null //Halutaanko kuvat myöhemmin?
}

const wall = [
    { // Left
        x: -300,
        y: 100,
        h: canvas.height - 200,
        w: 400,
        speed: 5,
        color: 'blue',
        goDown: 5,
        goUp: 5,
        goLeft: 5,
        goRight: 5
    },
    { // Top
        x: -300,
        y: -300,
        h: 400,
        w: canvas.width * 2,
        speed: 5,
        color: 'red',
        goDown: 5,
        goUp: 5,
        goLeft: 5,
        goRight: 5
    },
    { // Bottom
        x: -300,
        y: canvas.height - 100,
        h: 400,
        w: canvas.width * 2,
        speed: 5,
        color: 'orange',
        goDown: 5,
        goUp: 5,
        goLeft: 5,
        goRight: 5
    },
    { // Right
        x: canvas.width - 100,
        y: 100,
        h: canvas.height - 200,
        w: 400,
        speed: 5,
        color: 'black',
        goDown: 5,
        goUp: 5,
        goLeft: 5,
        goRight: 5
    }
]

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.w, player.h);
}

function attack(dir) {
    if (player.attackFrames == -1) {
        switch (dir) {
            case "up":
                ctx.drawImage(weapon01, player.x, player.y + player.h, player.h, player.w);
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
        player.attackFrames = 0;
    }
}

function drawAttack() {
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

function clear(sky) { //Testaan tauskakuva taivaan tekemistä
    switch (sky) {
        case 0:
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            break;
        case 1:
            ctx.drawImage(sky01, 0, 0, canvas.width, canvas.height);
            break;
        case 2:
            ctx.drawImage(sky02, 0, 0, canvas.width, canvas.height);
            break;
    }
}

function newPos() {
    switch (player.moveDir) {
        case "none":
            break;
        case "up":
            moveUp();
            break;
        case "left":
            moveLeft();
            break;
        case "down":
            moveDown();
            break;
        case "right":
            moveRight();
            break;
        default:
            break;
    }

    detectWalls();
}

function detectWalls() { // Toimii neliön kanssa
    for (let i = 0; i < wall.length; i++) {
        if (player.y <= wall[1].y + wall[1].h) {
            console.log('hit top');
            wall[i].goUp = 0;
        } else if (player.y + player.h >= wall[2].y) {
            console.log('hit bottom');
            wall[i].goDown = 0;
        } else if (player.x + player.w >= wall[3].x) {
            console.log('hit right');
            wall[i].goRight = 0;
        } else if (player.x <= wall[0].x + wall[0].w) {
            console.log('hit left');
            wall[i].goLeft = 0;
        } else {
            wall[i].goDown = 5;
            wall[i].goLeft = 5;
            wall[i].goRight = 5;
            wall[i].goUp = 5;
        }
    }
}

function moveLeft() {
    for (let i = 0; wall.length > i; i++) {
        wall[i].x += wall[i].goLeft;
    }
}

function moveRight() {
    for (let i = 0; wall.length > i; i++) {
        wall[i].x -= wall[i].goRight;
    }
}

function moveUp() {
    for (let i = 0; wall.length > i; i++) {
        wall[i].y += wall[i].goUp;
    }
}

function moveDown() {
    for (let i = 0; wall.length > i; i++) {
        wall[i].y -= wall[i].goDown;
    }
}

document.addEventListener("keyup", function (event) {

    //Stop
    switch (event.key) {
        case "w":
            if (player.moveDir == "up") {
                player.moveDir = "none";
                break;
            }
        case "a":
            if (player.moveDir == "left") {
                player.moveDir = "none";
                break;
            }
        case "s":
            if (player.moveDir == "down") {
                player.moveDir = "none";
                break;
            }
        case "d":
            if (player.moveDir == "right") {
                player.moveDir = "none";
                break;
            }
        default:
            break;
    }
})



document.addEventListener("keydown", function (event) {

    //move
    switch (event.key) {
        case "w":
            //go up
            player.moveDir = "up";
            break;
        case "a":
            //go left
            player.moveDir = "left";
            break;
        case "s":
            //go down
            player.moveDir = "down";
            break;
        case "d":
            //go right
            player.moveDir = "right";
            break;
        case "r":
            //stop momentarily
            player.moveDir = "none";
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
            default:
                break;
        }
    }
})

function update() {
    clear(2);

    drawPlayer();
    drawWalls();
    drawAttack();

    newPos();

    requestAnimationFrame(update);
}
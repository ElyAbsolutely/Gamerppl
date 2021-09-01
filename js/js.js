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
    attackFrames: -1, //max 25
    png: null //Halutaanko kuvat myöhemmin?
}

const wall = [
    { // Left
        x: 0,
        y: 100,
        h: canvas.height - 100,
        w: 100,
        speed: 5,
        color: 'blue',
        goDown: 5,
        goUp: 5,
        goLeft: 5,
        goRight: 5
    },
    { // Top
        x: 0,
        y: 0,
        h: 100,
        w: canvas.width - 100,
        speed: 5,
        color: 'red',
        goDown: 5,
        goUp: 5,
        goLeft: 5,
        goRight: 5
    },
    { // Bottom
        x: 100,
        y: canvas.height - 100,
        h: 100,
        w: canvas.width - 100,
        speed: 5,
        color: 'orange',
        goDown: 5,
        goUp: 5,
        goLeft: 5,
        goRight: 5
    },
    { // Right
        x: canvas.width - 100,
        y: 0,
        h: canvas.height - 100,
        w: 100,
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

let attackUp = false;
let attackLeft = false;
let attackRight = false;
let attackDown = false;

function attack(dir) {
    if (player.attackFrames == -1) {
        switch (dir) {
            case 1:
                attackUp = true;
                console.log("keyUp");
                break;
            case 2:
                attackLeft = true;
                console.log("keyLeft");
                break;
            case 3:
                attackDown = true;
                console.log("keyDown");
                break;
            case 4:
                attackRight = true;
                console.log("keyRight");
                break;
        }
        player.attackFrames = 0;
    }
}

function drawAttack() {
    if (player.attackFrames > -1) {
        if (attackUp) {
            ctx.drawImage(weapon01, player.x, player.y - player.h, player.h, player.w);
        } else if (attackLeft) {
            ctx.drawImage(weapon01, player.x - player.w, player.y, player.h, player.w);
        } else if (attackDown) {
            ctx.drawImage(weapon01, player.x, player.y + player.h, player.h, player.w);
        } else if (attackRight) {
            ctx.drawImage(weapon01, player.x + player.w, player.y, player.h, player.w);
        }

        player.attackFrames++;

        if (player.attackFrames == 25) {
            player.attackFrames = -1;

            attackUp = false;
            attackLeft = false;
            attackRight = false;
            attackDown = false;
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
        }
        else {
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
        attack(1);
    } else if (event.key === "ArrowLeft") {
        //attack left
        attack(2);
    } else if (event.key === "ArrowDown") {
        //attack down
        attack(3);
    } else if (event.key === "ArrowRight") {
        //attack right
        attack(4);
    }
})

function update() {
    clear();

    drawPlayer();
    drawWalls();
    drawAttack();

    newPos();

    requestAnimationFrame(update);
}
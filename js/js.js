const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const skyBtn = document.getElementById('sky-btn');
const overlayBtn = document.getElementById('overlay-btn');
const soundBtn = document.getElementById('sound-btn');

window.addEventListener('load', hideGame);
document.getElementById('start-btn').addEventListener('click', start);
skyBtn.addEventListener('click', changeSky);
overlayBtn.addEventListener('click', changeOverlay);
soundBtn.addEventListener('click', toggleVolume);

skyBtn.disabled = true;
overlayBtn.disabled = true;
soundBtn.disabled = true;

//Asset Warmup
var sky01 = new Image();
sky01.src = "img/skybox/cloudyDay.jpg";
var sky02 = new Image();
sky02.src = "img/skybox/oceanSunset.jpg";
var weapon01 = new Image();
weapon01.src = "img/weapons/steelDagger.png";

var footstep01 = new Audio("sounds/player/footsteps/concrete1.wav");
var footstep02 = new Audio("sounds/player/footsteps/concrete2.wav");
var footstep03 = new Audio("sounds/player/footsteps/concrete3.wav");
var footstep04 = new Audio("sounds/player/footsteps/concrete4.wav");
var knifemelee01 = new Audio("sounds/player/weapons/knife_slash1.wav");

function start() {
    showGame();
    skyBtn.disabled = false;
    overlayBtn.disabled = false;
    soundBtn.disabled = false;
    update();
}

const gameDiv = document.getElementById('game');
function hideGame() {
    gameDiv.style.display = 'none';
}

function showGame() {
    document.getElementById('start').style.display = 'none';
    gameDiv.style.display = 'block';
}

let midx = canvas.width / 2;
let midy = canvas.height / 2;

const gameSettings = {
    volume: false,
    devMode: false
}

const player = {
    x: midx - 10,
    y: midy - 10,
    h: 20,
    w: 20,
    speed: 5,
    color: "red",

    attackFrames: -1, //max 25, -1 for default stance, 0 to start attacking
    attackDir: "none", // none, up, left, down, right
    health: 3,
    weaponID: "Dagger",

    moveDir: "none", // none, up, left, down, right
    footsteps: 0,

    png: null //Halutaanko kuvat myöhemmin?
}

// x and y can be changed later when the stage is set
const enemies = [
    {
        x: 400,
        y: 300,
        w: 20,
        h: 20,
        speed: 5,
        color: 'blue',
        dx: 1.5,
        dy: 1.5
    },
    {
        x: 600,
        y: 50,
        w: 20,
        h: 20,
        speed: 5,
        color: 'blue',
        dx: 1.5,
        dy: 1.5
    },
    {
        x: 1000,
        y: 500,
        w: 20,
        h: 20,
        speed: 5,
        color: 'blue',
        dx: 1.5,
        dy: 1.5
    },
    {
        x: 800,
        y: 400,
        w: 20,
        h: 20,
        speed: 5,
        color: 'blue',
        dx: 1.5,
        dy: 1.5
    }
];

const stage = {
    x: null,
    y: null,

    sky: 0,
    overlay: 0,
    id: null
}

function changeSky() {
    if (stage.sky == 2) {
        stage.sky = 0;
        return;
    }
    stage.sky++;
}

function changeOverlay() {
    if (stage.overlay == 4) {
        stage.overlay = 0;
        return;
    }
    stage.overlay++;
}
// wall.i(0) = CAN be seen and WILL block player, wall.passable(1) = CANNOT be seen and WILL block player, wall.passable(2) = CAN be seen and will NOT block player
const wall = [
    { // Left
        x: -300,
        y: 50,
        h: canvas.height - 100,
        w: 350,
        color: "#072e062",
        id: 0
    },
    { // Top
        x: -300,
        y: -300,
        h: 350,
        w: canvas.width * 3,
        color: "#072e06",
        id: 0
    },
    { // Bottom
        x: -300,
        y: canvas.height - 50,
        h: 300,
        w: canvas.width * 3,
        color: "#072e06",
        id: 0
    },
    { // Right
        x: canvas.width * 2,
        y: 50,
        h: canvas.height - 100,
        w: 300,
        color: "#072e06",
        id: 0
    },
    { // ground
        x: 50,
        y: 50,
        h: 200,
        w: 200,
        color: "lightgreen",
        id: 2
    },
    { // test
        x: 50,
        y: 250,
        h: 200,
        w: 200,
        color: null,
        id: 1
    }
]

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.w, player.h);
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
        if (wall[i].id != 1) {
            ctx.fillStyle = wall[i].color;

            ctx.fillRect(wall[i].x, wall[i].y, wall[i].w, wall[i].h);
        } else if (wall[i].id == 1 && gameSettings.devMode) {
            ctx.beginPath();
            ctx.rect(wall[i].x, wall[i].y, wall[i].w, wall[i].h);
            ctx.stroke();
        }
    }
}


function drawEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        ctx.fillStyle = enemies[i].color;
        ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].w, enemies[i].h);
    }
}

function clear() { //Testaan tauskakuva taivaan tekemistä
    switch (stage.sky) {
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
            return;
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
    }

    detectWalls();
}

function moveLeft() {
    for (let i = 0; wall.length > i; i++) {
        wall[i].x += player.speed;
    }
    for (let i = 0; enemies.length > i; i++) {
        enemies[i].x += enemies[i].speed;
    }
}

function moveRight() {
    for (let i = 0; wall.length > i; i++) {
        wall[i].x -= player.speed;
    }
    for (let i = 0; enemies.length > i; i++) {
        enemies[i].x -= enemies[i].speed;
    }
}

function moveUp() {
    for (let i = 0; wall.length > i; i++) {
        wall[i].y += player.speed;
    }
    for (let i = 0; enemies.length > i; i++) {
        enemies[i].y += enemies[i].speed;
    }
}

function moveDown() {
    for (let i = 0; wall.length > i; i++) {
        wall[i].y -= player.speed;
    }
    for (let i = 0; enemies.length > i; i++) {
        enemies[i].y -= enemies[i].speed;
    }
}

function getDistance(x1, y1, x2, y2) {
    const xDiff = x1 - x2;
    const yDiff = y1 - y2;

    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

function enemyMove() {
    for (let i = 0; i < enemies.length; i++) {
        const distance = getDistance(player.x, player.y, enemies[i].x, enemies[i].y)
        
        if (distance < 250) {
            if (player.x + player.w < enemies[i].x) {
                enemies[i].x -= enemies[i].dx;
            } else if (player.y + player.h < enemies[i].y) {
                enemies[i].y -= enemies[i].dy;
            } else if (player.x > enemies[i].x + enemies[i].w) {
                enemies[i].x += enemies[i].dx;
            } else if (player.y > enemies[i].y + enemies[i].h) {
                enemies[i].y += enemies[i].dy;
            }
        }
    }
}

function detectWalls() { // Testattu ja toimii neliön kanssa

    for (let i = 0; wall.length > i; i++) {
        if (wall[i].id != 2) {
            if (player.y < wall[i].y + wall[i].h && player.x < wall[i].x + wall[i].w && player.y + player.h > wall[i].y && player.x + player.w > wall[i].x) {
                console.log("hit");
                switch (player.moveDir) {
                    case "up":
                        moveDown();
                        return;
                    case "left":
                        moveRight();
                        return;
                    case "down":
                        moveUp();
                        return;
                    case "right":
                        moveLeft();
                        return;
                }
            }
        }
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
        case "r":
            //switch devMode
            toggleDevMode();
            return;
        case "w":
            //go up
            player.moveDir = "up";
            return;
        case "a":
            //go left
            player.moveDir = "left";
            return;
        case "s":
            //go down
            player.moveDir = "down";
            return;
        case "d":
            //go right
            player.moveDir = "right";
            return;

        //attack

        case "ArrowUp":
            //attact up
            if (player.attackFrames != -1) {
                return;
            }
            player.attackDir = "up";
            player.attackFrames = 0;
            return;
        case "ArrowLeft":
            //attack left
            if (player.attackFrames != -1) {
                return;
            }
            player.attackDir = "left";
            player.attackFrames = 0;
            return;
        case "ArrowDown":
            //attack down
            if (player.attackFrames != -1) {
                return;
            }
            player.attackDir = "down";
            player.attackFrames = 0;
            return;
        case "ArrowRight":
            //attack right
            if (player.attackFrames != -1) {
                return;
            }
            player.attackDir = "right";
            player.attackFrames = 0;
            return;
    }
})

function update() {
    clear();

    newPos();
    drawPlayer();
    drawEnemies();
    drawWalls();
    drawAttack();

    drawOverlay();

    enemyMove();

    playSounds();
    drawHUD();

    requestAnimationFrame(update);
}

function toggleVolume() {
    if (gameSettings.volume) {
        gameSettings.volume = false;
        document.getElementById("sound").style.background = "red";
    } else {
        gameSettings.volume = true;
        document.getElementById("sound").style.background = "green";
    }
}

function toggleDevMode() {
    if (gameSettings.devMode) {
        gameSettings.devMode = false;
    } else {
        gameSettings.devMode = true;
    }
}

function playSounds() {
    if (!(gameSettings.volume)) {
        console.log("sounds are off");
        return;
    }

    if (player.attackFrames == 2) {
        knifemelee01.play();
        console.log("meleeknife1");
    }

    if (!(player.moveDir == "none")) {
        if (player.footsteps == 17) {
            player.footsteps = 0;
            switch (Math.floor(Math.random() * 4)) {
                case 0:
                    footstep01.play();
                    console.log("footstepsound1");
                    return;
                case 1:
                    footstep02.play();
                    console.log("footstepsound2");
                    return;
                case 2:
                    footstep03.play();
                    console.log("footstepsound3");
                    return;
                case 3:
                    footstep04.play();
                    console.log("footstepsound4");
                    return;
            }
        }
        player.footsteps++;
    } else {
        player.footsteps = 0;
    }
}

function drawOverlay() {

    switch (stage.overlay) {
        case 0: // Empty
            return;
        case 1: // Warm sunset
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = "orange";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            break;
        case 2: // Nighttime
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = "darkblue";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            break;
        case 3: // Nuclear fallout / Alien
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = "green";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            break;
        case 4: // Foggy 
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = "lightblue";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            break;
        case 4: // It's A Secret To Everybody
            return;
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = "darkblue";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            break;
    }
    ctx.globalAlpha = 1.0;
}

function drawHUD() {

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Life: " + player.health, 5, 25);

    if (gameSettings.devMode) {
        ctx.fillText("DevMode: on", 450, 25);
    }
    ctx.fillText("Weapon: " + player.weaponID, 5, 595);

}
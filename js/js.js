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
    volume: false
}

const player = {
    x: midx - 10,
    y: midy - 10,
    h: 20,
    w: 20,
    speed: 1,
    color: "red",

    attackFrames: -1, //max 25, -1 for default stance, 0 to start attacking
    attackDir: "none", // none, up, left, down, right
    health: 3,
    weaponID: "Dagger",

    moveDir: "none", // none, up, left, down, right
    footsteps: 0,

    png: null //Halutaanko kuvat myöhemmin?
}

const enemies = [
    {
        x: 400,
        y: 300,
        w: 20,
        h: 20,
        speed: 5,
        color: 'blue'
    },
    {
        x: 600,
        y: 50,
        w: 20,
        h: 20,
        speed: 5,
        color: 'blue'
    },
    {
        x: 1000,
        y: 500,
        w: 20,
        h: 20,
        speed: 5,
        color: 'blue'
    },
    {
        x: 800,
        y: 400,
        w: 20,
        h: 20,
        speed: 5,
        color: 'blue'
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

const wall = [
    { // Left
        x: -300,
        y: 50,
        h: canvas.height - 100,
        w: 350,
        color: '#072e06'
    },
    { // Top
        x: -300,
        y: -300,
        h: 350,
        w: canvas.width * 3,
        color: '#072e06'
    },
    { // Bottom
        x: -300,
        y: canvas.height - 50,
        h: 300,
        w: canvas.width * 3,
        color: '#072e06'
    },
    { // Right
        x: canvas.width * 2,
        y: 50,
        h: canvas.height - 100,
        w: 300,
        color: '#072e06'
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
        ctx.fillStyle = wall[i].color;
        ctx.fillRect(wall[i].x, wall[i].y, wall[i].w, wall[i].h);
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

function moveLeft() {
    for (let i = 0; wall.length > i; i++) {
        wall[i].x += speed;
    }
    for (let i = 0; enemies.length > i; i++) {
        enemies[i].x += speed;
    }
}

function moveRight() {
    for (let i = 0; wall.length > i; i++) {
        wall[i].x -= speed;
    }
    for (let i = 0; enemies.length > i; i++) {
        enemies[i].x -= speed;
    }
}

function moveUp() {
    for (let i = 0; wall.length > i; i++) {
        wall[i].y += speed;
    }
    for (let i = 0; enemies.length > i; i++) {
        enemies[i].y += speed;
    }
}

function moveDown() {
    for (let i = 0; wall.length > i; i++) {
        wall[i].y -= speed;
    }
    for (let i = 0; enemies.length > i; i++) {
        enemies[i].y -= speed;
    }
}

function getDistance(x1, y1, x2, y2) {
    const xDiff = x1 - x2;
    const yDiff = y1 - y2;

    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

function enemyMove() {
    for(let i = 0; i < enemies.length; i++) {
        const distance = getDistance(player.x, player.y, enemies[i].x, enemies[i].y)
        
        if (distance < 200) {
            console.log('distance')
            if (player.x + player.width < enemies[i].x) {
                enemies[i].x -= enemies[i].speed;
                console.log('enemy move')
            }
        }
    }
}

function detectWalls() { // Testattu ja toimii neliön kanssa
    if (player.y < wall[1].y + wall[1].h) {
        console.log('hit top');
        moveDown();
    } else if (player.y + player.h > wall[2].y) {
        console.log('hit bottom');
        moveUp();
    } else if (player.x + player.w > wall[3].x) {
        console.log('hit right');
        moveLeft();
    } else if (player.x < wall[0].x + wall[0].w) {
        console.log('hit left');
        moveRight();
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
    }

    //attack
    if (player.attackFrames == -1) {
        switch (event.key) {
            case "ArrowUp":
                //attact up
                player.attackDir = "up";
                player.attackFrames = 0;
                return;
            case "ArrowLeft":
                //attack left
                player.attackDir = "left";
                player.attackFrames = 0;
                return;
            case "ArrowDown":
                //attack down
                player.attackDir = "down";
                player.attackFrames = 0;
                return;
            case "ArrowRight":
                //attack right
                player.attackDir = "right";
                player.attackFrames = 0;
                return;
        }
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

    ctx.fillText("Weapon: " + player.weaponID, 5, 595);

}
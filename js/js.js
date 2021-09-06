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
    map: null
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

// wall.id(0) = CAN be seen and WILL block player, wall.id(1) = CANNOT be seen and WILL block player, wall.id(2) = CAN be seen and will NOT block player
//wall.id(3) = triggers a function touch
const wall = [

    //JM

    { // Top
        x: 1050,
        y: -300,
        h: 350,
        w: 150,
        color: "#072e06",
        id: 0
    },
    { // Bottom
        x: 1050,
        y: 550,
        h: 300,
        w: 1100,
        color: "#072e06",
        id: 0
    },
    { // Right
        x: 1800,
        y: -300,
        h: 850,
        w: 500,
        color: "#072e06",
        id: 0
    },

    { // ground
        x: 1050,
        y: 50,
        h: 500,
        w: 750,
        color: "lightgreen",
        id: 2
    }, {
        x: 1200,
        y: -800,
        h: 850,
        w: 600,
        color: "lightgreen",
        id: 2
    },

    { //beach
        x: 1085,
        y: -800,
        h: 500,
        w: 115,
        color: "#FCB983",
        id: 2
    }, {
        x: 1085,
        y: -915,
        h: 115,
        w: 715,
        color: "#FCB983",
        id: 2
    }, {
        x: 1800,
        y: -915,
        h: 615,
        w: 115,
        color: "#FCB983",
        id: 2
    }, {
        x: 1800,
        y: -915,
        h: 615,
        w: 115,
        color: "#FCB983",
        id: 3,
        event: 1,
        overlay: 1
    },

    { //ocean
        x: 500,
        y: -915,
        h: 615,
        w: 585,
        color: "#4A83F5",
        id: 0
    }, {
        x: 500,
        y: -1500,
        h: 585,
        w: 800,
        color: "#4A83F5",
        id: 0
    }, {
        x: 1915,
        y: -1500,
        h: 1200,
        w: 375,
        color: "#4A83F5",
        id: 0
    }, {
        x: 1425,
        y: -1500,
        h: 585,
        w: 500,
        color: "#4A83F5",
        id: 0
    }, {
        x: 1300,
        y: -1175,
        h: 425,
        w: 125,
        color: "#EF785A",
        id: 2
    }, { // Triggers end-game
        x: 1300,
        y: -1175,
        h: 100,
        w: 125,
        color: "#EF785A",
        id: 3,
        event: 0
    }, {
        x: 1300,
        y: -1500,
        h: 325,
        w: 125,
        color: "#4A83F5",
        id: 0
    },

    //Middle

    { //river
        x: 800,
        y: -300,
        h: 2000,
        w: 250,
        color: "#6396FA",
        id: 2
    }, {
        x: 850,
        y: -300,
        h: 500,
        w: 150,
        color: "#4A83F5",
        id: 0
    }, {
        x: 850,
        y: 400,
        h: 1300,
        w: 150,
        color: "#4A83F5",
        id: 0
    }, {
        x: 775,
        y: 200,
        h: 200,
        w: 300,
        color: "#EF785A",
        id: 2
    },

    {
        x: 800,
        y: -300,
        h: 350,
        w: 250,
        id: 1
    }, {
        x: 800,
        y: 550,
        h: 300,
        w: 250,
        id: 1
    },

    //JT

    {
        x: -200,
        y: 100,
        h: 1000,
        w: 1000,
        color: "lightgreen",
        id: 2
    },
    {
        x: -200,
        y: 1100,
        h: 350,
        w: 1000,
        color: "#072e06",
        id: 0
    },

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
        switch (wall[i].id) {
            case 1:
                if (gameSettings.devMode) {
                    ctx.fillStyle = "black";
                    ctx.beginPath();
                    ctx.rect(wall[i].x, wall[i].y, wall[i].w, wall[i].h);
                    ctx.stroke();
                }
                break;
            case 3:
                if (gameSettings.devMode) {
                    ctx.fillStyle = "orange";
                    ctx.beginPath();
                    ctx.rect(wall[i].x, wall[i].y, wall[i].w, wall[i].h);
                    ctx.stroke();
                }
                break;
            default:
                ctx.fillStyle = wall[i].color;
                ctx.fillRect(wall[i].x, wall[i].y, wall[i].w, wall[i].h);
                break;
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

function loseLife() { // Works when the enemies are directly beside the player , need to tweak the enemy movements
    for (let i = 0; i < enemies.length; i++) {
        const distance = getDistance(player.x, player.y, enemies[i].x, enemies[i].y);

        if (distance <= enemies[i].w) {
            player.health -= 1;
            console.log('life lost');
        }
        if (distance <= player.w) {
            player.health -= 1;
            console.log('life lost');
        }
        if (distance <= enemies[i].h) {
            player.health -= 1;
            console.log('life lost');
        }
        if (distance <= player.h) {
            player.health -= 1;
            console.log('life lost');
        }
    }
}

function death() {
    // tekeillä
}

function detectWalls() { // Testattu ja toimii neliön kanssa

    for (let i = 0; wall.length > i; i++) {

        switch (wall[i].id) {

            case 0:
            case 1:
                if (player.y < wall[i].y + wall[i].h && player.x < wall[i].x + wall[i].w && player.y + player.h > wall[i].y && player.x + player.w > wall[i].x) {
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
            case 3:
                if (player.y < wall[i].y + wall[i].h && player.x < wall[i].x + wall[i].w && player.y + player.h > wall[i].y && player.x + player.w > wall[i].x) {
                    triggerEvent(wall[i].event);
                }
        }
    }
}

function triggerEvent(sasha) {
    switch (sasha) {
        // 0 = endgame
        // 1 = overlay change

        case 0:
            console.log("Player has touched the escape area");
            return;
        case 1:
            stage.overlay = 1;
            return;
    }
}

document.addEventListener("keyup", function (event) {

    //Stop
    switch (event.key) {
        case "w":
            if (player.moveDir == "up") {
                player.moveDir = "none";
                return;
            }
        case "a":
            if (player.moveDir == "left") {
                player.moveDir = "none";
                return;
            }
        case "s":
            if (player.moveDir == "down") {
                player.moveDir = "none";
                return;
            }
        case "d":
            if (player.moveDir == "right") {
                player.moveDir = "none";
                return;
            }
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

    drawWalls();
    drawAttack();
    drawPlayer();
    drawEnemies();

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

    if (gameSettings.devMode) {
        ctx.fillStyle = "red";
        ctx.font = "10px Arial";
        ctx.fillText("DevMode: on", 525, 590);
    }

    //ctx.fillStyle = "black";
    //ctx.font = "20px Arial";
    //ctx.fillText("Life: " + player.health, 5, 25);

    //ctx.fillText("Weapon: " + player.weaponID, 5, 595);

}
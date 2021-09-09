const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const soundBtn = document.getElementById('sound-btn');

window.addEventListener('load', hideGame);
window.addEventListener('reload', start);
document.getElementById('start-btn').addEventListener('click', start);
soundBtn.addEventListener('click', toggleVolume);
document.getElementById('end-btn').addEventListener('click', resetGame);

soundBtn.disabled = true;

//Asset Warmup
var weapon01 = new Image();
weapon01.src = "img/weapons/steelDagger.png";

var knifemelee01 = new Audio("sounds/player/weapons/knife_slash1.wav");

function start() {
    showGame();
    soundBtn.disabled = false;
    update();
}

const gameDiv = document.getElementById('game');
function hideGame() {
    gameDiv.style.display = 'none';
    hideEnd();
}

function hideEnd() {
    document.getElementById('end-screen').style.display = 'none';
}

function showGame() {
    hideEnd();
    document.getElementById('start').style.display = 'none';
    gameDiv.style.display = 'block';
}

function showEnd() {
    document.getElementById('end-screen').style.display = 'block';
}

let midx = canvas.width / 2;
let midy = canvas.height / 2;

const gameSettings = {
    volume: false,
    devMode: false
};

const player = {
    x: midx - 10,
    y: midy - 10,
    h: 20,
    w: 20,
    speed: 5,
    color: '#4614de',
    active: true, // true / false

    attackFrames: -1, //max 25, -1 for default stance, 0 to start attacking
    attackDir: "none", // none, up, left, down, right
    weaponID: "Dagger",

    health: 6,
    invisFrames: -1, // Max 100

    moveDir: "none", // none, up, left, down, right
    footsteps: 0,

    chests: 0 // keeping count on how many chests have been opened
};

const enemies = [

    // JT - Left side of the river

    { // Top room enemy
        x: 275,
        y: -440,
        w: 30,
        h: 30,
        color: '#b50000',
        dx: 1.5,
        dy: 1.5,
        id: 0
    },
    { // Bottom room inside
        x: -100,
        y: 1100,
        w: 30,
        h: 30,
        color: '#b50000',
        dx: 1.5,
        dy: 1.5,
        id: 0
    },
    { // Bottom room door
        x: 420,
        y: 1130,
        w: 30,
        h: 30,
        color: '#b50000',
        dx: 1.5,
        dy: 1.5,
        id: 0
    },
    // Keep the same colour on enemies. It'll get confusing otherwise
    //JM - Right side of the river

    { // Estate Terror
        x: 1200,
        y: 2225,
        w: 200,
        h: 200,
        color: '#b50000',
        dx: 0.8,
        dy: 1.2,
        id: 1
    },
    { // Swamp
        x: 1200,
        y: 1500,
        w: 30,
        h: 30,
        color: '#b50000',
        dx: 1.5,
        dy: 1.5,
        id: 0
    },
];

const stage = {
    x: null, y: null,
    sky: 0, overlay: 0,
    mapStartFrames: 0, endFrame: 0
};

const chests = [

    // JT

    { // Left map side, bottom
        x: -50, y: 1125,
        color1: '#3b1e09', color2: '#f7b525'
    },
    { // Left map side, top
        x: 320, y: -460,
        color1: 'oak', color2: 'silver'
    },

    // JM

    { // Estate
        x: 1630, y: 2555,
        color1: 'Sienna', color2: 'LightSteelBlue'
    },
    { // Beach 2
        x: 2825, y: 125,
        color1: 'Gold', color2: 'SeaShell'
    },

];

function drawPlayer() {
    switch (player.invisFrames) {
        default:
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = player.color;
            ctx.fillRect(player.x, player.y, player.w, player.h);
            break;
        case 1: case 2: case 3: case 4:
        case 9: case 10: case 11: case 12:
        case 17: case 18: case 19: case 20:
        case 25: case 26: case 27: case 28:
        case 33: case 34: case 35: case 36:
        case 41: case 42: case 43: case 44:
        case 49: case 50: case 51: case 52:
        case 57: case 58: case 59: case 60:
        case 65: case 66: case 65: case 68:
        case 73: case 74: case 75: case 76:
        case 81: case 82: case 83: case 84:
        case 89: case 90: case 91: case 92:
        case 97: case 98: case 99: case 100:
            return;
        case -1:
            ctx.fillStyle = player.color;
            ctx.fillRect(player.x, player.y, player.w, player.h);
            return;
    }
    ctx.globalAlpha = 1.0;
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
                    ctx.strokeStyle = "black";
                    ctx.beginPath(); ctx.rect(wall[i].x, wall[i].y, wall[i].w, wall[i].h); ctx.stroke();
                }
                break;
            case 3:
                if (gameSettings.devMode) {
                    ctx.strokeStyle = "yellow";
                    ctx.beginPath(); ctx.rect(wall[i].x, wall[i].y, wall[i].w, wall[i].h); ctx.stroke();
                }
                break;
            default:
                ctx.fillStyle = wall[i].color;
                ctx.fillRect(wall[i].x, wall[i].y, wall[i].w, wall[i].h);
                break;
            case 5:
                switch (wall[i].decal) {
                    case 0:
                        ctx.fillStyle = wall[i].color2;
                        ctx.fillRect(wall[i].x - 10, wall[i].y, 30, 10);
                        ctx.fillRect(wall[i].x, wall[i].y - 10, 10, 30);
                        ctx.fillStyle = wall[i].color;
                        ctx.fillRect(wall[i].x, wall[i].y, 10, 10);
                        break;
                    case 1:
                        ctx.fillStyle = wall[i].color; ctx.fillRect(wall[i].x, wall[i].y, 300, 200);
                        ctx.strokeStyle = wall[i].color2; ctx.lineWidth = 3;
                        ctx.rect(wall[i].x, wall[i].y, 300, 200); ctx.stroke();
                        ctx.rect(wall[i].x + 50, wall[i].y, 100, 200); ctx.stroke();
                        ctx.rect(wall[i].x + 150, wall[i].y, 100, 200); ctx.stroke();
                        break;
                    case 2:
                        ctx.fillStyle = wall[i].color; ctx.fillRect(wall[i].x, wall[i].y, 125, 425);
                        ctx.strokeStyle = wall[i].color2; ctx.lineWidth = 3;
                        ctx.beginPath(); ctx.rect(wall[i].x, wall[i].y, 125, 425); ctx.stroke();
                        ctx.rect(wall[i].x, wall[i].y + 50, 125, 100); ctx.stroke();
                        ctx.rect(wall[i].x, wall[i].y + 150, 125, 100); ctx.stroke();
                        ctx.rect(wall[i].x, wall[i].y + 250, 125, 100); ctx.stroke();
                        break;
                }
        }
    }
}

function drawEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        switch (enemies[i].id) {
            default:
                ctx.fillStyle = enemies[i].color;
                ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].w, enemies[i].h);
            case 1:
                ctx.globalAlpha = 0.4;
                ctx.fillStyle = enemies[i].color;
                ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].w, enemies[i].h);
                ctx.globalAlpha = 1.0;
        }
    }
}

function drawChests() {
    for (let i = 0; i < chests.length; i++) {
        ctx.fillStyle = chests[i].color1;
        ctx.fillRect(chests[i].x, chests[i].y, 50, 40);
        ctx.strokeStyle = chests[i].color2; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.rect(chests[i].x, chests[i].y, 50, 40); ctx.stroke();
        ctx.rect(chests[i].x, chests[i].y + 15, 50, 1); ctx.stroke();
        ctx.rect(chests[i].x + 20, chests[i].y + 15, 10, 5); ctx.stroke();
    }
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    touchChests();
}

function moveLeft() {
    for (let i = 0; wall.length > i; i++)
        wall[i].x += player.speed;
    for (let i = 0; enemies.length > i; i++)
        enemies[i].x += player.speed;
    for (let i = 0; chests.length > i; i++)
        chests[i].x += player.speed;
}

function moveRight() {
    for (let i = 0; wall.length > i; i++)
        wall[i].x -= player.speed;
    for (let i = 0; enemies.length > i; i++)
        enemies[i].x -= player.speed;
    for (let i = 0; chests.length > i; i++)
        chests[i].x -= player.speed;
}

function moveUp() {
    for (let i = 0; wall.length > i; i++)
        wall[i].y += player.speed;
    for (let i = 0; enemies.length > i; i++)
        enemies[i].y += player.speed;
    for (let i = 0; chests.length > i; i++)
        chests[i].y += player.speed;
}

function moveDown() {
    for (let i = 0; wall.length > i; i++)
        wall[i].y -= player.speed;
    for (let i = 0; enemies.length > i; i++)
        enemies[i].y -= player.speed;
    for (let i = 0; chests.length > i; i++)
        chests[i].y -= player.speed;
}

function getDistance(x1, y1, x2, y2) {
    const xDiff = x1 - x2;
    const yDiff = y1 - y2;

    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

function enemyMove() {

    if (player.invisFrames == 100)
        player.invisFrames = -1;
    else if (player.invisFrames != -1)
        player.invisFrames++;

    for (let i = 0; i < enemies.length; i++) {
        const distance = getDistance(player.x + (player.w / 2), player.y + (player.h / 2), enemies[i].x + (enemies[i].w / 2), enemies[i].y + (enemies[i].h / 2));

        switch (enemies[i].id) {

            case 1:
                if (distance < 350) {
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
                break;

            default:
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
        enemyAttacksPlayer(enemies[i]);
    }
}

function enemyAttacksPlayer(sierra) {
    if (player.y <= sierra.y + sierra.h && player.x <= sierra.x + sierra.w && player.y + player.h >= sierra.y && player.x + player.w >= sierra.x)
        takeDamage();
}

function takeDamage() {
    if (player.invisFrames > -1)
        return;

    player.health--;
    player.invisFrames = 0;

    if (player.health == 0)
        playerDeath();
}

function playerDeath() {
    hideGame();
    showEnd();
}

function attackDagger() {

    if (player.attackFrames == -1)
        return;

    for (let i = 0; i < enemies.length; i++) {
        switch (enemies[i].id) {
            default:
                switch (player.attackDir) {
                    case "up":
                        if (player.y - 20 <= enemies[i].y + enemies[i].h && player.x <= enemies[i].x + enemies[i].w && player.y + player.h - 20 >= enemies[i].y && player.x + player.w >= enemies[i].x)
                            enemies.splice(i, 1);
                        break;
                    case "down":
                        if (player.y + 20 <= enemies[i].y + enemies[i].h && player.x <= enemies[i].x + enemies[i].w && player.y + player.h + 20 >= enemies[i].y && player.x + player.w >= enemies[i].x)
                            enemies.splice(i, 1);
                        break;
                    case "left":
                        if (player.y <= enemies[i].y + enemies[i].h && player.x - 20 <= enemies[i].x + enemies[i].w && player.y + player.h >= enemies[i].y && player.x + player.w - 20 >= enemies[i].x)
                            enemies.splice(i, 1);
                        break;
                    case "right":
                        if (player.y <= enemies[i].y + enemies[i].h && player.x + 20 <= enemies[i].x + enemies[i].w && player.y + player.h >= enemies[i].y && player.x + player.w + 20 >= enemies[i].x)
                            enemies.splice(i, 1);
                        break;
                }
            case 1:
        }
    }
}

function detectWalls() {

    for (let i = 0; wall.length > i; i++) {

        switch (wall[i].id) {

            case 0: case 1:
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
                break;
        }
    }
}

function touchChests() {
    for (let i = 0; chests.length > i; i++) {
        if (player.y < chests[i].y + 40 && player.x < chests[i].x + 50 && player.y + player.h > chests[i].y && player.x + player.w > chests[i].x) {
            chests.splice(i, 1);
            player.chests++;
        }
    }
}

function triggerEvent(sasha) {
    switch (sasha) { // 0-99 varattu JM, 100-199 varattu JT
        // 0 = endgame
        // 1 = overlay change

        case 0:
            if (player.chests >= 4) // Currently 0, increase on release
                player.active = false;
            return;
        case 1:
            stage.overlay = 4;
            return;
        case 2:
            stage.overlay = 5;
            return;
        case 3:
            stage.overlay = 6;
            return;
        case 4:
            stage.overlay = 0;
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

    if (!(player.active))
        return;

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
            if (player.attackFrames != -1)
                return;
            player.attackDir = "up";
            player.attackFrames = 0;
            return;
        case "ArrowLeft":
            //attack left
            if (player.attackFrames != -1)
                return;
            player.attackDir = "left";
            player.attackFrames = 0;
            return;
        case "ArrowDown":
            //attack down
            if (player.attackFrames != -1)
                return;
            player.attackDir = "down";
            player.attackFrames = 0;
            return;
        case "ArrowRight":
            //attack right
            if (player.attackFrames != -1)
                return;
            player.attackDir = "right";
            player.attackFrames = 0;
            return;

        // Cheats

        case "o":
            // Increse speed
            if (gameSettings.devMode) {
                if (player.speed == 5)
                    player.speed = 50;
                else
                    player.speed = 5;
                return;
            }
    }
})

function update() {
    clear();

    newPos();

    drawWalls();
    drawChests();

    if (!(stage.endFrame >= 120))
        drawPlayer();
    attackDagger()
    drawEnemies();
    drawAttack();

    drawOverlay();

    if (player.active) {
        enemyMove();
        playSounds();
        drawHUD();
    } else
        endGame();

    requestAnimationFrame(update);
}

function endGame() {

    if (stage.endFrame >= 180) {
        for (let i = 0; wall.length > i; i++) {
            wall[i].x++;

            if (stage.endFrame >= 210 && wall[i].id == 6)
                wall[i].y--;
        }
    }

    switch (stage.endFrame) {
        case 0:
            stage.overlay = 10;
            stage.endFrame++;
            break;
        case 180:
        case 220:
        case 260:
        case 300:
        case 340:
        case 380:
        case 420:
        case 460:
        case 480:
        case 500:
            stage.overlay++;
        default:
            stage.endFrame++;
            if (stage.endFrame < 580)
                return;

            // End screen

            if (stage.endFrame <= 850) {
                ctx.fillStyle = "silver";
                ctx.font = "30px Arial";
                ctx.fillText("Thank you for playing our game!", midx - 200, midy);
            } if (stage.endFrame >= 925 && stage.endFrame <= 1200) {
                ctx.fillStyle = "silver";
                ctx.font = "30px Arial";
                ctx.fillText("Made by JT & JM", midx - 180, midy);
            }

            if (stage.endFrame == 1400)
                resetGame();
    }
}

function resetGame() {
    location.reload();
}

function toggleVolume() {
    if (gameSettings.volume) {
        gameSettings.volume = false;
        soundBtn.style.background = "red";
    } else {
        gameSettings.volume = true;
        soundBtn.style.background = "darkgreen";
    }
}

function toggleDevMode() {
    if (gameSettings.devMode)
        gameSettings.devMode = false;
    else
        gameSettings.devMode = true;
}

function playSounds() {
    if (!(gameSettings.volume))
        return;

    if (player.attackFrames == 2) {
        knifemelee01.play();
        console.log("meleeknife1");
    }

    if (!(player.moveDir == "none")) {
        if (player.footsteps == 17) {
            player.footsteps = 0;
            switch (Math.floor(Math.random() * 4)) {
                case 0:
                    //footstep01.play();
                    console.log("footstepsound1");
                    return;
                case 1:
                    //footstep02.play();
                    console.log("footstepsound2");
                    return;
                case 2:
                    //footstep03.play();
                    console.log("footstepsound3");
                    return;
                case 3:
                    //footstep04.play();
                    console.log("footstepsound4");
                    return;
            }
        }
        player.footsteps++;
    } else
        player.footsteps = 0;
}

function drawOverlay() {

    switch (stage.overlay) {
        case 0: // Empty
            break;
        case 1: // Warm sunset
            ctx.globalAlpha = 0.1;
            ctx.fillStyle = "orange";
            ctx.fillRect(0, 0, 600, 600);
            break;
        case 2: // Nighttime
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = "darkblue";
            ctx.fillRect(0, 0, 600, 600);
            break;
        case 3: // Nuclear fallout / Alien
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = "green";
            ctx.fillRect(0, 0, 600, 600);
            break;
        case 4: // Foggy level 1
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = "lightblue";
            ctx.fillRect(0, 0, 600, 600);
            break;
        case 5: // Foggy level 2
            ctx.globalAlpha = 0.1;
            ctx.fillStyle = "lightblue";
            ctx.fillRect(0, 0, 50, 600);
            ctx.fillRect(50, 0, 550, 50);
            ctx.fillRect(550, 50, 50, 550);
            ctx.fillRect(50, 550, 500, 50);

            ctx.globalAlpha = 0.5;
            ctx.fillRect(0, 0, 600, 600);
            break;
        case 6: // Foggy level 3
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = "lightblue";
            ctx.fillRect(0, 0, 50, 600);
            ctx.fillRect(50, 0, 550, 50);
            ctx.fillRect(550, 50, 50, 550);
            ctx.fillRect(50, 550, 500, 50);

            ctx.globalAlpha = 0.2;
            ctx.fillRect(50, 50, 500, 50);
            ctx.fillRect(50, 100, 50, 450);
            ctx.fillRect(500, 100, 50, 400);
            ctx.fillRect(100, 500, 450, 50);

            ctx.globalAlpha = 0.1;
            ctx.fillRect(100, 100, 400, 50);
            ctx.fillRect(100, 150, 50, 350);
            ctx.fillRect(450, 150, 50, 350);
            ctx.fillRect(150, 450, 300, 50);

            ctx.globalAlpha = 0.75;
            ctx.fillRect(0, 0, 600, 600);
            break;
        case 10: // Blackout none
            break;
        case 11: // Blackout 1
            ctx.globalAlpha = 0.1;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 600, 600);
            break;
        case 12: // Blackout 2
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 600, 600);
            break;
        case 13: // Blackout 3
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 600, 600);
            break;
        case 14: // Blackout 4
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 600, 600);
            break;
        case 15: // Blackout 5
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 600, 600);
            break;
        case 16: // Blackout 6
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 600, 600);
            break;
        case 17: // Blackout 7
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 600, 600);
            break;
        case 18: // Blackout 8
            ctx.globalAlpha = 0.8;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 600, 600);
            break;
        case 19: // Blackout 9
            ctx.globalAlpha = 0.9;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 600, 600);
            break;
        case 20: // Blackout 10
            ctx.globalAlpha = 1.0;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 600, 600);
            break;
        case 666: // It's A Secret To Everybody
            return;
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = "darkblue";
            ctx.fillRect(0, 0, 600, 600);
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

    if (stage.mapStartFrames < 250) {
        stage.mapStartFrames++;
        ctx.fillStyle = "black";
        ctx.font = "25px Arial";
        ctx.fillText("Find 4 chests to leave the island", 120, 280);
    } else {
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Health: " + player.health + "/6", 5, 20);

        if (player.chests == 4)
            ctx.fillText("The ship is waiting for you by the docks", 5, 595);
        else
            ctx.fillText("Chests: " + player.chests + "/4", 5, 595);
    }
}
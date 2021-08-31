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
    attackFrames: -1, //max 25
    png: null //Halutaanko kuvat myöhemmin?
}

const wall = [
    {
        x: 0,
        y: 0,
        h: 600,
        w: 50,
        speed: 0,
        color: 'blue',
        dx: 0,
        dy: 0
    },
    {
        x: 100,
        y: 0,
        h: 500,
        w: 100,
        speed: 0,
        color: 'blue',
        dx: 0,
        dy: 0
    }
]

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.w, player.h);
}

var attackUp = false;
var attackLeft = false;
var attackRight = false;
var attackDown = false;

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
    console.log(player.attackFrames);
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

function detectWalls() {
    // Ei toimi
    // //Vasen puoli seinästä
    // if (player.x + player.w > wall.x && player.y + player.h > wall.y && player.y > wall.y + wall.h) {
    //     //törmää seinään pääse ohi ylä- ja alapuolelta?
    //     console.log('hit left');
    // }
    // //Oikea puoli seinästä
    // if (player.x < wall.x + wall.w && player.y + player.h > wall.y && player.y > wall.y + wall.h && player.x > wall.x + wall.w) {
    //     //törmää seinään pääse ohi ylä- ja alapuolelta?
    //     console.log('hit right');
    // } 
}

document.addEventListener("keydown", function (event) {
    //move
    if (event.key === "w") {
        //go up
        console.log("W")
    } else if (event.key === "s") {
        //go down
        console.log("S")
    }

    if (event.key === "a") {
        //go left
        console.log("A")
    } else if (event.key === "d") {
        //go right
        console.log("D")
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
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
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// const skyBtn = document.getElementById('sky-btn');
const overlayBtn = document.getElementById('overlay-btn');
const soundBtn = document.getElementById('sound-btn');

window.addEventListener('load', hideGame);
window.addEventListener('reload', start);
document.getElementById('start-btn').addEventListener('click', start);
// skyBtn.addEventListener('click', changeSky);
overlayBtn.addEventListener('click', changeOverlay);
soundBtn.addEventListener('click', toggleVolume);
document.getElementById('end-btn').addEventListener('click', resetGame);

// skyBtn.disabled = true;
overlayBtn.disabled = true;
soundBtn.disabled = true;

//Asset Warmup
var weapon01 = new Image();
weapon01.src = "img/weapons/steelDagger.png";

var knifemelee01 = new Audio("sounds/player/weapons/knife_slash1.wav");

function start() {
    showGame();
    // skyBtn.disabled = false;
    overlayBtn.disabled = false;
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
        dy: 1.5
    },
    { // Bottom room inside
        x: -100,
        y: 1100,
        w: 30,
        h: 30,
        color: '#b50000',
        dx: 1.5,
        dy: 1.5
    },
    { // Bottom room door
        x: 420,
        y: 1130,
        w: 30,
        h: 30,
        color: '#b50000',
        dx: 1.5,
        dy: 1.5
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
        dy: 1.5
    },
];

const stage = {
    x: null,
    y: null,

    sky: 0,
    overlay: 0,
    map: null,

    endFrame: 0
};

function changeOverlay() {
    if (stage.overlay == 6) {
        stage.overlay = 0;
        return;
    }
    stage.overlay++;
}

// wall.id(0) = CAN be seen and WILL block player, wall.id(1) = CANNOT be seen and WILL block player, wall.id(2) = CAN be seen and will NOT block player
//wall.id(3) = triggers a function on touch, is invisible and doesnt block the player, 0-99 varattu JM, 100-199 varattu JT
const wall = [

    // JM

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
        h: 100,
        w: 200,
        color: "#072e06",
        id: 0
    }, {
        x: 1450,
        y: 550,
        h: 100,
        w: 150,
        color: "#072e06",
        id: 0
    }, {
        x: 1800,
        y: 550,
        h: 100,
        w: 500,
        color: "#072e06",
        id: 0
    },
    { // Right
        x: 1800,
        y: -300,
        h: 450,
        w: 200,
        color: "#072e06",
        id: 0
    }, {
        x: 1800,
        y: 350,
        h: 200,
        w: 200,
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
    },
    {
        x: 1200,
        y: -800,
        h: 850,
        w: 600,
        color: "lightgreen",
        id: 2
    },

    //Swamp

    { //Left
        x: 1050,
        y: 650,
        h: 1550,
        w: 100,
        color: "#072e06",
        id: 0
    },
    { // Right
        x: 2150,
        y: 450,
        h: 700,
        w: 500,
        color: "#072e06",
        id: 0
    }, {
        x: 2150,
        y: 1400,
        h: 800,
        w: 800,
        color: "#072e06",
        id: 0
    }, {
        x: 2950,
        y: 450,
        h: 1500,
        w: 800,
        color: "#072e06",
        id: 0
    },
    { // Ground
        x: 1250,
        y: 550,
        h: 100,
        w: 200,
        color: "lightgreen",
        id: 2
    }, {
        x: 1550,
        y: 550,
        h: 100,
        w: 250,
        color: "lightgreen",
        id: 2
    }, {
        x: 1150,
        y: 650,
        h: 1350,
        w: 1000,
        color: "lightgreen",
        id: 2
    }, { // Connector Floor
        x: 2150,
        y: 1150,
        h: 250,
        w: 500,
        color: "lightgreen",
        id: 2
    }, {
        x: 2650,
        y: 450,
        h: 950,
        w: 300,
        color: "lightgreen",
        id: 2
    },
    { // Fog change
        x: 1050,
        y: 560,
        h: 1,
        w: 750,
        id: 3,
        event: 4
    }, { // Fog change
        x: 1050,
        y: 580,
        h: 120,
        w: 1500,
        id: 3,
        event: 1
    }, { // Fog change
        x: 1050,
        y: 720,
        h: 250,
        w: 1500,
        id: 3,
        event: 2
    }, { // Fog change
        x: 1050,
        y: 980,
        h: 1010,
        w: 1300,
        id: 3,
        event: 3
    }, { // Fog change
        x: 1050,
        y: 2040,
        h: 1,
        w: 1500,
        id: 3,
        event: 2
    }, { // Fog change
        x: 1050,
        y: 2120,
        h: 1,
        w: 1500,
        id: 3,
        event: 1
    }, { // Fog change
        x: 1050,
        y: 2190,
        h: 1,
        w: 1500,
        id: 3,
        event: 4
    }, { // Fog change Connector
        x: 2380,
        y: 1000,
        h: 500,
        w: 200,
        id: 3,
        event: 2
    }, { // Fog change Connector
        x: 2600,
        y: 1000,
        h: 500,
        w: 400,
        id: 3,
        event: 1
    }, { // Fog change Connector
        x: 2600,
        y: 800,
        h: 180,
        w: 400,
        id: 3,
        event: 4
    },
    { // Water
        x: 1250,
        y: 1600,
        h: 200,
        w: 400,
        color: "#4A83F5",
        id: 2
    }, {
        x: 1750,
        y: 1600,
        h: 240,
        w: 200,
        color: "#4A83F5",
        id: 2
    }, {
        x: 1350,
        y: 1400,
        h: 150,
        w: 250,
        color: "#4A83F5",
        id: 2
    }, {
        x: 1720,
        y: 1400,
        h: 120,
        w: 210,
        color: "#4A83F5",
        id: 2
    }, {
        x: 1750,
        y: 1100,
        h: 220,
        w: 220,
        color: "#4A83F5",
        id: 2
    }, {
        x: 1450,
        y: 800,
        h: 330,
        w: 160,
        color: "#4A83F5",
        id: 2
    }, {
        x: 1200,
        y: 950,
        h: 320,
        w: 220,
        color: "#4A83F5",
        id: 2
    },
    { // Brickwall
        x: 1150,
        y: 1980,
        h: 20,
        w: 400,
        color: "gray",
        id: 0
    }, {
        x: 1750,
        y: 1980,
        h: 20,
        w: 400,
        color: "gray",
        id: 0
    },

    // Front yard

    { // Grass
        x: 1150,
        y: 2000,
        h: 200,
        w: 400,
        color: "lightgreen",
        id: 2
    }, {
        x: 1750,
        y: 2000,
        h: 200,
        w: 400,
        color: "lightgreen",
        id: 2
    }, { // Road
        x: 1550,
        y: 1900,
        h: 300,
        w: 200,
        color: "#F3A15E",
        id: 2
    },

    //Estate

    { // Floor
        x: 1150,
        y: 2200,
        h: 500,
        w: 1000,
        color: "lightgray",
        id: 2
    }, { // Front Wall
        x: 1150,
        y: 2200,
        h: 10,
        w: 420,
        color: "gray",
        id: 0
    }, {
        x: 1730,
        y: 2200,
        h: 10,
        w: 420,
        color: "gray",
        id: 0
    }, { // Left Wall
        x: 1150,
        y: 2200,
        h: 500,
        w: 10,
        color: "gray",
        id: 0
    }, { // Left Wall
        x: 1150,
        y: 2200,
        h: 500,
        w: 10,
        color: "gray",
        id: 0
    }, { // Bottom Wall
        x: 1150,
        y: 2690,
        h: 10,
        w: 1000,
        color: "gray",
        id: 0
    }, { // Right Wall
        x: 2140,
        y: 2200,
        h: 500,
        w: 10,
        color: "gray",
        id: 0
    }, { // Middle Wall
        x: 1400,
        y: 2445,
        h: 10,
        w: 500,
        color: "gray",
        id: 0
    }, {
        x: 1150,
        y: 2445,
        h: 10,
        w: 100,
        color: "gray",
        id: 0
    }, {
        x: 1500,
        y: 2350,
        h: 100,
        w: 10,
        color: "gray",
        id: 0
    }, {
        x: 1800,
        y: 2350,
        h: 100,
        w: 10,
        color: "gray",
        id: 0
    }, { //red
        x: 1425,
        y: 2500,
        h: 150,
        w: 450,
        color: "darkred",
        id: 2
    }, { //Gold edge
        x: 1425,
        y: 2500,
        h: 5,
        w: 450,
        color: "GoldenRod",
        id: 2
    }, {
        x: 1425,
        y: 2645,
        h: 5,
        w: 450,
        color: "GoldenRod",
        id: 2
    }, {
        x: 1870,
        y: 2500,
        h: 150,
        w: 5,
        color: "GoldenRod",
        id: 2
    }, {
        x: 1425,
        y: 2500,
        h: 150,
        w: 5,
        color: "GoldenRod",
        id: 2
    },

    // Beach 2

    { //Main entry
        x: 1800,
        y: 150,
        h: 200,
        w: 200,
        color: "lightgreen",
        id: 2
    }, {
        x: 2000,
        y: 0,
        h: 450,
        w: 1500,
        color: "lightgreen",
        id: 2
    },
    { //small forest fix
        x: 2000,
        y: 450,
        h: 100,
        w: 200,
        color: "#072e06",
        id: 0
    },
    { //ocean
        x: 2000,
        y: -300,
        h: 200,
        w: 2400,
        color: "#4A83F5",
        id: 0
    }, {
        x: 2600,
        y: -100,
        h: 200,
        w: 1800,
        color: "#4A83F5",
        id: 0
    }, {
        x: 2900,
        y: 100,
        h: 100,
        w: 1500,
        color: "#4A83F5",
        id: 0
    }, {
        x: 3200,
        y: 200,
        h: 250,
        w: 1500,
        color: "#4A83F5",
        id: 0
    },
    { //beach
        x: 2000,
        y: -100,
        h: 100,
        w: 600,
        color: "#FCB983",
        id: 2
    }, {
        x: 2500,
        y: -100,
        h: 300,
        w: 100,
        color: "#FCB983",
        id: 2
    }, {
        x: 2500,
        y: 100,
        h: 100,
        w: 400,
        color: "#FCB983",
        id: 2
    }, {
        x: 2800,
        y: 100,
        h: 200,
        w: 100,
        color: "#FCB983",
        id: 2
    }, {
        x: 2800,
        y: 200,
        h: 100,
        w: 400,
        color: "#FCB983",
        id: 2
    }, {
        x: 3100,
        y: 200,
        h: 250,
        w: 100,
        color: "#FCB983",
        id: 2
    },

    // Beach 1

    { // beach
        x: 1085,
        y: -800,
        h: 500,
        w: 115,
        color: "#FCB983",
        id: 2
    },
    {
        x: 1085,
        y: -915,
        h: 115,
        w: 715,
        color: "#FCB983",
        id: 2
    },
    {
        x: 1800,
        y: -915,
        h: 615,
        w: 115,
        color: "#FCB983",
        id: 2
    },
    { // ocean
        x: 500,
        y: -915,
        h: 615,
        w: 585,
        color: "#4A83F5",
        id: 0
    },
    {
        x: 500,
        y: -1500,
        h: 585,
        w: 800,
        color: "#4A83F5",
        id: 0
    },
    {
        x: 1915,
        y: -1500,
        h: 1200,
        w: 2500,
        color: "#4A83F5",
        id: 0
    },
    {
        x: 1425,
        y: -1500,
        h: 585,
        w: 500,
        color: "#4A83F5",
        id: 0
    },
    {
        x: 1300,
        y: -1500,
        h: 325,
        w: 125,
        color: "#4A83F5",
        id: 0
    },
    {
        x: 1300,
        y: -1175,
        h: 425,
        w: 125,
        color: "#EF785A",
        id: 2
    },

    {
        x: 950,
        y: -1400,
        h: 425,
        w: 250,
        color: "#B65709",
        id: 6
    }, {
        x: 950,
        y: -1400,
        h: 425,
        w: 20,
        color: "#9B4805",
        id: 6
    }, {
        x: 1200,
        y: -1400,
        h: 425,
        w: 20,
        color: "#9B4805",
        id: 6
    }, {
        x: 950,
        y: -995,
        h: 20,
        w: 250,
        color: "#9B4805",
        id: 6
    }, {
        x: 985,
        y: -990,
        h: 20,
        w: 200,
        color: "#9B4805",
        id: 6
    }, {
        x: 1015,
        y: -985,
        h: 20,
        w: 150,
        color: "#9B4805",
        id: 6
    },

    { // Triggers end-game
        x: 1300,
        y: -1175,
        h: 100,
        w: 125,
        color: "#EF785A",
        id: 3,
        event: 0
    },

    // JT

    // Ground
    {
        x: -200,
        y: -300,
        h: 1600,
        w: 1000,
        color: "lightgreen",
        id: 2
    },
    {
        x: -200,
        y: -600,
        h: 350,
        w: 700,
        color: "lightgreen",
        id: 2
    },
    { // Floor
        x: -200,
        y: 700,
        h: 550,
        w: 645,
        color: "#d1d1d1",
        id: 2
    },
    {
        x: -200,
        y: -600,
        h: 370,
        w: 700,
        color: "#cca162",
        id: 2
    },


    // Flowers
    // yellow
    { // Left and right leaf
        x: 750,
        y: -50,
        h: 10,
        w: 30,
        color: "#fcb503",
        id: 2
    },
    { // Top and bottom leaf
        x: 760,
        y: -60,
        h: 30,
        w: 10,
        color: "#fcb503",
        id: 2
    },
    { // Middle
        x: 760,
        y: -50,
        h: 10,
        w: 10,
        color: "#524600",
        id: 2
    },
    { // Left and right leaf
        x: 700,
        y: -100,
        h: 10,
        w: 30,
        color: "#fcb503",
        id: 2
    },
    { // Top and bottom leaf
        x: 710,
        y: -110,
        h: 30,
        w: 10,
        color: "#fcb503",
        id: 2
    },
    { // Middle
        x: 710,
        y: -100,
        h: 10,
        w: 10,
        color: "#524600",
        id: 2
    },
    { // Left and right leaf
        x: 760,
        y: 550,
        h: 10,
        w: 30,
        color: "#fcb503",
        id: 2
    },
    { // Top and bottom leaf
        x: 770,
        y: 540,
        h: 30,
        w: 10,
        color: "#fcb503",
        id: 2
    },
    { // Middle
        x: 770,
        y: 550,
        h: 10,
        w: 10,
        color: "#524600",
        id: 2
    },
    { // Left and right leaf
        x: 750,
        y: 850,
        h: 10,
        w: 30,
        color: "#fcb503",
        id: 2
    },
    { // Top and bottom leaf
        x: 760,
        y: 840,
        h: 30,
        w: 10,
        color: "#fcb503",
        id: 2
    },
    { // Middle
        x: 760,
        y: 850,
        h: 10,
        w: 10,
        color: "#524600",
        id: 2
    },
    // white
    { // Left and right leaf
        x: 270,
        y: 50,
        h: 10,
        w: 30,
        color: "#f4f4f4",
        id: 2
    },
    { // Top and bottom leaf
        x: 280,
        y: 40,
        h: 30,
        w: 10,
        color: "#f4f4f4",
        id: 2
    },
    { // Middle
        x: 280,
        y: 50,
        h: 10,
        w: 10,
        color: "#524600",
        id: 2
    },
    { // Left and right leaf
        x: 290,
        y: 450,
        h: 10,
        w: 30,
        color: "#f4f4f4",
        id: 2
    },
    { // Top and bottom leaf
        x: 300,
        y: 440,
        h: 30,
        w: 10,
        color: "#f4f4f4",
        id: 2
    },
    { // Middle
        x: 300,
        y: 450,
        h: 10,
        w: 10,
        color: "#524600",
        id: 2
    },
    { // Top and bottom leaf
        x: -40,
        y: 300,
        h: 30,
        w: 10,
        color: "#f4f4f4",
        id: 2
    },
    { // Left and right leaf
        x: -50,
        y: 310,
        h: 10,
        w: 30,
        color: "#f4f4f4",
        id: 2
    },
    { // Middle
        x: -40,
        y: 310,
        h: 10,
        w: 10,
        color: "#524600",
        id: 2
    },

    // Walls
    {  // Bottom
        x: -200,
        y: 1300,
        h: 350,
        w: 1000,
        color: "#072e06",
        id: 0
    },
    {  // Left
        x: -500,
        y: -900,
        h: 2500,
        w: 300,
        color: "#072e06",
        id: 0
    },
    { // Top
        x: -200,
        y: -900,
        h: 350,
        w: 700,
        color: "#072e06",
        id: 0
    },

    // Inner walls
    { // Top room walls
        x: -50,
        y: -300,
        h: 150,
        w: 850,
        color: "#072e06",
        id: 0
    },
    {
        x: 400,
        y: -550,
        h: 250,
        w: 100,
        color: "#072e06",
        id: 0
    },
    { // Bottom room walls
        x: -200,
        y: 600,
        h: 100,
        w: 700,
        color: "#3d3d3d",
        id: 0
    },
    {
        x: 400,
        y: 700,
        h: 400,
        w: 100,
        color: "#3d3d3d",
        id: 0
    },
    {
        x: 200,
        y: 800,
        h: 400,
        w: 100,
        color: "#3d3d3d",
        id: 0
    },
    {
        x: -300,
        y: 600,
        h: 700,
        w: 100,
        color: "#3d3d3d",
        id: 0
    },
    {
        x: -200,
        y: 1200,
        h: 100,
        w: 700,
        color: "#3d3d3d",
        id: 0
    },

    // Middle

    { // river
        x: 800,
        y: -300,
        h: 2000,
        w: 250,
        color: "#6396FA",
        id: 2
    },
    {
        x: 850,
        y: -300,
        h: 500,
        w: 150,
        color: "#4A83F5",
        id: 0
    },
    {
        x: 850,
        y: 400,
        h: 1300,
        w: 150,
        color: "#4A83F5",
        id: 0
    },
    {
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
    },
    {
        x: 800,
        y: 550,
        h: 650,
        w: 250,
        id: 1
    },
];

const chests = [

    // JT

    { // Left map side, bottom
        x: -50,
        y: 1125,
        h: 60,
        w: 90,
        color1: '#3b1e09',
        color2: '#f7b525'
    },
    { // Left map side, top
        x: 320,
        y: -460,
        h: 90,
        w: 60,
        color1: 'oak',
        color2: 'silver'
    },

    // JM

    { // Estate
        x: 1630,
        y: 2555,
        h: 40,
        w: 50,
        color1: 'Sienna',
        color2: 'LightSteelBlue'
    },
    { // Beach 2
        x: 2825,
        y: 125,
        h: 40,
        w: 50,
        color1: 'oak',
        color2: 'SeaShell'
    },

];

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
                    ctx.strokeStyle = "black";
                    ctx.beginPath();
                    ctx.rect(wall[i].x, wall[i].y, wall[i].w, wall[i].h);
                    ctx.stroke();
                }
                break;
            case 3:
                if (gameSettings.devMode) {
                    ctx.strokeStyle = "orange";
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
        ctx.fillRect(chests[i].x, chests[i].y, chests[i].w, chests[i].h);
        ctx.strokeStyle = chests[i].color2;
        ctx.beginPath();
        ctx.rect(chests[i].x, chests[i].y, chests[i].w, chests[i].h);
        ctx.lineWidth = 3;
        ctx.stroke();
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
    detectChests();

}

function moveLeft() {
    for (let i = 0; wall.length > i; i++) {
        wall[i].x += player.speed;
    }
    for (let i = 0; enemies.length > i; i++) {
        enemies[i].x += player.speed;
    }
    for (let i = 0; chests.length > i; i++) {
        chests[i].x += player.speed;
    }
}

function moveRight() {
    for (let i = 0; wall.length > i; i++) {
        wall[i].x -= player.speed;
    }
    for (let i = 0; enemies.length > i; i++) {
        enemies[i].x -= player.speed;
    }
    for (let i = 0; chests.length > i; i++) {
        chests[i].x -= player.speed;
    }
}

function moveUp() {
    for (let i = 0; wall.length > i; i++) {
        wall[i].y += player.speed;
    }
    for (let i = 0; enemies.length > i; i++) {
        enemies[i].y += player.speed;
    }
    for (let i = 0; chests.length > i; i++) {
        chests[i].y += player.speed;
    }
}

function moveDown() {
    for (let i = 0; wall.length > i; i++) {
        wall[i].y -= player.speed;
    }
    for (let i = 0; enemies.length > i; i++) {
        enemies[i].y -= player.speed;
    }
    for (let i = 0; chests.length > i; i++) {
        chests[i].y -= player.speed;
    }
}

function getDistance(x1, y1, x2, y2) {
    const xDiff = x1 - x2;
    const yDiff = y1 - y2;

    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

function enemyMove() {
    if (player.invisFrames == 100) {
        player.invisFrames = -1;
    } else if (player.invisFrames != -1) {
        player.invisFrames++;
    }

    for (let i = 0; i < enemies.length; i++) {
        const distance = getDistance(player.x + (player.w / 2), player.y + (player.h / 2), enemies[i].x + enemies[i].w / 2, enemies[i].y + enemies[i].h / 2);


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
        enemyAttacksPlayer();
    }
}


function enemyAttacksPlayer() {
    for (let i = 0; i < enemies.length; i++) {

        if (player.y <= enemies[i].y + enemies[i].h && player.x <= enemies[i].x + enemies[i].w && player.y + player.h >= enemies[i].y && player.x + player.w >= enemies[i].x) {
            takeDamage();
        }
    }
}

function takeDamage() {
    if (player.invisFrames > -1) {
        return;
    }

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

    if (player.attackFrames == -1) {
        return;
    }
    for (let i = 0; i < enemies.length; i++) {
        switch (player.attackDir) {
            case "up":
                if (player.y - 20 <= enemies[i].y + enemies[i].h && player.x <= enemies[i].x + enemies[i].w && player.y + player.h - 20 >= enemies[i].y && player.x + player.w >= enemies[i].x) {
                    enemies.splice(i, 1);
                }
                break;
            case "down":
                if (player.y + 20 <= enemies[i].y + enemies[i].h && player.x <= enemies[i].x + enemies[i].w && player.y + player.h + 20 >= enemies[i].y && player.x + player.w >= enemies[i].x) {
                    enemies.splice(i, 1);
                }
                break;
            case "left":
                if (player.y <= enemies[i].y + enemies[i].h && player.x - 20 <= enemies[i].x + enemies[i].w && player.y + player.h >= enemies[i].y && player.x + player.w - 20 >= enemies[i].x) {
                    enemies.splice(i, 1);
                }
                break;
            case "right":
                if (player.y <= enemies[i].y + enemies[i].h && player.x + 20 <= enemies[i].x + enemies[i].w && player.y + player.h >= enemies[i].y && player.x + player.w + 20 >= enemies[i].x) {
                    enemies.splice(i, 1);
                }
                break;
        }
    }
}

function detectWalls() {

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
                break;
        }
    }
}

function detectChests() {
    for (let i = 0; chests.length > i; i++) {
        if (player.y < chests[i].y + chests[i].h && player.x < chests[i].x + chests[i].w && player.y + player.h > chests[i].y && player.x + player.w > chests[i].x) {
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

// Animation when the chest is touched? Blinking or something? Right now just disappears when touched.
function touchChests() {
    for (let i = 0; chests.length > i; i++) {
        if (player.y < chests[i].y + chests[i].h && player.x < chests[i].x + chests[i].w && player.y + player.h > chests[i].y && player.x + player.w > chests[i].x) {
            console.log('chest touch');
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
            console.log("Player has touched the escape area");
            if (player.chests >= 0) // Currently 0, increase on release
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

        // Cheats

        case "o":
            // Increse speed
            if (gameSettings.devMode) {
                if (player.speed == 5) {
                    player.speed = 50;

                } else {
                    player.speed = 5;
                }
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
    } else {
        endGame();
    }

    requestAnimationFrame(update);
}

function endGame() {

    if (stage.endFrame >= 180) {
        for (let i = 0; wall.length > i; i++) {
            wall[i].x += 1;

            if (stage.endFrame >= 210 && wall[i].id == 6)
                wall[i].y -= 1;
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
            if (stage.endFrame < 580) {
                return;
            }

            // End screen

            if (stage.endFrame <= 850) {
                ctx.fillStyle = "silver";
                ctx.font = "30px Arial";
                ctx.fillText("Thank you for playing our game!", midx - 200, midy);
            } if (stage.endFrame >= 925 && stage.endFrame <= 1200) {
                ctx.fillStyle = "silver";
                ctx.font = "30px Arial";
                ctx.fillText("Made by JT & JM", midx - 200, midy);
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
    } else {
        player.footsteps = 0;
    }
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

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Health: " + player.health + '/6', 5, 20);
    ctx.fillText("Chests: " + player.chests + '/4', 5, 595);
}
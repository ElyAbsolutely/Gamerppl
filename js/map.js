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
    { //Flowers
        x: 2700,
        y: 250,
        color: "#524600",
        color2: "#fcb503",
        id: 5,
        decal: 0
    }, {
        x: 2300,
        y: 30,
        color: "#524600",
        color2: "#fcb503",
        id: 5,
        decal: 0
    }, {
        x: 2250,
        y: 15,
        color: "#524600",
        color2: "#fcb503",
        id: 5,
        decal: 0
    }, {
        x: 2100,
        y: 40,
        color: "#524600",
        color2: "#fcb503",
        id: 5,
        decal: 0
    }, {
        x: 2900,
        y: 320,
        color: "#524600",
        color2: "#f4f4f4",
        id: 5,
        decal: 0
    }, {
        x: 2940,
        y: 335,
        color: "#524600",
        color2: "#f4f4f4",
        id: 5,
        decal: 0
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
    //Flowers
    {
        x: 1230,
        y: 520,
        color: "#524600",
        color2: "#fcb503",
        id: 5,
        decal: 0
    }, {
        x: 1080,
        y: 100,
        color: "#524600",
        color2: "#fcb503",
        id: 5,
        decal: 0
    }, {
        x: 1680,
        y: -720,
        color: "#524600",
        color2: "#fcb503",
        id: 5,
        decal: 0
    }, {
        x: 1550,
        y: -770,
        color: "#524600",
        color2: "#fcb503",
        id: 5,
        decal: 0
    }, {
        x: 1240,
        y: -760,
        color: "#524600",
        color2: "#fcb503",
        id: 5,
        decal: 0
    }, {
        x: 1280,
        y: -730,
        color: "#524600",
        color2: "#fcb503",
        id: 5,
        decal: 0
    }, {
        x: 1240,
        y: -720,
        color: "#524600",
        color2: "#f4f4f4",
        id: 5,
        decal: 0
    }, {
        x: 1540,
        y: -550,
        color: "#524600",
        color2: "#f4f4f4",
        id: 5,
        decal: 0
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
        color2: "#de5431",
        id: 5,
        decal: 2
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
    {
        x: 760,
        y: -50,
        color: "#524600",
        color2: "#fcb503",
        id: 5,
        decal: 0
    },
    {
        x: 710,
        y: -100,
        color: "#524600",
        color2: "#fcb503",
        id: 5,
        decal: 0
    },
    {
        x: 770,
        y: 550,
        color: "#524600",
        color2: "#fcb503",
        id: 5,
        decal: 0
    },
    {
        x: 760,
        y: 850,
        color: "#524600",
        color2: "#fcb503",
        id: 5,
        decal: 0
    },
    // white
    {
        x: 280,
        y: 50,
        color: "#524600",
        color2: "#f4f4f4",
        id: 5,
        decal: 0
    },
    {
        x: 300,
        y: 450,
        color: "#524600",
        color2: "#f4f4f4",
        id: 5,
        decal: 0
    },
    {
        x: -40,
        y: 310,
        color: "#524600",
        color2: "#f4f4f4",
        id: 5,
        decal: 0
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
        h: 4000,
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
        h: 3300,
        w: 150,
        color: "#4A83F5",
        id: 0
    },
    {
        x: 775,
        y: 200,
        color: "#EF785A",
        color2: "#de5431",
        id: 5,
        decal: 1
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
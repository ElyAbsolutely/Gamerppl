const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

function drawWalls() {    
    ctx.fillRect(20, 20, 40, 40);
    ctx.fillStyle = 'orange';
    ctx.translate
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawWalls();

    requestAnimationFrame(update);
}

update();

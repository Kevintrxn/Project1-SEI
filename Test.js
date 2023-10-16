const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let player;
let gate;
let gameBackground;
let cloud;
let animationId; 

document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');
    const boneCounter = document.getElementById('boneCounter');
    
    startButton.addEventListener('click', function() {
        startButton.style.display = 'none';
        boneCounter.style.display = "block";
        restartButton.style.display = "block";
        startGame();
    });

    restartButton.addEventListener('click', function() {
        if (animationId) {
            cancelAnimationFrame(animationId); 
        }
        startGame(); 
    });
});

const keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
};

let backgroundSprite = new Sprite({
    position: {x:0, y:0}, c: c});
backgroundSprite.draw(); 

function startGame() {
    canvas.width = 1024;
    canvas.height = 550;

    let backgroundIntro = new Sprite({
        position: { x: 0, y: 0 }, 
        width: canvas.width,
        height: canvas.height, 
    });

    player = new Player(c);
    player.width = 150
    player.height = 150
    player.x = 100
    player.y = 100

    gameBackground = new Gamescreen(c);
    gameBackground.width = canvas.width,
    gameBackground.height = canvas.height,
    gameBackground.y = 0
    gameBackground.x = 0

    gate = new Gate(c); 
    gate.width = 300
    gate.height = 300
    gate.y = 200
    gate.x = 720

    cloud = new Cloud(c); 
    cloud.width = 130 
    cloud.height = 75
    cloud.x = 100 
    cloud.y = 400

    function animate() {
        animationId = window.requestAnimationFrame(animate);
        playerInsideGate(player, gate, gameBackground, cloud);
        playerOnStandingCloud(player,cloud); 


        c.clearRect(0, 0, canvas.width, canvas.height);
        backgroundIntro.draw();

        player.velocity.x = 0; 
        if (keys.d.pressed) {
            player.velocity.x = 10;
        } else if (keys.a.pressed) {
            player.velocity.x = -10;
        }

        gate.animateGate();
        gate.draw();
        gameBackground.draw();
        cloud.draw();
        cloud.update();
        player.draw();
        player.update();
    }

    animate();
}


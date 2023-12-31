//player movement controls (WAD)
function onKeyDown(event) {
    switch (event.key) {
        case "w": 
            if (player && player.velocity.y === 0 || player.isOnCloud) { 
                player.velocity.y = -20; 
            }
            break;
        case "a": 
            keys.a.pressed = true;
            break;
        case "d": 
            keys.d.pressed = true;
            break;
    }
}

function onKeyUp(event) {
    switch (event.key) {
        case "a": 
            keys.a.pressed = false;
            break;
        case "d": 
            keys.d.pressed = false;
            break;
    }
}

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

function playerInsideGate(player, gate) {
    if (
        player.position.x < gate.x + gate.width &&
        player.position.x + player.width > gate.x &&
        player.position.y < gate.y + gate.height &&
        player.position.y + player.height > gate.y
    ) {
        gate.startAnimation();
    } else {
        gate.stopAnimation();
    }
}

function gameplay(gate, sprite) {
    if (
        player.position.x < gate.x + gate.width &&
        player.position.x + player.width > gate.x &&
        player.position.y < gate.y + gate.height &&
        player.position.y + player.height > gate.y
    ) {
        sprite.visible = false;
        if (!gate.isDisappearing && gate.isAnimationFinished()) {
            gate.startDisappearing();
        }
    }
}

function playerOnStandingCloud(player, cloud) {
    if (!cloud.visible) {
        player.isOnCloud = false; 
        return;
    }
    else if (
        player.position.x < cloud.x + cloud.width &&
        player.position.x + player.width > cloud.x &&
        player.position.y + player.height > cloud.y &&
        player.position.y < cloud.y + cloud.height
    ) {
        if (player.lastYPosition + player.height <= cloud.y && player.velocity.y >= -2) {
            player.position.y = cloud.y - player.height;
            player.velocity.y = 0;
            player.isOnCloud = true; 
        }
    } else {
        player.isOnCloud = false;
    }
}

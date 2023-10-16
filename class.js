//player animations and initial position for start screen 
class Player {
    constructor(c) {
        this.width = 150;
        this.height = 150;
        this.currentState = 'idle';
        this.currentFrame = 0;
        this.ctx = c;
        this.x = 100;
        this.y = 100;
        this.lastDirection = 'right';
        this.position = {
            x: 150,
            y: 150,
        };
        this.velocity = {
            x: 0,
            y: 0,
        };
        this.gravity = 1;
        this.visible = true;
        this.frameDelay = 0;
        this.idleDelay = 10; 
        this.walkDelay = 5;  
        this.jumpDelay = 7.3; 
        this.states = {
            idle: ['SpritesFixedTest/Idle1.png', 'SpritesFixedTest/Idle2.png'],
            right: ['SpritesFixedTest/rightWalk1.png', 'SpritesFixedTest/rightWalk2.png', 'SpritesFixedTest/rightWalk3.png', 'SpritesFixedTest/rightWalk4.png', 'SpritesFixedTest/rightWalk5.png'],
            left: ['SpritesFixedTest/leftWalk1.png', 'SpritesFixedTest/leftWalk2.png', 'SpritesFixedTest/leftWalk3.png', 'SpritesFixedTest/leftWalk4.png', 'SpritesFixedTest/leftWalk5.png'],
            jumpLeft: ['SpritesFixedTest/leftJump1.png', 'SpritesFixedTest/leftJump2.png'],
            jumpRight: ['SpritesFixedTest/rightJump1.png', 'SpritesFixedTest/rightJump2.png'],
        };
        this.image = new Image();
        this.image.src = this.states.idle[0];
        this.isOnCloud = false;
        this.lastYPosition = this.position.y; 
    }
    draw() {
        if (this.visible) {
            this.ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);  
            this.ctx.strokeStyle = 'red';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
        }
    }
    
    animateState(state) {
        if (this.currentState !== state) {
            this.currentState = state;
            this.currentFrame = 0;
            this.frameDelay = 0;
        }
    
        let currentActiveFrame;
        if (state === 'idle') {
            currentActiveFrame = this.idleDelay;
        } else if (state === 'right' || state === 'left') {
            currentActiveFrame = this.walkDelay;
        } else if (state === 'jumpLeft' || state === 'jumpRight') {
            currentActiveFrame = this.jumpDelay;
        }
    
        if (this.frameDelay < currentActiveFrame) {
            this.frameDelay++;
            return;
        }
    
        if (state === 'right') {
            this.lastDirection = 'right';
        } else if (state === 'left') {
            this.lastDirection = 'left';
        }
    
        this.image.src = this.states[this.currentState][this.currentFrame];
        this.currentFrame = (this.currentFrame + 1) % this.states[this.currentState].length;
        this.frameDelay = 0;
    }
    update() {
        this.lastYPosition = this.position.y;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.velocity.y < 0) { 
            if (this.lastDirection === 'right') {
                this.animateState('jumpRight');
            } else {
                this.animateState('jumpLeft');
            }
        } else if (this.velocity.x > 0) {
            this.animateState('right');
        } else if (this.velocity.x < 0) {
            this.animateState('left');
        } else {
            this.animateState('idle');
        }
            if (this.currentState === 'jumpLeft' || this.currentState === 'jumpRight') {
        if (this.velocity.y > 0 && this.currentFrame === 0) {  
            this.currentFrame = 1;  
        }
    }
        if (this.position.y + this.height < canvas.height) {
            this.velocity.y += this.gravity;
        } else { 
            this.velocity.y = 0; 
            this.position.y = canvas.height - this.height; 
        }
    }
}
class Sprite {
    constructor({position, width, height, c}) {
        this.position = position;
        this.image = new Image();
        this.image.src = "SpritesFixedTest/BackgroundIntro.png";
        this.width = width || canvas.width;
        this.height = height || canvas.height;
        this.c = c;
        this.visible = true;
        this.isActive = true; 
    }
    draw() { 
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);   
    }
    setImageSource(newSrc){
        this.image.src = newSrc;
        this.image.onload = () =>{
            console.log("image loaded", newSrc);
            this.visible = true;
        };
    }
}
class Gamescreen {
    constructor({position, width, height, c}) {
        this.position = position;
        this.c = c; 
        this.images = [];
        this.currentFrame = 0;
        this.visible = false;
        this.isActive = true;
        this.loadImages();
    }
    loadImages() {
        let img = new Image();
        img.onload = () => {
            this.images.push(img);
        }
        img.src = `SpritesFixedTest/Background2.jpeg`;
    }
    draw(){
        if (this.visible){
            c.drawImage(this.images[this.currentFrame], this.x, this.y, this.width, this.height);
        }
    }
        
    resize(newWidth, newHeight) {
        const heightDifference = newHeight - this.height;
        const widthDifference = newWidth - this.width;
        this.y = this.y - heightDifference;
        this.x = this.x - widthDifference;
        this.width = newWidth;
        this.height = newHeight;
    }
    setPosition(newX, newY) {
        this.x = newX;
        this.y = newY;
    }
}
class Cloud {
    constructor(c) {
        this.c = c; 
        this.images = [];
        this.x = 100;
        this.y = 100;
        this.width = 300
        this.height = 300
        this.currentFrame = 0; 
        this.speed = 0; 
        this.isAnimating = false;
        this.visible = false;
        this.isActive = true;
        this.loadImages(); 
    }
    loadImages() {
        let img = new Image();
        img.onload = () => {
            this.images.push(img);
        }
        img.src = `SpritesFixedTest/cloud1.png`;     
    }
    update() {
        this.x -= this.speed;
        this.currentFrame++;
        if (this.currentFrame >= this.images.length) {
            this.currentFrame = 0;
        }
    }
draw() {
        if (this.visible && this.images[this.currentFrame]) {
            this.c.drawImage(
                this.images[this.currentFrame], 
                this.x, this.y, 
                this.width, this.height
            );
            this.c.strokeStyle = "blue"; 
            this.c.lineWidth = 3;
            this.c.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
        
    resize(newWidth, newHeight) {
        const heightDifference = newHeight - this.height;
        const widthDifference = newWidth - this.width;
        this.y = this.y - heightDifference;
        this.x = this.x - widthDifference;
        this.width = newWidth;
        this.height = newHeight;
    }
    setPosition(newX, newY) {
        this.x = newX;
        this.y = newY;
    }
}
class Gate {
    constructor(c) {
        this.c = c; 
        this.images = [];
        this.loadImages();
        this.x = 750;
        this.y = 320;
        this.currentFrame = 0;
        this.frameDelay = 0;
        this.frameDelayAnimation = 8;
        this.isAnimating = false;
        this.visible = true;
        this.isActive = true;
    }
    loadImages() {
        for (let i = 0; i <= 5; i++) {
            let img = new Image();
            img.onload = () => {
                this.images.push(img);
            }
            img.src = `SpritesFixedTest/gate${i}.png`;
            
        }
        
    }
    draw(){
        if (this.visible){
            c.drawImage(this.images[this.currentFrame], this.x, this.y, this.width, this.height);
            this.c.strokeStyle = "blue"; 
            this.c.lineWidth = 3;
            this.c.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
    resize(newWidth, newHeight) {
        const heightDifference = newHeight - this.height;
        const widthDifference = newWidth - this.width;
        this.y = this.y - heightDifference;
        this.x = this.x - widthDifference;
        this.width = newWidth;
        this.height = newHeight;
    }
    setPosition(newX, newY) {
        this.x = newX;
        this.y = newY;
    }
    animateGate() {
        if (!this.isAnimating || this.frameDelay < this.frameDelayAnimation) {
            this.frameDelay++;
            return;
        }
        this.currentFrame++;
        if (this.currentFrame >= this.images.length) {
            this.currentFrame = this.images.length - 1;
            if (this.isAnimationFinished()) {
                this.startDisappearing(); 
            }
        }
        this.frameDelay = 0;
    }
    startAnimation() {
        this.isAnimating = true; 
    }
    stopAnimation() {
        this.isAnimating = false;
        this.currentFrame = 0;
        this.frameDelay = 0;
    }
    isAnimationFinished() {
        return this.currentFrame === this.images.length - 1;
    }
    startDisappearing() {
        if (!this.isDisappearing) {
            this.isDisappearing = true;
            setTimeout(() => {
                this.visible = false;
                this.isActive = false;
                this.onGateDisappeared();
            }, 300);
        }
    }
    onGateDisappeared() {
        backgroundSprite.setImageSource("SpritesFixedTest/Background2.jpeg");
        backgroundSprite.visible = true;
        backgroundSprite.isActive = true;
        this.resetPlayer(player);
        this.changeGamescreen(gameBackground);
        this.showStartCloud(cloud);
    }
    showStartCloud(cloud){
        cloud.visible = true;
    }
    changeGamescreen(gameBackground) {
        gameBackground.visible = true;
    }
    resetPlayer(player) {
        player.position.x = 25; 
        player.position.y = 150; 
    }
}




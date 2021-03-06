// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    var yPos = [60, 143, 226];
    this.y = yPos[Math.floor(Math.random() * yPos.length)];
    this.speed = Math.floor(Math.random() * 300 + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
        // Current enemy reaches end, remove from array.
        var index = allEnemies.indexOf(this);
        allEnemies.splice(index, 1);

        // If there are no enemies, add 2.
        if (allEnemies.length == 0) {
            allEnemies.push(new Enemy());
            allEnemies.push(new Enemy());
        }
    }

    // Check collision
    if (this.y == player.y - 12) {
        if (Math.abs(this.x - player.x) < 77) {
            player.loseScore();
            player.reset();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.initX = 202;
    this.initY = 404;
    this.score = 0;
    this.x = this.initX;
    this.y = this.initY;
    this.xStep = 101;
    this.yStep = 83;
};

Player.prototype.update = function() {
    // Reach water, add score and reset position.
    if (this.y < 0) {
        this.score++;
        this.reset();
    }

    // Randomly add new enemy.
    var num = Math.random() * 1000;
    if (num > 990) {
        allEnemies.push(new Enemy());
    }
};

// Draw the player and current score on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "30px Impact";
    ctx.textAlign = "left";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + this.score, 10, 576);
};

// Update player position based on input key
Player.prototype.handleInput = function(key) {
    if (key == 'left') {
        if (this.x > 0) {
            this.x -= this.xStep;
        }
    }
    else if (key == 'up') {
        if (this.y > 0) {
            this.y -= this.yStep;
        }
    }
    else if (key == 'right') {
        if (this.x < 4 * this.xStep) {
            this.x += this.xStep;
        }
    }
    else if (key == 'down') {
        if (this.y < this.initY) {
            this.y += this.yStep;
        }
    }
}

Player.prototype.loseScore = function() {
    if (this.score > 0) {
        this.score--;
    }
};

Player.prototype.reset = function() {
    this.x = this.initX;
    this.y = this.initY;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

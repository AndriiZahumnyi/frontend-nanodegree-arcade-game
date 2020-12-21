// Enemies our player must avoid
const enemyPosY = [60, 143, 226];

let initialEnemies = 5;

const allEnemies = [];

const enemySpeed = [100, 130, 160, 200, 250, 300, 400];

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -100;
    this.y = enemyPosY[Math.floor(Math.random() * 3)];
    this.speed = enemySpeed[Math.floor(Math.random() * 7)];
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 960) {
        this.x = -100;
        this.y = this.y + 83;
        this.speed = enemySpeed[Math.floor(Math.random() * 7)];
        if (this.y > 226) {
            this.y = 60;
        }
    }

    if (this.x > -50 && this.x < 50) {
      this.tileX = 0;
    } else if (this.x > 50 && this.x < 150) {
      this.tileX = 101;
    } else if (this.x > 150 && this.x < 250) {
      this.tileX = 202;
    } else if (this.x > 250 && this.x < 350) {
      this.tileX = 303;
    } else if (this.x > 350 && this.x < 450) {
      this.tileX = 404;
    } else if (this.x > 450 && this.x < 550) {
      this.tileX = 505;
    } else if (this.x > 550 && this.x < 650) {
      this.tileX = 606;
    } else if (this.x > 650 && this.x < 750) {
      this.tileX = 707;
    } else if (this.x > 750 && this.x < 850) {
      this.tileX = 808;
    } else if (this.x > 850) {
      this.tileX = 1;
    }

    if (player.x === this.tileX && player.y === this.y) {
        alert("You lose, try again");
        player.reset();
        allEnemies.forEach(elem => elem.reset());
    }


}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
  this.x = -100;
  this.y = enemyPosY[Math.floor(Math.random() * 3)];
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.x = 404;
    this.y = 392;
    this.sprite = 'images/char-boy.png';

};

Player.prototype.update = function() {

    if (this.ctlKey === 'left' && this.x != 0) {
        this.x = this.x - 101;
      } else if (this.ctlKey === 'right' && this.x != 808) {
        this.x = this.x + 101;
      } else if (this.ctlKey === 'up') {
        this.y = this.y - 83;
      } else if (this.ctlKey === 'down' && this.y != 392) {
        this.y = this.y + 83;
      }
    this.ctlKey = null;

    if (this.y === -23) {

        setTimeout(() => {
            alert("You win!");
            this.reset();
            allEnemies.forEach(elem => elem.reset());
        }, 0);
        //gameLife.decrease();
    }
    console.log(this.x);

};

Player.prototype.handleInput = function(key) {

    this.ctlKey = key;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.x = 404;
    this.y = 392;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

for (let i = 0; i < initialEnemies; i++) {

    allEnemies[i] = new Enemy();

}


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

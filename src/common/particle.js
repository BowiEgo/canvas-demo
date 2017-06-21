import utils from './utils'

function Particle(x, y, type, context) {
    let colors = [
        '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
        '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
        '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
        '#FF5722'
    ]
    this.context = context;
    this.radius = 1.7;
    //   this.futurRadius = utils.randomInt(radVal, radVal+3); //[1.1,5.1]
    this.futurRadius = utils.randomInt(1.1, 5.1); //[1.1,5.1]

    this.rebond = utils.randomInt(1, 5);
    this.x = x;
    this.y = y;

    this.dying = false;

    this.base = [x, y];

    this.vx = 0;
    this.vy = 0;
    this.type = type;
    this.friction = .99;
    //   this.gravity = graVal;
    this.gravity = 0.8;
    this.durVal = 0.4;
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.setSpeed(utils.randomInt(.1, .5));
    this.setHeading(utils.randomInt(utils.degreesToRads(0), utils.degreesToRads(360)));
    // console.log(this.type)
}

Particle.prototype = {
    constructor: Particle,
    getSpeed: function () {
        return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    },
    setSpeed: function (speed) {
        var heading = this.getHeading();
        this.vx = Math.cos(heading) * speed;
        this.vy = Math.sin(heading) * speed;
    },
    getHeading: function () {
        return Math.atan2(this.vy, this.vx);
    },
    setHeading: function(heading) {
        var speed = this.getSpeed();
        this.vx = Math.cos(heading) * speed;
        this.vy = Math.sin(heading) * speed;
    },
    update: function (heading) {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;

        this.vx *= this.friction;
        this.vy *= this.friction;

        if (this.radius < this.futurRadius && this.dying === false) {
            this.radius += this.durVal;
        } else {
            this.dying = true;
        }

        if (this.dying === true) {
            this.radius -= this.durVal;
        }

        if (this.type === "ball") {
            this.context.save();
            this.context.fillStyle = this.color;
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
            this.context.closePath();
            this.context.fill();
            this.context.restore();
        }

        if (this.type === "rect") {
            this.context.save();
            this.context.fillStyle = this.color;
            this.context.beginPath();
            this.context.fillRect(this.x, this.y, this.futurRadius, this.futurRadius)
            this.context.closePath();
            this.context.fill();
            this.context.restore();
        }

        if (this.y < 0 || this.radius < 1) {
            this.x = this.base[0];
            this.y = this.base[1];
            this.dying = false;
            this.radius = 1.1;
            this.setSpeed(spdVal);
            //   this.futurRadius = utils.randomInt(radVal, radVal+3);  
            this.futurRadius = utils.randomInt(1.1, 5.1);
            this.setHeading(utils.randomInt(utils.degreesToRads(0), utils.degreesToRads(360)));
        }

    }
}

export default Particle
import mix from './mixin'
import boundaryRebounce from './boundaryRebounce'

class Bullet extends mix(boundaryRebounce) {
    constructor(options, renderList) {
        super();
        this.x = options.x || x;
        this.y = options.y || y;
        this.canvas = options.canvas;
        this.context = options.context;
        this.color = '#000';
        this.radius = 10;
        this.endTime = 50;
        this.directionX = options.directionX;
        this.directionY = options.directionY;
        this.lifeTime = options.lifeTime;
        this.life = this.lifeTime;
        this.renderList = renderList;
        this.bounceType = 'circle';
        this.cutLife();
    }

    draw() {
        const ctx = this.context;
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    shoot() {
        this.rebounce();   // 来自boundaryRebounce的边界回弹
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }

    cutLife() {
        var lifeInterval = setInterval(() => {
            console.log(this.life + 's')
            if(this.life === 0) {
                this.dispose()
                clearInterval(lifeInterval);
            }
            this.life --;
        }, 1000)
    }

    dispose() {
        this.renderList.splice(this.renderList.indexOf(this) ,1)
    }

}

// function Bullet (options, renderList) {
//     this.x = options.x || x
//     this.y = options.y || y
//     this.canvas = options.canvas;
//     this.context = options.context;
//     this.color = '#000';
//     this.endTime = 50;
//     this.directionX = options.directionX;
//     this.directionY = options.directionY;
//     this.lifeTime = options.lifeTime;
//     this.life = this.lifeTime;
//     this.renderList = renderList;
//     this.cutLife();
// }

// Bullet.prototype = {
//     constructor: Bullet,
//     draw: function () {
//         const ctx = this.context;
//         ctx.save();
//         ctx.fillStyle = this.color;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, 10, 0, Math.PI * 2, false)
//         ctx.closePath();
//         ctx.fill();
//         ctx.restore();
//     },
//     shoot: function () {
//         let borderX = this.canvas.width;
//         let borderY = this.canvas.height;
//         if (this.x <= 0 || this.x >= borderX) {
//             this.directionX *= -1;
//         }
//         if (this.y <= 0 || this.y >= borderY) {
//             this.directionY *= -1;
//         }
//         this.x += this.directionX;
//         this.y += this.directionY;
//         this.draw();
//     },
//     cutLife: function () {
//         var lifeInterval = setInterval(() => {
//             console.log(this.life + 's')
//             if(this.life === 0) {
//                 this.dispose()
//                 clearInterval(lifeInterval);
//             }
//             this.life --;
//         }, 1000)
//     },
//     dispose: function () {
//         this.renderList.splice(this.renderList.indexOf(this) ,1)
//     }
//     // drawFrame: function () {
//     //     window.requestAnimationFrame(this.draw, this.canvas);
//     //     this.x ++;
//     //     this.y ++;
//     //     this.draw()
//     // }
// }

export default Bullet
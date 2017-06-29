import mix from './mixin'
import boundaryRebounce from './boundaryRebounce'

class Brick extends mix(boundaryRebounce) {
    constructor(options, renderList) {
        super();
        this.x = options.x || x;
        this.y = options.y || y;
        this.width = options.width || 30;
        this.height = options.height || 100;
        this.canvas = options.canvas;
        this.context = options.context;
        this.color = '#000';
        this.endTime = 50;
        this.directionX = options.directionX;
        this.directionY = options.directionY;
        this.lifeTime = options.lifeTime;
        this.life = this.lifeTime;
        this.bounceType = 'rect';
        this.move();
    }

    draw() {
        const ctx = this.context;
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }

    move() {
        this.rebounce();   // 来自boundaryRebounce的边界回弹
        this.y += this.directionY;
        this.draw();
    }

    dispose() {
        this.renderList.splice(this.renderList.indexOf(this) ,1)
    }

}

export default Brick
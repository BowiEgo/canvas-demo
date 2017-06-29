import Tween from '../common/easeEffects'

function Arrow (options) {
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.context = options.context;
    this.rotation = 0;
    this.color = options.color;
}

Arrow.prototype = {
    constructor: Arrow,
    draw: function () {
        const ctx = this.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.lineWidth = 5;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(-50, -25);
        ctx.lineTo(0, -25);
        ctx.lineTo(0, -50);
        ctx.lineTo(50, 0);
        ctx.lineTo(0, 50);
        ctx.lineTo(0 ,25);
        ctx.lineTo(-50, 25);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }
}


export default Arrow
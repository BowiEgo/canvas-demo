import Shape from '../shape'

class Star extends Shape {
    constructor (...args) {
        super(...args);
    }

    draw () {
        console.log(this.ctx);
        this.ctx.save();
        this.buildPath();
        this.ctx.restore();
    }

    buildPath () {
        this.shape = {
            cx: 0,
            cy: 0,
            n: 3,
            r0: null,
            r: 0
        }
        this.ctx.save();
        this.ctx.fillStyle = this.fillStyle;

        let PI = Math.PI;
        let cos = Math.cos;
        let sin = Math.sin;

        // console.log(this.shape);
        let n = this.shape.n;
        if (!n || n < 2) {
            return;
        }

        let x = this.shape.cx;
        let y = this.shape.cy;
        let r = this.shape.r;
        let r0 = this.shape.r0;

        // 如果未指定内部顶点外接圆半径，则自动计算
        if (r0 == null) {
            r0 = n > 4
                // 相隔的外部顶点的连线的交点，
                // 被取为内部交点，以此计算r0
                ? r * cos(2 * PI / n) / cos(PI / n)
                // 二三四角星的特殊处理
                : r / 3;
        }

        let dStep = PI / n;
        let deg = -PI / 2;
        let xStart = x + r * cos(deg);
        let yStart = y + r * sin(deg);
        deg += dStep;

        // 记录边界点，用于判断inside
        this.ctx.moveTo(xStart, yStart);
        for (let i = 0, end = n * 2 - 1, ri; i < end; i++) {
            ri = i % 2 === 0 ? r0 : r;
            console.log('x: ' + (x + ri * cos(deg)))
            console.log('y: ' + (y + ri * sin(deg)))
            this.ctx.lineTo(x + ri * cos(deg), y + ri * sin(deg));
            deg += dStep;
        }

        this.ctx.fill();
        this.ctx.restore();
    }
}


export default Star
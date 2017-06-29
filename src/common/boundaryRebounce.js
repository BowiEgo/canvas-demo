class boundaryRebounce {
    constructor(options) {
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.canvas = options.canvas;
        this.context = options.context;
        this.directionX = options.directionX;
        this.directionY = options.directionY;
    }

    rebounce() {
        let borderX = this.canvas.width;
        let borderY = this.canvas.height;
        switch(this.bounceType)
        {
            case 'rect':
                if(this.y <= 0 || this.y >= (borderY - this.height)) {
                    this.directionY *= -1;
                }
                break;
            case 'circle':
                if (this.x <= 0 || this.x >= borderX) {
                    this.directionX *= -1;
                }
                if (this.y <= 0 || this.y >= borderY) {
                    this.directionY *= -1;
                }
                break;
            default:
                break;
        }
    }
}

export default boundaryRebounce
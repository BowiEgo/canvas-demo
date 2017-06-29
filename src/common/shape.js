class Shape {
    constructor (options) {
        this.canvas = options.canvas;
        this.ctx = options.context;
        this.x = options.x;
        this.y = options.y;
        this.fillStyle = options.fillStyle;
        // this.shape = {};
    }

    buildPath () {
        console.log('shapePath')
    }
}

export default Shape
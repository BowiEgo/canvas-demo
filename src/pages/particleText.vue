<template>
    <div>
        <canvas id="canvas" ref="canvas" width="500" height="500" style="background:#fff;"></canvas>
        <input v-model="text" class="text-field"/>
    </div>
</template>

<script>
/* @flow */
import Particle from '../common/particle.js'

export default {
    name: 'loading',
    data () {
        return {
            text: 'Hello',
            circleColor: '#49f',
            gridX: 5,
            gridY: 5,
            colors: [
                '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
                '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
                '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
                '#FF5722'
            ]
        }
    },
    mounted () {
        let vm = this
        this.initCanvas()
        this.shape(200 , 200, this.text)
        this.getValue()
    },
    watch: {
        text: function (val) {
            this.context.clearRect(0, 0, this.wW, this.wH);
            this.shape(200 , 200, val)
            this.getValue()
        }
    },
    methods: {
        initCanvas () {
            this.canvas = this.$refs.canvas  //获取canvas元素
            this.context = canvas.getContext('2d')  //获取画图环境，指明为2d
            this.wW = this.canvas.width = 400
            this.wH = this.canvas.height = 400
        },
        shape (x, y ,text) {
            this.textX = x
            this.textY = y
            this.textSize = 70
            this.text = text
            this.placement = []
        },
        getValue () {
            const ctx = this.context
            ctx.textAlign = "center"
            ctx.font = this.textSize + 'px arial'
            ctx.fillText(this.text, this.textX, this.textY)

            let idata = ctx.getImageData(0, 0, this.wW, this.wH)
            let buffer32 = new Uint32Array(idata.data.buffer)
            for(let i = 0; i < this.wH; i += this.gridX){
                for(let j = 0 ; j < this.wW; j += this.gridY){
                    if(buffer32[i * this.wW + j]){
                        let particle = new Particle(j, i, 'ball', ctx)
                        this.placement.push(particle);
                    }
                }
		    }

            ctx.clearRect(0, 0, this.wW, this.wH);

            for(var i in this.placement) {
                this.placement[i].update()
            }
        }
    }
}
</script>

<style lang="css" scoped>
.text-field {
    display: block;
    margin: 0 auto;
}
</style>

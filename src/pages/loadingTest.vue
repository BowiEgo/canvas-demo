<template>
    <div>
        <canvas ref="canvas" width="400" height="400"></canvas>
        <input type="range" min="0" max="100" class="rangeInput" v-model="percent"/>
        <img ref="img"></img>
    </div>
</template>

<script>
export default {
    data () {
        return {
            percent: 0,
        }
    },
    mounted: function() {
        this.initCanvas()
        this.drawArc(this.percent)
        this.drawText(this.percent)
    },
    watch: {
        percent: function (val) {
            this.drawFrame(val)
            this.$refs.img.setAttribute('src', this.canvas.toDataURL('image/png', 1))
        }
    },
    methods: {
        initCanvas () {
            this.canvas = this.$refs.canvas
            this.context = this.canvas.getContext('2d')
            this.centerX = this.canvas.width / 2
            this.centerY = this.canvas.height / 2
            this.rad = Math.PI * 2 / 100
        },
        drawArc (n) {
            let ctx = this.context
            let percent = n
            ctx.save()
            ctx.strokeStyle = '#49f'
            ctx.lineWidth = 10
            ctx.beginPath()
            ctx.arc(this.centerX, this.centerY, 100, - Math.PI / 2, - Math.PI / 2 + this.rad * n, false) //context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
            ctx.stroke()
            ctx.restore()
        },
        drawText (n) {
            let ctx = this.context
            ctx.save()
            // ctx.strokeStyle = '#49f'
            ctx.font = '40px Arial'
            ctx.fillStyle = '#49f'
            ctx.fillText(n + '%', this.centerX -30, this.centerY + 10)
            // ctx.strokeText(n + '%', this.centerX -30, this.centerY + 10)
            // ctx.stroke()
            ctx.restore()
        },
        drawFrame () {
            let ctx = this.context
            // window.requestAnimationFrame(this.drawFrame)
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.drawArc(this.percent)
            this.drawText(this.percent)
            // if(this.percent > 100) this.percent = 0
            // this.percent += this.step
        }
    }
}
</script>

<style>
    .rangeInput {
        display: block;
        margin: 0 auto;
    }
</style>
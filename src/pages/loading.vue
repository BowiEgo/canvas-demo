<template>
    <div>
        <canvas id="canvas" ref="canvas" width="500" height="500" style="background:#fff;"></canvas>
    </div>
</template>

<script>
export default {
    name: 'loading',
    data () {
        return {
            circleColor: '#49f'
        }
    },
    mounted () {
        this.initCanvas()
        this.drawWhiteCircle ()
        this.drawFrame()
        // this.drawBlueCircle (20)
        // this.drarText(20)
    },
    methods: {
        initCanvas () {
            this.canvas = this.$refs.canvas  //获取canvas元素
            this.context = this.canvas.getContext('2d')  //获取画图环境，指明为2d
            this.centerX = this.canvas.width / 2   //Canvas中心点x轴坐标
            this.centerY = this.canvas.height / 2  //Canvas中心点y轴坐标
            this.rad = Math.PI*2/100 //将360度分成100份，那么每一份就是rad度
            this.speed = .8
            this.percent = 0
        },
        //绘制白色外圈
        drawWhiteCircle () {
            const ctx = this.context
            ctx.save()
            ctx.strokeStyle = 'white'
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.arc(this.centerX, this.centerY, 100, 0, Math.PI*2, false)
            ctx.stroke()
            ctx.closePath()
            ctx.restore()
        },
        //绘制蓝色外圈
        drawBlueCircle (n) {
            const ctx = this.context
            ctx.save()
            ctx.strokeStyle = this.circleColor
            ctx.lineWidth = 10
            ctx.beginPath()
            ctx.arc(this.centerX, this.centerY, 100, -Math.PI/2, -Math.PI/2 + this.rad*n, false) //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
            ctx.stroke()
            ctx.restore()
        },
        drarText (n) {
            const ctx = this.context
            ctx.save()
            ctx.strokeStyle = this.circleColor
            ctx.font = '40px Arial'
            ctx.strokeText(n.toFixed(0) + '%', this.centerX - 30, this.centerY + 10)
            ctx.stroke()
            ctx.restore()
        },
        drawFrame () {
            const ctx = this.context
            window.requestAnimationFrame(this.drawFrame, canvas);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.drawBlueCircle (this.percent)
            this.drarText(this.percent)
            if(this.percent > 100) this.percent = 0
            this.percent += this.speed
        }
    }
}
</script>
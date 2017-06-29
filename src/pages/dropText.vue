<template>
    <div>
        <canvas id="canvas" ref="canvas" style="background:#000;"></canvas>
    </div>
</template>

<script>
export default {
    name: 'dropText',
    data () {
        return {
            clearColor: 'rgba(0, 0, 0, 0.1)',
            wordColor: '#33ff33',
            words: "0123456789qwertyuiopasdfghjklzxcvbnm,./;'\[]QWERTYUIOP{}ASDFGHJHJKL:ZXCVBBNM<>?",
            fontSize: 16,
            drops: []
        }
    },
    computed: {
        wordsArr: function () {
            return this.words.split('')
        },
        columns: function () {
            return this.w / this.fontSize
        }
    },
    mounted () {
        this.initCanvas()
        this.drawFrame()
    },
    methods: {
        initCanvas () {
            this.canvas = this.$refs.canvas
            this.w = this.canvas.width = window.innerWidth
            this.h = this.canvas.height = window.innerHeight
            this.ctx = this.canvas.getContext('2d')

            for(var i = 0; i < this.columns; i++) {
                this.drops[i] = 1
            }
        },
        draw () {
            this.ctx.save()
            this.ctx.fillStyle = this.wordColor
            this.ctx.font = this.fontSize + 'px arial'

            for(var i = 0; i < this.drops.length; i++) {
                let text = this.wordsArr[Math.floor(Math.random() * this.wordsArr.length)]
                this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize)
                if(this.drops[i] * this.fontSize > this.w) {
                    this.drops[i] = 0
                }
                this.drops[i] ++
            }
            this.ctx.restore()
        },
        drawFrame () {
            window.requestAnimationFrame(this.drawFrame, this.canvas)
            this.ctx.fillStyle = this.clearColor
            this.ctx.fillRect(0, 0, this.w, this.h)
            this.draw ()
        }
    }
}
</script>
<template>
    <div>
        <canvas id="canvas" ref="canvas" style="background:#eee;"></canvas>
    </div>
</template>

<script>
import Arrow from '../common/arrow.js'
import Bullet from '../common/bullet.js'
import Brick from '../common/brick.js'
import Star from '../common/shape/star.js'
import Utils from '../common/Utils.js'

export default {
    name: 'mouseArrow',
    data () {
        return {
            bulletSpeed: 10,
            bulletArr: [],
        }
    },
    mounted () {
        this.initCanvas()
        this.initStage()
    },
    methods: {
        initCanvas () {
            this.canvas = this.$refs.canvas
            this.w = this.canvas.width = window.innerWidth
            this.h = this.canvas.height = window.innerHeight
            this.ctx = this.canvas.getContext('2d')
        },

        initStage () {
            this.bulletArr = []

            this.arrow = new Arrow({
                context: this.ctx,
                x: this.w / 2,
                y: this.h / 2,
                color: '#000'
            })
            this.arrow.draw(this.ctx)
            this.mousePos = new Utils.captureMouse(this.canvas)

            this.brick = new Brick({
                canvas: this.canvas,
                context: this.ctx,
                x: 30,
                y: this.h / 2,
                directionX: 0,
                directionY: 4
            })

            this.star = new Star({
                canvas: this.canvas,
                context: this.ctx,
                x: 60,
                y: 60,
                fillStyle: "red"
            })
            this.star.draw()
            // this.shootFuc()

            // this.star.draw();
        },

        shootFuc () {
            this.canvas.addEventListener('click', (e) => {

                let unitVector = this.getVector()

                let newBullet = new Bullet({
                    context: this.ctx,
                    canvas: this.canvas,
                    x: this.w / 2,
                    y: this.h / 2,
                    directionX: unitVector.unitVectorX,
                    directionY: unitVector.unitVectorY,
                    lifeTime: 3,
                }, this.bulletArr)
                this.bulletArr.push(newBullet)
            })

            this.arrowRotateAnime()
        },

        getVector () {
            this.vectorX = this.mousePos.x - this.w / 2
            this.vectorY = this.mousePos.y - this.h / 2
            let vectorMagnitude = Math.sqrt(Math.pow(this.vectorX, 2) + Math.pow(this.vectorY, 2))
            let cos = this.vectorX / vectorMagnitude
            let sin = this.vectorY / vectorMagnitude
            return {
                unitVectorX : cos * this.bulletSpeed,
                unitVectorY : sin * this.bulletSpeed
            }
        },

        arrowRotateAnime () {
            this.animateFrame = window.requestAnimationFrame(this.arrowRotateAnime, this.canvas)
            this.ctx.clearRect(0, 0, this.w, this.h)
            let dx = this.mousePos.x - this.w / 2
            let dy = this.mousePos.y - this.h / 2
            let rad = Math.atan2( dy, dx )
            this.arrow.rotation = rad
            this.arrow.draw(this.ctx)
            this.brick.move()
            if(this.bulletArr.length > 0) {
                for(let i in this.bulletArr) {
                    this.bulletArr[i].shoot()
                    if(Utils.intersect(this.bulletArr[i], this.brick)) {
                        this.ctx.clearRect(0, 0, this.w, this.h)
                        alert('击中了！')
                        this.initStage()
                        window.cancelAnimationFrame(this.animateFrame)
                        return false
                    }
                }
            }
        }
    }
}
</script>
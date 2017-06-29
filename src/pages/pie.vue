<template>
    <canvas id="pie" ref="pie" width="500" height="500"></canvas>
</template>

<script>
import Tween from '../common/easeEffects'

console.log(Tween.Cubic)

export default {
    name: 'pieChart',
    data() {
        return {
            data: [
                {
                    value: 40,
                    name: 'Javascript'
                },
                {
                    value: 30,
                    name: 'HTML'
                },
                {
                    value: 20,
                    name: 'CSS'
                },
                {
                    value: 60,
                    name: 'Vue.js'
                },
                {
                    value: 10,
                    name: 'React.js'
                },
                {
                    value: 50,
                    name: 'Angular.js'
                }
            ],
            idx: 0,
            colors: ['rgb(236, 208, 120)', 'rgba(217, 91, 67, 0.7)', 'rgba(192, 41, 66, 0.7)', 'rgba(84, 36, 55, 0.7)', 'rgba(83, 119, 122, 0.7)', 'rgba(119, 146, 174, 0.7)'],
            radius: 120,
            speed: 1,
            duration: 3,  // 动画时长
            step: 20,
            end: false,
            scale: 1.1,
            maskStep: 0
            
        }
    },

    computed: {
        myData: function () {
            return this.data[this.idx].value
        }, 
        myRad: function () {
            return (Math.PI * 2)  * (this.data[this.idx].value / this.getTotal(this.data))
        },
        myColor: function () {
            return this.colors[this.idx]
        }
    },

    created: function () {
    },

    mounted: function () {
        this.initChart()
        this.render()
        this.drawMaskFrame()
        // this.drawPie(0, 1)
        // this.drawPie(1, 1)
        
        // this.ctx.save()
        // this.drawPieTest()
        // this.ctx.restore()
        
        // // // this.drawPie(2, 1)
        // this.drawPie(3, 1)
        // this.drawPie(4, 1)
        // this.drawPie(5, 1)
    },

    methods: {
        initChart() {
            this.canvas = this.$refs.pie
            this.centerX = this.canvas.width / 2
            this.centerY = this.canvas.height / 2
            this.ctx = this.canvas.getContext('2d')
            this.beginRad = - Math.PI / 2

            this.getPecentSumArr(this.data)
            this.getMidRadiusArr(this.pecentArr)
            this.canvas.addEventListener('mousemove', (e) => {
                let idx = this.inRange(e)
                this.render(idx)
                this.showToolTip(e, idx)
            })
            let toolTipContainerStyle = {
                position : 'absolute',
                left : 0,
                top : 0,
                transition : 'all ease 0.2s',
                display : 'inline-block',
                padding : '4px 10px',
                borderRadius : '2px',
                background : 'rgba(0, 0, 0, 0.6)',
                fontSize : '12px',
                lineHeight : '20px',
                color : '#fff',
                opacity : '0',
                display : 'none'
            }
            this.toolTipContainer = document.createElement('div')
            this.toolTipContainer.className = 'chart-tooltip'
            this.toolTipContainer.innerText = 'tooltip'
            for(let i in toolTipContainerStyle) {
                 this.toolTipContainer.style[i] = toolTipContainerStyle[i]
            }
            this.canvas.parentNode.append(this.toolTipContainer)
        },
        drawPieTest () {
            this.ctx.fillStyle = 'rgba(192, 41, 66, 0.7)'
            this.ctx.beginPath()
            this.ctx.moveTo(250, 250)
            this.ctx.arc(250, 250, 130, 0.5235987755982987, 1.1219973762820687, false)
            this.ctx.closePath()
            this.ctx.shadowOffsetX = 0
            this.ctx.shadowOffsetY = 0
            this.ctx.shadowColor = "rgba( 0, 0, 0, 0.5)"
            this.ctx.shadowBlur = 10
            this.ctx.fill()
        },
        drawPie (idx, scale) {
            let beginRad = - Math.PI / 2
            let myRad = (Math.PI * 2)  * (this.data[idx].value / this.getTotal(this.data))
            let scaleBase = scale || 1
            if(idx > 0) {
                for(var i = 0; i < idx; i++) {
                    beginRad += (Math.PI * 2)  * (this.data[i].value / this.getTotal(this.data))
                }
            }

            this.ctx.save()
            this.ctx.fillStyle = this.colors[idx]
            this.ctx.beginPath()
            this.ctx.moveTo(this.centerX, this.centerY)
            this.ctx.arc(this.centerX, this.centerY, this.radius * scaleBase, beginRad+ 0.001 , beginRad + myRad, false)

            console.log(this.centerX)
            console.log(this.centerY)
            console.log(this.radius * scaleBase)
            console.log(beginRad)
            console.log(beginRad + myRad)
            this.ctx.closePath()
            if(scale > 1) {
                this.ctx.shadowOffsetX = 0
                this.ctx.shadowOffsetY = 0
                this.ctx.shadowColor = "rgba( 0, 0, 0, 0.5)"
                this.ctx.shadowBlur = 10
            }
            this.ctx.fill()
            this.ctx.restore()
        },
        drawMark (idx) {
            let beginX = this.radius * Math.sin(this.MidRadiusArr[idx]) + this.centerX
            let beginY = this.centerY - this.radius * Math.cos(this.MidRadiusArr[idx])
            let distance = 20
            let endX = beginX + distance * Math.sin(this.MidRadiusArr[idx])
            let endY = beginY - distance * Math.cos(this.MidRadiusArr[idx])

            this.ctx.save()
            this.ctx.strokeStyle = this.colors[idx]
            this.ctx.beginPath()
            this.ctx.moveTo(beginX, beginY)
            this.ctx.lineTo(endX, endY)
            this.ctx.lineTo(endX + (this.MidRadiusArr[idx] < Math.PI ? 40 : -40), endY)
            
            this.ctx.stroke()
            // drawText
            this.ctx.fillStyle = this.colors[idx]
            this.ctx.textAlign = this.MidRadiusArr[idx] < Math.PI ? 'left' : 'right'
            this.ctx.strokeText(String((this.pecentArr[idx] * 100).toFixed(2)) + '%', endX + (this.MidRadiusArr[idx] < Math.PI ? 50 : -50), endY)
            this.ctx.restore()
        },
        getCoordinate (e) {
            let coordX = e.offsetX - this.centerX
            let coordY = - ( e.offsetY - this.centerY )

            this.coordX = coordX
            this.coordY = coordY
        },
        inRange (e) {
            this.getCoordinate(e)
            let coordX = this.coordX
            let coordY = this.coordY

            if(Math.sqrt(Math.pow(coordX, 2) + Math.pow(coordY, 2)) > this.radius) {
                return false
            }

            let tangent = Math.abs(coordX) / Math.abs(coordY)
            let radius = Math.atan(tangent)
            if(coordX > 0) {
                if(coordY < 0) {
                    radius = ( Math.PI / 2 - radius ) + Math.PI / 2
                }
            } else {
                if(coordY < 0) {
                    radius += Math.PI
                } else (
                    radius = Math.PI * 2 - radius
                )
            }
            let pecent = radius / (Math.PI * 2)
            for(let i = 0; i < this.pecentSumArr.length; i++) {
                let dataPecent = this.pecentSumArr[i]
                let lastPecent = i > 0 ? this.pecentSumArr[i - 1] : 0
                if(pecent <= dataPecent && pecent > lastPecent) {
                    return i
                }
            }
        },
        showToolTip (e, idx) {
            console.log(e)
            let mouseX = e.pageX
            let mouseY = e.pageY
            if(idx !== false) {
                this.toolTipContainer.style.transform = `translate3d(${mouseX + 20}px, ${mouseY + 20}px, 0)`
                this.toolTipContainer.innerText = this.data[idx].name
                this.toolTipContainer.style.opacity = '1'
                this.toolTipContainer.style.display = 'inline-block'
            } else {
                this.toolTipContainer.style.opacity = '0'
            }
        },
        render (idx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            for(var i = 0; i < this.data.length; i++) {
                if(this.end === true) {
                    this.drawMark(i)
                }
                if(i === idx) {
                    this.drawPie(i, this.scale)
                } else {
                    this.drawPie(i)
                }
            }
        },
        drawMask (pecent) {
            let beginRad = - Math.PI / 2
            let endRad = Math.PI * 2 * pecent - Math.PI / 2

            this.ctx.save()
            this.ctx.fillStyle = '#eee'
            this.ctx.beginPath()
            this.ctx.moveTo(this.centerX, this.centerY)
            this.ctx.arc(this.centerX, this.centerY, this.radius + 1, beginRad, endRad, true)
            this.ctx.closePath()
            this.ctx.fill()
            
            this.ctx.restore()
        },
        drawMaskFrame () {
            if(!this.endTime) {
                this.nowTime = 0
                this.endTime = this.nowTime + 60
            }
            if(this.nowTime < this.endTime - 4) {
                this.nowTime ++
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                this.render()
                window.requestAnimationFrame(this.drawMaskFrame, this.canvas)
                this.drawMask((this.maskStep / 100).toFixed(2))
                // easeInOut
                // @params: t: current time（当前时间）
                // @params: b: beginning value（初始值）
                // @params: c: change in value（变化量）
                // @params: d: duration（持续时间）
                this.maskStep = Tween.Circ.easeInOut(this.nowTime, 0, 100 , this.endTime)
            } else {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                this.end = true
                this.render()
                return false
            }
        },
        getTotal (arr) {
            return arr.map( el => el.value ).reduce((l, r) => {    // 对象数组reduce在不提供 initialValue会错误，先执行map再执行reduce可解决，空数组也没问题
                return l + r
            })
            // return arr.reduce((l, r) => {  
            //     return l.value + r.value   // undefined
            // })
        },
        getPecentSumArr (arr) {
            let pecentSumArr = []
            let pecentArr = []
            let pecent = 0
            for(let i in arr) {
                let nowPecent = arr[i].value / this.getTotal(arr)
                pecent += nowPecent
                pecentSumArr.push(pecent)
                pecentArr.push(nowPecent)
            }
            this.pecentSumArr = pecentSumArr
            this.pecentArr = pecentArr
        },
        cloneArr (arr) {
            let resultArr = []
            for(let i in arr) {
                resultArr.push(arr[i])
            }
            return resultArr
        },
        getMidRadiusArr (pecentArr) {
            let resultArr = []
            let pecentArrTemp = []
            for(let i in pecentArr) {
                pecentArrTemp.push(pecentArr[i])
            }
            for(let i in pecentArrTemp) {
                let arrTemp = this.cloneArr(pecentArrTemp)
                let sumPre = 0
                if(i > 0) {
                    if(i === 1) {
                        sumPre = arrTemp[0]
                    } else {
                        sumPre = arrTemp.splice(0, i).reduce((l, r) => {
                            return l + r
                        })
                    }
                }
                resultArr.push(Math.PI * 2 * (sumPre + pecentArr[i] / 2))
            }
            this.MidRadiusArr = resultArr
        }
    }
}
</script>

<style>
body {
    background: #eee;
}
</style>


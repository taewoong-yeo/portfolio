class MotionParticle {
	constructor(el, option) {
		this.el = el
		this.container = { width: null, height: null }
		this.isActive = false
		this.icon = this.el.querySelector('.particle-icon')
		this.backgroundImg = window.getComputedStyle(this.icon).getPropertyValue('background-image')
		this.wrapEl = null
		this.target = null
		this.particle = null
		this.particleAll = []
		this.lastIndex = 0
		this.tempWrap = null
		this.pos = {
			fx : 0,
			fy : 0,
			tx : 0,
			ty : 0,
		},
		this.degToRad = Math.PI / 180
		this.isReady = true
		this.particle = null
		this.particleAll = []
		this.lastIndex = 0

		this.showWrap = this.el.querySelector('.particle-box')

		this.container.width = this.showWrap.offsetWidth
		this.container.height = this.showWrap.offsetHeight

		// option
		const basicOption = {
			stopOverlap : true,
			count : { min: 20, max: 30 },
			size : { min: 20, max: 80 },
			duration : 1,
			rotate: 900,
		}
		this.option = Object.assign(basicOption, option)

	}
	init() {
		this.run()
	}
	run() {
		let copyParticle = document.querySelector('.copy-particle-wrap')
		this.particle = null
		this.particleAll = []
		this.lastIndex = 0
		this.makeWrap()
		this.checkOverlap()
		this.generateParticle(this.container.width / 2, this.container.height )
		if(copyParticle) copyParticle.remove() 
	}
	checkOverlap() {
		// 감정 표현 겹치지 않게 설정했을 때
		if (this.option.stopOverlap) {
			const wrapAll = document.querySelectorAll('.copy-particle-wrap')
			wrapAll.forEach(wrap => {
				if (wrap !== this.wrapEl) {
					gsap.to(wrap, 0.3, {
						alpha: 0,
					})
				}
			})
		}
	}
	makeWrap() {
		// wrap dom 생성
		const wrap = this.showWrap

		this.wrapEl = document.createElement('div')
		this.wrapEl.classList.add('copy-particle-wrap')
		this.tempWrap = wrap.appendChild(this.wrapEl)
	}
	generateParticle(x, y) {
		// 랜덤 개수와 위치값 생성
		const randomCount = this.randomVal(this.option.count.min, this.option.count.max)
		this.lastIndex = randomCount - 1

		for (let i = 0; i < randomCount; i += 1) {
			const angle = i * (45 / randomCount)
			const radius = Math.floor(Math.random() * x) + y

			this.pos.fx = x
			this.pos.fy = y
			this.pos.tx = x + radius * Math.cos((angle + -112.5) * this.degToRad)
			this.pos.ty = y + radius * Math.sin((angle + -112.5) * this.degToRad)

			this.renderParticle()
		}

	}
	renderParticle() {
		// particle dom 생성 및 스타일 지정
		const divEl = document.createElement('div')
		divEl.classList.add('copy-particle')
		divEl.style.position = 'absolute'
		divEl.style.left = `${this.pos.fx}px`
		// divEl.style.top = `${this.pos.fy}px`
		divEl.style.bottom = 0
		divEl.style.width = 0
		divEl.style.height = 0
		divEl.style.backgroundImage = this.backgroundImg
		divEl.style.backgroundSize = 'cover'
		divEl.style.backgroundRepeat = 'no-repeat'
		divEl.style.zIndex = 1

		this.particle = this.tempWrap.appendChild(divEl)
		this.explode()
	}
	explode() {
		// particle 애니메이션 재생
		const scope = this
		const hw = this.randomVal(this.option.size.min, this.option.size.max)
		const rr = Math.floor(Math.random() * (this.option.rotate - (-this.option.rotate))) + -this.option.rotate
		const randomDelay = (Math.random() * 0.4).toFixed(2)

		scope.isReady = false
		gsap.fromTo(this.particle, this.option.duration, { rotate: 0 }, {
			x: 0,
			y: 0,
			left: this.pos.tx,
			top: this.pos.ty,
			height: hw,
			width: hw,
			rotate: rr,
			ease: 'circ.out',
			delay: randomDelay,
			onComplete() {
				scope.particleAll.push(scope.particle)
			},
		})
		gsap.to(this.particle, 0.5, {
			alpha: 0,
			delay: Number(randomDelay) + 0.5,
			onComplete() {
				gsap.delayedCall(0.2, () => {
					if (scope.particleAll[scope.lastIndex] === scope.particle) {
						scope.particle.parentNode.remove()
						scope.isReady = true
					}
				})
			},
		})
	}
	randomVal(min, max) {
		return min + Math.floor(Math.random() * (max - min))
	}

}

export { MotionParticle }
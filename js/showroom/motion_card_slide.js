class CardSlide {
	constructor(el, option) {
		this.el = el
		this.cardWrap = this.el.querySelector('.card-slide-wrap')

		this.allSlide = null
		this.prevSlide = null
		this.activeSlide = null
		this.nextSlide = null
		this.backSlide = null
		this.slide = {
			nextNext: null, nextBack: null, nextPrev: null, nextActive: null,
		}

		this.direction = 0
		this.isSliding = false
		this.isMovingReady = true
		this.snapSize = 20
		this.snapSpeed = 0.3
		this.degree = 0
		this.gsapCommon = {
			ease: 'power4.inout',
			overwrite: true,
		}

		this.startPosX = 0
		this.movePosX = 0
		this.endPosX = 0

		this.startPosY = 0
		this.movePosY = 0
		this.endPosY = 0

		this.xPosVal = 0
		this.yPosVal = 0
		this.zPosVal = -300
		this.alpha = 1
		this.degToRad = Math.PI / 180
		this.degree = 0

		this.eventArray = [
			['pointerdown', this.onStart],
			['pointermove', this.onMove],
			['pointerup', this.onEnd],
			['pointerleave', this.onOut],
		]

		this.limit = false
		// this.type = eventype

		this.timeout = null
		this.setTime = null
		this.timeoutId = null
		this.autoPlay = this.autoPlay.bind(this)
	}
	init() {
		this.setLayout()
		this.addEvents()
    this.autoPlaying = false;
	}
	autoPlay(eventType) {
		const scope = this
		scope.setLayout() // dom load 됐을 때 card 위치 설정

		if (eventType === 'mouseleave') {
			scope.setLayout()
			return;
		}
		scope.movePosX = -1
		scope.moveSlide(1)

	}
	addEvents() {
		const eventList = this.isMobile ? this.mobileEventArray : this.eventArray
		eventList.forEach($event => {
      console.log($event)
			document.querySelector('.card-slide-container').addEventListener($event[0], $event[1], { passive: true })
		})
	}
	setLayout() {
		const scope = this

		scope.allSlide = [...scope.el.querySelectorAll('.slide-list')]
		scope.xPosVal = scope.cardWrap.offsetWidth / 0.85
		scope.yPosVal = scope.cardWrap.offsetWidth * 0.08

		scope.updateDom()
		scope.setPosition()
	}
	onStart = ($event) => {
		const scope = this

		if (scope.isSliding || !scope.isMovingReady) return

		scope.isMovingReady = false
		const posX = $event.screenX || $event.changedTouches[0].screenX
		scope.startPosX = posX
		const posY = $event.screenY || $event.changedTouches[0].screenY
		scope.startPosY = posY
		scope.direction = 0
		scope.setSlideFromDir(0)
	}
	onMove = ($event) => {
		const scope = this
		if (scope.isSliding || scope.isMovingReady) return

		const posX = this.isMobile ? $event.changedTouches[0].screenX : $event.screenX
		const posY = this.isMobile ? $event.changedTouches[0].screenY : $event.screenY

		scope.movePosY = (posY - scope.startPosY)
		scope.movePosX = (posX - scope.startPosX)
		scope.dragSlideEffect()
	}
	onEnd = ($event) => {
		const scope = this

		scope.endPosX = $event.screenX
		scope.isMovingReady = true

		if (scope.isSliding || scope.direction === 0) return
		scope.moveSlideEffect()
	}
	onOut = () => {
		const scope = this

		if (scope.isMovingReady) return
		scope.isMovingReady = true

		scope.moveSlide(scope.direction)
	}
	dragSlideEffect() {
		const scope = this
		scope.checkDirection()
		scope.calcDegreeVal()
		scope.dragRotate()
	}
	moveSlideEffect() {
		const scope = this
		scope.isSliding = true
		scope.moveSlide(scope.direction)
	}
	setSlideFromDir(dir) {
		if (this.limit || dir === 0) {
			this.slide.nextNext = this.nextSlide
			this.slide.nextBack = this.backSlide
			this.slide.nextPrev = this.prevSlide
			this.slide.nextActive = this.activeSlide
		} else if (dir < 0) {
			this.slide.nextNext = this.activeSlide
			this.slide.nextBack = this.nextSlide
			this.slide.nextPrev = this.backSlide
			this.slide.nextActive = this.prevSlide
		} else if (dir > 0) {
			this.slide.nextNext = this.backSlide
			this.slide.nextBack = this.prevSlide
			this.slide.nextPrev = this.activeSlide
			this.slide.nextActive = this.nextSlide
		}
	}
	commonRotate(degVal) {
		const scope = this

		const pos = {
			x: scope.xPosVal * Math.cos((scope.degree + degVal) * scope.degToRad),
			y: scope.yPosVal * (1 + Math.sin((scope.degree + degVal) * scope.degToRad)),
			z: scope.zPosVal * (1 + Math.sin((scope.degree + degVal) * scope.degToRad)),
			overwrite: true,
		}
		return pos
	}
	commonScale(degVal) {
		const scope = this
		const scale = {
			scale: 0.8 - 0.2 * Math.sin((scope.degree + degVal) * scope.degToRad),
			overwrite: true,
		}
		return scale
	}
	dragRotate() {
		const scope = this
		const dir = scope.direction
		gsap.to(scope.nextSlide, {
			...scope.commonRotate(0),
		})
		gsap.to(scope.backSlide, {
			...scope.commonRotate(90),
			zIndex: 1,
		})
		gsap.to(scope.prevSlide, {
			...scope.commonRotate(180),
		})
		gsap.to(scope.activeSlide, {
			...scope.commonRotate(270),
			zIndex: () => (Math.abs(scope.degree) > 20 ? 5 : 6),
		})

		gsap.set(scope.nextSlide, {
			zIndex: () => {
				if (scope.degree !== 0 && dir > 0) {
					if (Math.abs(scope.degree) > 20) return 6
					if (Math.abs(scope.degree) > 10) return 5
					return 4
				} return 3
			},
		})
		gsap.set(scope.prevSlide, {
			zIndex: () => {
				if (scope.degree !== 0 && dir < 0) {
					if (Math.abs(scope.degree) > 20) return 6
					if (Math.abs(scope.degree) > 10) return 5
					return 4
				} return 3
			},
		})
	}
	moveSlide(dir) {
		const scope = this
		scope.setSlideFromDir(dir)
		scope.degree = 0
		gsap.to(scope.slide.nextNext, scope.snapSpeed, {
			...scope.commonRotate(0),
			zIndex: 4,
			...scope.gsapCommon,
		})
		gsap.to(scope.slide.nextBack, scope.snapSpeed, {
			...scope.commonRotate(90),
			zIndex: 2,
			...scope.gsapCommon,
		})
		gsap.to(scope.slide.nextPrev, scope.snapSpeed, {
			...scope.commonRotate(180),
			zIndex: 4,
			...scope.gsapCommon,
		})
		gsap.to(scope.slide.nextActive, scope.snapSpeed, {
			...scope.commonRotate(270),
			zIndex: 6,
			...scope.gsapCommon,
			onComplete() {
				scope.checkDirection()
				scope.movePosX = 0
				scope.movePosY = 0
				if (!scope.limit) {
					scope.removeClass(scope.allSlide)
					scope.updateClass()
					scope.updateDom()
				}

				scope.direction = 0
				scope.limit = false
				scope.isSliding = false
			},
		})

	}
	setPosition() {
		const scope = this

		gsap.set(scope.prevSlide, {
			...scope.commonRotate(180),
		})
		gsap.set(scope.nextSlide, {
			...scope.commonRotate(0),
		})
		gsap.set(scope.backSlide, {
			...scope.commonRotate(90),
		})
		gsap.set(scope.activeSlide, {
			...scope.commonRotate(270),
		})

	}
	updateDom() {
		const scope = this
		scope.prevSlide = scope.el.querySelector('.slide-list.ro-prev')
		scope.activeSlide = scope.el.querySelector('.slide-list.ro-active')
		scope.nextSlide = scope.el.querySelector('.slide-list.ro-next')
		scope.backSlide = scope.el.querySelector('.slide-list.ro-back')
	}
	updateClass() {
		const scope = this
		if (scope.direction > 0) {
			scope.prevSlide.classList.add('ro-back')
			scope.nextSlide.classList.add('ro-active')
			scope.activeSlide.classList.add('ro-prev')
			scope.backSlide.classList.add('ro-next')
		} else if (scope.direction < 0) {
			scope.prevSlide.classList.add('ro-active')
			scope.nextSlide.classList.add('ro-back')
			scope.activeSlide.classList.add('ro-next')
			scope.backSlide.classList.add('ro-prev')
		}
	}
	removeClass(ele) {
		ele.forEach(el => {
			const classes = el.classList
			classes.forEach(name => {
				if (/ro-/.test(name)) {
					classes.remove(name)
				}
			})
		})
	}
	calcDegreeVal() {
		const scope = this

		const corrX = scope.movePosX * 0.5

		if (scope.limit) {
			scope.degree = 0
		} else if (Math.abs(corrX) > 90) {
			scope.degree = scope.direction < 0 ? 90 : -90
		} else {
			scope.degree = corrX
		}
	}
	checkDirection() {
		const scope = this
		if (scope.movePosX < 0) {
			scope.direction = 1
		} else if (scope.movePosX > 0) {
			scope.direction = -1
		} else {
			scope.direction = 0
		}
	}
}

export { CardSlide }
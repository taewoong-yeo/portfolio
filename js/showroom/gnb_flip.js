class GnbFlip {
    constructor(el) {
        this.el = el
        this.menu = this.el.querySelectorAll('.ux-menu-m')
				this.menu2 = this.el.querySelector('.active-el') // 추가한 변수
        this.timeline = gsap.timeline()
        this.setFlip = this.setFlip.bind(this)
        this.playFlip = this.playFlip.bind(this)
    }
    init() {
        this.applyGnb()
    }
    applyGnb() {
        this.menu.forEach(el => {
            this.splitText(el)
            this.mouseEnter(el)
            this.mouseLeave(el)
        });
    }
		play() { // 추가 메소드
			this.splitText(this.menu2)
			this.mouseEnter(this.el)
		}
		stop() { // 추가 메소드
			this.mouseLeave(this.el)
		}
    mouseEnter(el) {
        el.addEventListener('mouseenter', this.playFlip)
    }
    mouseLeave(el) {
        el.addEventListener('mouseleave', this.setFlip)
    }
    setFlip(e) {
        this.timeline.clear()

        gsap.set(e.target.querySelectorAll('.split'), {
            rotateY: 0,
            alpha: 1,
            overwrite: true
        })
    }
    playFlip(e) {
        gsap.set(e.target.querySelectorAll('.split'), {
            alpha: 0,
            rotateY: 235,
        })
        this.timeline.to(e.target.querySelectorAll('.split'), {
            duration: 0.2,
            rotateY: 360,
            stagger: {
                each: 0.05,
            },
            alpha: 1,
            overwrite: true
        })
    }
    splitText(el) {
        const text = [...el.textContent]
        el.innerHTML = ''
        text.map(txt => el.innerHTML += `<div class="split">${txt}</div>`)
    }
}

class GnbFlipRandom extends GnbFlip {
    constructor(el) {
        super(el)
    }
    playFlip(e) {
        gsap.set(e.target.querySelectorAll('.split'), {
            alpha: 0,
            rotateY: 235,
        })

        this.timeline.to(e.target.querySelectorAll('.split'), {
            duration: 0.2,
            rotateY: 360,
            stagger: {
                each: 0.05,
                from: "random"
            },
            alpha: 1,
            overwrite: true
        })
    }
}

export { GnbFlip, GnbFlipRandom }
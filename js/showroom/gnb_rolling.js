class GnbRollingText {
    constructor(el) {
        this.el = el
        this.menu = this.el.querySelectorAll('.ux-menu-m')
				this.menu2 = this.el.querySelector('.ux-menu-m')

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
			this.startRolling(this.menu2.parentNode)
		}
		stop () { // 추가 메소드
			this.startReset(this.menu2.parentNode)
		}
		startRolling(ele) { // 추가 메소드
			let convertEle = []
			const targets = ele.children;
			convertEle = [...targets]

			// 기존에 rolling()에 gsap에 this.children[0].children, this.children[1].children을 재사용하기 어려워 새롭게 만들음
			// forEach문을 사용하기 위해 새롭게 만듦
			convertEle.forEach(ele => {
				gsap.to(ele.children, {
					y: '-100%',
					stagger: {
						amount: 0.1,
						from: 'start'
					},
					duration: 0.3,
				})
			})

	}
		startReset(ele) { // 추가 메소드
			let convertEle = []
			const targets = ele.children;
			convertEle = [...targets]

			// 기존에 reset()에 gsap에 this.children[0].children, this.children[1].children을 재사용하기 어렵고
			// forEach문을 사용하기 위해 새롭게 만듦
			convertEle.forEach(ele => {
				gsap.to(ele.children, {
					y: 0,
					stagger: {
						amount: 0.1,
						from: 'start',
					},
					duration: 0.3,
				})
			})
		}
    mouseEnter(el) {

        el.parentNode.addEventListener('mouseenter', this.rolling)
    }
    mouseLeave(el) {
        el.parentNode.addEventListener('mouseleave', this.reset)
    }
    rolling() {
				console.log(this.children)
        gsap.to(this.children[0].children, {
            y: "-100%",
            stagger: {
                amount: 0.1,
                from: "start",
            },
						duration: 0.3,
        });

        gsap.to(this.children[1].children, {
            y: "-100%",
            stagger: {
                amount: 0.1,
                from: "start",
            },
						duration: 0.3,
        });
    }
    reset() {
        gsap.to(this.children[0].children, {
            y: 0,
            stagger: {
                amount: 0.1,
                from: "start",
            },
						duration: 0.3,
        });

        gsap.to(this.children[1].children, {
            y: 0,
            stagger: {
                amount: 0.1,
                from: "start",
            },
						duration: 0.3,
        });
    }
    splitText(el) {
        const text = [...el.textContent]
        el.innerHTML = ''
        text.map(txt => el.innerHTML += `<div class="split">${txt}</div>`)

        const clone = el.cloneNode(true)
        el.after(clone)
    }
}

export { GnbRollingText }
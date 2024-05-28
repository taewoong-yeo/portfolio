class TextKerning {
    constructor(el, option) {
        this.el = el
				this.menus = this.el.querySelectorAll('.ux-text-el')
        this.timeline = gsap.timeline()
        this.textAll = []

        // 기본 옵션 normal 기준
        const basicOption = {
            direction: "reduce",
            size: 300,
            duration: 1,
            easing: " power4.out"
        }

        this.option = Object.assign(basicOption, option)
    }
    init() {
        this.convertText(this.el)
        this.setGsap(this.el)
        this.play(this.el)
    }

		inits() {
			this.menus.forEach(menu => {
				this.convertText(menu)
				this.setGsap(menu)
				this.play(menu)
			})
		}
    // 애니메이션 설정 및 재생
		play(textEle = this.el) {
			if (textEle.classList.contains('active')) {
				this.gsapForward(textEle)
			} else {
				this.gsapBackward(textEle)
			}
		}
		
    setGsap(target) {
			gsap.set(target, {
				width: this.checkWidth().initWidth,
				alpha: 0,
			})
    }

		gsapForward(textEle) {
			const scope = this
			gsap.to(textEle, {
				width: scope.checkWidth().setWidth,
				duration: this.option.duration,
				alpha: 1,
				ease: this.option.easing,
				overwrite: true
		})
		}
		gsapBackward(textEle) {
			gsap.to(textEle, {
				width: this.checkWidth().initWidth,
				duration: this.option.duration,
				alpha: 0,
				ease: this.option.easing,
				overwrite: true
		})
		}

    setOption(option) {
        this.option = Object.assign(this.option, option)
    }
		// 텍스트 변환
		convertText(target) {
			const text = target.textContent;
			let textArr;
			let letterArr;
			target.innerHTML = ''

			textArr = text.split(' ')
			textArr.forEach(el => {
					letterArr = el.split('')
					letterArr.forEach(letter => {
							target.innerHTML += `<div class="split">${letter}</div>`
					})
			})
			this.textAll = [...target.querySelectorAll('.split')]
		}
    checkWidth() {
        let initWidth
        let setWidth

        if (this.option.direction == "expand") {
					initWidth = "100%"
					setWidth = this.option.size + "%"
        } else if (this.option.direction == "expandSmall") {
					initWidth = "10%"
					setWidth = this.option.size + "%"
				} else if (this.option.direction == "reduce") {
					initWidth = this.option.size + "%"
					setWidth = "100%"
				} else if (this.option.direction == "reduceSmall") {
					initWidth = this.option.size + "%"
					setWidth = "20%"
				}
				return { initWidth, setWidth }
	}
}

export { TextKerning }
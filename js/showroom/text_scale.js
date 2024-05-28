class TextScale {
    constructor(el, option) {
        this.el = el
				this.menus = this.el.querySelectorAll('.ux-text-el')

        const basicOption = {
            position: "bottom",
            duration: 0.7,
            stagger: 0.02,
            easing: "power4.out",
            delay: 0,
            unit: "letter",
        }

        this.option = Object.assign(basicOption, option)

        this.textAll = []
    }
    init() {
        this.convertText(this.el)
        this.setGsap()
        this.play(this.el)
    }
		inits() {
			this.menus.forEach(menu => {
				this.convertText(menu)
				this.setGsap()
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
    setGsap() {
        gsap.set(this.textAll, {
            scale: 0,
            y: this.checkPosition().valueY,
            alpha: 0,
        })
    }
    setOption(option) {
        this.option = Object.assign(this.option, option)
    }
    gsapForward(textEle) {
			this.textAll = [...textEle.querySelectorAll('.split')]
        gsap.to(textEle, {
            alpha: 1,
        })

        gsap.to(this.textAll, {
            scale: 1,
            y: 0,
            duration: this.option.duration,
            stagger: this.option.stagger,
            delay: this.option.delay,
            alpha: 1,
            ease: this.option.easing,
            overwrite: true
        })
    }
    gsapBackward(textEle) {
			this.textAll = [...textEle.querySelectorAll('.split')];
        gsap.to(this.textAll, {
            scale: 0,
            y: this.checkPosition().valueY,
            duration: this.option.duration,
            stagger: {
                each: this.option.stagger,
                from: "end"
            },
            alpha: 0,
            ease: this.option.easing,
            overwrite: true
        })
    }
    // 텍스트 변환
    convertText(textEle) {
        const text = textEle.innerText

        textEle.innerHTML = ''

        // 공백을 모두 제거하고 \n으로 나눈다
        const textArr = text.replace(/  /g, '').split('\n')

        // \n으로 나눈 배열 사이에 /을 삽입한다.
        const insertArr = this.insertEnter(textArr, '/')

        if (this.option.unit == "word") {
            insertArr.forEach(el => {
                const splitWord = el.split(' ')
                this.makeDomFnc(splitWord, '/', textEle)
            })
        } else if (this.option.unit == "letter") {
            insertArr.forEach(el => {
                const splitWord = el.split('')
                this.makeDomFnc(splitWord, '/', textEle)
            })
        }
        this.textAll = [...textEle.querySelectorAll('.split')]
    }
    insertEnter(array, insert) {
        return [...Array(2 * array.length - 1)].map((_, i) => i % 2 ? insert : array[i / 2])
    }
    makeDomFnc(word, enterLetter, textEle) {
        word.forEach(el => {
            if (el == enterLetter) {
                textEle.innerHTML += `<br>`
            }
            else if (el == ' ') {
                textEle.innerHTML += `&nbsp;`
            }
            else {
                if (this.option.unit == "word") {
                    textEle.innerHTML += `<div class="split">${el}&nbsp;</div>`
                } else {
                    textEle.innerHTML += `<div class="split">${el}</div>`
                }
            }
        })
    }
    checkPosition() {
        let valueY
        if (this.option.position == "center") {
            valueY = 0
        } else if (this.option.position == "bottom") {
            valueY = "40%"
        }
        return { valueY: valueY }
    }
}

export { TextScale }
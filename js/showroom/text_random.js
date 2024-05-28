class RandomShow {
    constructor(el, option) {
        this.el = el
				this.menus = this.el.querySelectorAll('.ux-text-el')

        const basicOption = {
            unit: "letter",
            duration: 1.2,
            stagger: 0.04,
            easing: "linear",
            delay: 0,
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
            alpha: 0,
        })
    }
    setOption(option) {
        this.option = Object.assign(this.option, option)
    }
    gsapForward(textEle) {
			this.textAll = [...textEle.querySelectorAll('.split')];
        gsap.to(textEle, {
            alpha: 1
        })

        gsap.to(this.textAll, {
            delay: this.option.delay,
            duration: this.option.duration,
            stagger: {
                each: this.option.stagger,
                from: "random"
            },
            alpha: 1,
            ease: this.option.easing,
            overwrite: true
        })
    }
    gsapBackward(textEle) {
			this.textAll = [...textEle.querySelectorAll('.split')];
        gsap.to(this.textAll, {
            delay: 0,
            duration: 0,
            alpha: 0,
            ease: this.option.easing,
            overwrite: true
        })
    }
		convertText(textEle) {
			const text = textEle.textContent;
	
			textEle.innerHTML = '';
	
			const textArr = text.replace(/\s+/g, ' ').split('\n');
	
			const splitFunc = this.option.unit === 'word' ? (el) => el.split(' ') : (el) => el.split('');
	
			textArr.forEach((el) => {
					const splitWords = splitFunc(el);
					this.makeDomFnc(splitWords, '/', textEle);
			});
	
			this.textAll = [...textEle.querySelectorAll('.split')];
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
} 

export { RandomShow }
class TextShow {
    constructor(el, option) {
        this.el = el
				this.menus = this.el.querySelectorAll('.ux-text-el')

        const basicOption = {
					unit: "sentence",
					direction: "to-top",
					duration: 1.1,
					stagger: 0.1,
					easing: "power4.out",
					delay: 0,
        }

        this.option = Object.assign(basicOption, option)

        this.textAll = []
				this.menuStates = {};
    }
    init() {
        this.convertText(this.el)
        this.setGsap()
        this.play(this.el)
    }
		inits() {	 
			this.menus.forEach((menu, idx) => { 
				this.convertText(menu); 
				this.setGsap(); 
				// 인덱스를 이용하여 play 메소드 호출 
				this.play(menu); 
			}); 
	} 
	 
	play(textEle = this.el) { 
 
		if (textEle.classList.contains('active')) { 
			this.gsapForward(textEle); 
		} else { 
			this.gsapBackward(textEle); 
		} 
	} 
 
	setGsap() { 
			gsap.set(this.textAll, { 
					x: this.checkDirection().valueX, 
					y: this.checkDirection().valueY, 
					rotate: this.checkDirection().rotate, 
					alpha: 0, 
			}) 
	} 
	setOption(option) { 
			this.option = Object.assign(this.option, option) 
	} 
	gsapForward(textEle) { 
    this.textAll = [...textEle.querySelectorAll('.split')]; 
 
			gsap.to(textEle, { 
					alpha: 1, 
			}) 
			gsap.to(this.textAll, { 
					delay: this.option.delay, 
					x: 0, 
					y: 0, 
					rotate: 0, 
					duration: this.option.duration, 
					stagger: this.option.stagger, 
					alpha: 1, 
					ease: this.option.easing, 
					overwrite: true 
			}) 
	} 
	gsapBackward(textEle) { 
    this.textAll = [...textEle.querySelectorAll('.split')]; 
 
			gsap.to(this.textAll, { 
					x: this.checkDirection().valueX, 
					y: this.checkDirection().valueY, 
					rotate: this.checkDirection().rotate, 
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
		const text = textEle.textContent;
		textEle.innerHTML = ''
		
		// 공백을 모두 제거하고 \n으로 나눈다
		const textArr = text.replace(/  /g, '').split('\n')

		// \n으로 나눈 배열 사이에 /을 삽입한다.
		const insertArr = this.insertEnter(textArr, '/')

		if (this.option.unit == "sentence") {
				this.makeDomFnc(insertArr, '/', textEle)
		} else if (this.option.unit == "word") {
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
    checkDirection() {
        let valueX
        let valueY
        let rotate = 0
        if (this.option.direction == "normal") {
            valueY = 0
            valueX = 0
        } else if (this.option.direction == "to-left") {
            valueY = 0
            valueX = "50px"
        } else if (this.option.direction == "to-top") {
            valueY = "100%"
            valueX = 0
        } else if (this.option.direction == "to-top-ro") {
            valueY = "100%"
            valueX = 0
            rotate = 30
        }
        return { valueX: valueX, valueY: valueY, rotate: rotate }
    }

}

export { TextShow }

// 클로저
// 실행 컨텍스트
// 렉시컬 환경
// 프로토타입
// 생성자

// 인스턴스

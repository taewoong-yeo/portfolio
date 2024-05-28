// ******************* 텍스트 플립 애니메이션 ******************* //
class TextFlip {
    constructor(el, option) {
        this.el = el
				this.menus = this.el.querySelectorAll('.ux-text-el')
        this.void = null;

        // 기본 옵션 normal 기준
        const basicOption = {
            direction: "vertical",
            angle: -90,
            duration: 0.3,
            stagger: 0.03,
            delay: 0,
            easing: "linear",
            unit: "letter"
        }

        this.option = Object.assign(basicOption, option)

        this.textAll = []
    }
    init() {
        this.convertText(this.el)
        this.setGsap()
        this.play()
    }
		inits() {
			this.menus.forEach(menu => {
				this.convertText(menu)
				this.setGsap()
				this.play(menu)
      })
		}
		
    /***************************************************
        'active' 클래스가 있으면 animate start
        'active' 클래스가 없으면 animate reverse
    ***************************************************/
		play(textEle = this.el) {
			if (textEle.classList.contains('active')) {
				this.gsapForward(textEle)
			} else {
					this.gsapBackward(textEle)
			}
		}

    /***************************************************
        gsap animate 재생 전 setting
    ***************************************************/
    setGsap() {
			gsap.set(this.textAll, {
					rotateY: this.checkDirection().valueY,
					rotateX: this.checkDirection().valueX,
					alpha: 0,
			})
    }

    /***************************************************
        gsap animate start, reverse fnc
    ***************************************************/
		gsapForward(textEle) {
			this.textAll = [...textEle.querySelectorAll('.split')]
			
			gsap.set(textEle, {
					alpha: 1
			})
	
			gsap.to(this.textAll, {
					delay: this.option.delay,
					rotateY: 0,
					rotateX: 0,
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
					rotateY: this.checkDirection().valueY,
					rotateX: this.checkDirection().valueX,
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

    /***************************************************
        방향과 각도를 체크해서 setting할 값 리턴
    ***************************************************/
    checkDirection() {
        let valueX
        let valueY
        if (this.option.direction == "horizontal") {
            valueY = 0
            valueX = this.option.angle + 'deg'
        } else if (this.option.direction == "vertical") {
            valueY = this.option.angle + 'deg'
            valueX = 0
        }
        return { valueX, valueY }
    }


    /***************************************************
        animate 시작 전에 텍스트를 잘라주는 fnc
    ***************************************************/
		convertText(textEle) {
			const text = textEle.innerText
			textEle.innerHTML = ''

			// // 공백을 모두 제거하고 \n으로 나눈다
			const textArr = text.replace(/  /g, '').split('\n')

			// // \n으로 나눈 배열 사이에 /을 삽입한다.
			const insertArr = this.insertEnter(textArr, '/')

			if (this.option.unit == "word") {
					insertArr.forEach(el => {
							const splitWord = el.split(' ')
							this.makeDomFnc(splitWord, '/', textEle)
					})
			} else if(this.option.unit == "letter") {
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

    // 버튼이나 입력창으로 값을 수정해야 할 때(버튼 모듈 용)
    setOption(option) {
        this.option = Object.assign(this.option, option)
    }
}


export { TextFlip  }
class GnbRandomText {
    constructor(el) {
        this.el = el
        this.menu = this.el.querySelectorAll('.ux-menu-m')
				this.menu2 = this.el.querySelector('.ux-menu-m') // 추가한 변수
        this.char = 'abcdefghijklmnopqrstuvwxyz0123456789!?*()@£$%^&_-+=[]{}:;\'"\\|<>,./~`×';

        this.option = {
            speed: 3,
        }

        this.originText = [...this.menu].map(text => text.textContent)
				this.originText2 = this.menu2.textContent // 추가한 변수

        this.timeout = null
        this.repeat = 0                                         

        this.forwardRandom = this.forwardRandom.bind(this)
        this.backwardRandom = this.backwardRandom.bind(this)
    }
    init() {
        this.applyGnb()
    }

		play() {
			this.splitText(this.menu2)

			// this.forwardRandom 메소드 내용
			// 수정해야 될 부분이 너무 많아서 쇼룸에 적용할 수 있게 일단 play 메소드에 적어놓음
			clearInterval(this.timeout)
			const menuIndex = 0
			if (this.repeat !== 0) {
				this.changeOriginText([...this.menu2.children], 0)
			}

			this.repeat = this.option.speed
			this.timeout = setInterval(() => {
					if (this.repeat == 0) {
							this.changeOriginText([...this.menu2.children], menuIndex)
					} else {
							this.changeRandomText([...this.menu2.children])
					}
					this.repeat--
			}, 80)
		}

		stop() {
			// this.backwardRandom 메소드 내용을 쓰지 않아도 작동해서 주석처리 해놓음
			// 근데 간헐적으로 gnb가 작동 후 원래 글자로 돌아오지 않을 때가 있는데 여기서 안 써서 그런거 같기도 함...
			// this.mouseLeave(this.el)
		}


    /***************************************************
          전체 메뉴에 적용
    ***************************************************/
    applyGnb() {
        this.menu.forEach(el => {
            this.splitText(el)
            this.mouseEnter(el)
            this.mouseLeave(el)
        });
    }

    /***************************************************
          hover fnc
    ***************************************************/
    mouseEnter(el) {
        el.addEventListener('mouseenter', this.forwardRandom)
    }
    /***************************************************
          leave fnc
    ***************************************************/
    mouseLeave(el) {
        el.addEventListener('mouseleave', this.backwardRandom)
    }


    /***************************************************
          hover, leave일 때의 함수
    ***************************************************/
    forwardRandom(e) {
        clearInterval(this.timeout)

        const menuIndex = [...this.menu].indexOf(e.target)

        // enter전 리셋
        if (this.repeat != 0) {
            this.menu.forEach((el, index) => {
                this.changeOriginText([...el.children], index)
            });
        }

        this.repeat = this.option.speed
        this.timeout = setInterval(() => {
            if (this.repeat == 0) {
                this.changeOriginText([...e.target.children], menuIndex)
            } else {
                this.changeRandomText([...e.target.children])
            }
            this.repeat--
        }, 80)
    }
    backwardRandom(e) {
        clearInterval(this.timeout)

        const menuIndex = [...this.menu].indexOf(e.target)

        // leave전 리셋
        if (this.repeat != this.option.speed) {
            this.menu.forEach((el, index) => {
                this.changeOriginText([...el.children], index)
            });
        }

        this.repeat = 0
        this.timeout = setInterval(() => {
            if (this.repeat == this.option.speed) {
                this.changeOriginText([...e.target.children], menuIndex)
            } else {
                this.changeRandomText([...e.target.children])
            }

            this.repeat++
        }, 80)
    }


    /***************************************************
          글씨를 원래의 문자로 바꿔주는 함수
    ***************************************************/
    changeOriginText(target, menuIndex) {
      clearInterval(this.timeout);
			target.forEach((el, index) => {
					el.textContent = this.originText[menuIndex][index]
			})
    }

    /***************************************************
          글씨를 랜덤한 문자로 바꿔주는 함수
    ***************************************************/
    changeRandomText(target) {
        target.forEach(el => {
            el.textContent = this.selectRandomChar()
        })
    }


    /***************************************************
          메뉴의 글씨 쪼개기
    ***************************************************/
		splitText(el) {
			el.innerHTML = el.textContent.replace(/\S/g, "<div class='split'>$&</div>");
		}
		

    /***************************************************
          랜덤한 문자 뽑기
    ***************************************************/
    selectRandomChar() {
        const randomNum = Math.floor(Math.random() * this.char.length)
        return this.char[randomNum]
    }
}

export { GnbRandomText }
class Paparazzi {
    constructor(el) {
        this.el = el
        this.width = this.el.offsetWidth
        this.height = this.el.offsetHeight
        this.calcCoord = []
    }
    init() {
			this.position()
    }
    position() {
			this.mouseenter()
			this.mouseleave()
			this.resizing()
    }
		play(e) { // 새로운 메소드 이벤트 버블링 일어날까봐 mouseenter안씀
			this.setValue(e)
			this.removeClass()
			this.addClass('in')
			this.el.classList.add('active')
		}
		stop(e) { // 새로운 메소드 이벤트 버블링 일어날까봐 mouseleave안씀
			this.setValue(e)
			this.removeClass()
			this.addClass('out')
			this.el.classList.remove('active')
		}

    // mouse enter event
    mouseenter() {
			this.el.addEventListener('mouseenter', (e) => {
				this.setValue(e)
				this.removeClass()
				this.addClass('in')
			})
    }
    // mouse leave event
    mouseleave() {
			this.el.addEventListener('mouseleave', (e) => {
				this.setValue(e)
				this.removeClass()
				this.addClass('out')
			})
    }

    // cursor x,y position check
    setValue(e) {
			const { x, y } = this.el.getBoundingClientRect()

			const cursorX = e.clientX - x
			const cursorY = e.clientY - y

			const coord = [
				{ name: 'top', pos: cursorY },
				{ name: 'bottom', pos: this.height - cursorY },
				{ name: 'left', pos: cursorX },
				{ name: 'right', pos: this.width - cursorX }
			]

			this.calcCoord = coord.sort((a, b) => a.pos - b.pos)
    }

    //class add
    addClass(plus) {
			switch (this.calcCoord[0].name) {
				case 'top': this.el.classList.add(`${plus}-top`)
						break;
				case 'bottom': this.el.classList.add(`${plus}-bottom`)
						break;
				case 'left': this.el.classList.add(`${plus}-left`)
						break;
				case 'right': this.el.classList.add(`${plus}-right`)
						break;
			}
    }
    // class remove
    removeClass() {
        const list = [...this.el.classList]
        list.map(el => el.match(/in-|out-/g) ? this.el.classList.remove(el) : null)
    }

    // resizing window, this.el width, height recheck
    resizing() {
        let isResize

        window.addEventListener('resize', (e) => {
            window.clearTimeout(isResize)
            isResize = setTimeout(() => {
                this.width = this.el.offsetWidth
                this.height = this.el.offsetHeight
            }, 300)
        })
    }
}

export { Paparazzi }
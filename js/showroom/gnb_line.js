class GnbLineAnimation {
    constructor(el) {
        this.el = el
        this.menu = [...this.el.querySelectorAll('.ux-menu-m')]
				this.showMenu = this.el.querySelector('.ux-menu-m')
        this.gnb = this.el.querySelector('.ux-mu')
        this.leave = this.leave.bind(this)
        this.enter = this.enter.bind(this)
    }
    init() {
        this.mouseEnter()
        this.mouseLeave()
    }

    // mouse enter
    mouseEnter() {
        this.menu.forEach(menu => {
            menu.addEventListener('mouseenter', this.enter)
        });
    }
    // mouse leave
    mouseLeave() {
        this.gnb.addEventListener('mouseleave', this.leave)
    }
}

class TrackMenu extends GnbLineAnimation {
    constructor(el, color, eventType) {
        super(el)
        this.color = color
				this.index = 0
				this.eventType = eventType
    }
    init() {
        this.makeDom()
        this.leave()
        super.init()
    }
		play() { // 새로운 메소드
			// 쇼룸에선 mouseover시 track이 연속 재생되는 애니메이션이 필요해서 새롭게 만듦 
			if(this.eventType === 'mouseover') {
				this.makeDom();
				let i = 0;
				const menuLength = this.menu.length;
			
				const runTimeout = () => {
					if (i === 0) {
						this.enter2(this.menu[i]);
					}
			
					setTimeout(() => {
						if (this.eventType === 'mouseover' && i === 2) {
							i = -1;
						}
			
						i++;
			
						if (i < menuLength) {
							this.enter2(this.menu[i]);
							runTimeout();
						}
					}, 800);
					
				};

				runTimeout();
			}else {
				clearTimeout(runTimeout);
			}
		}
		stop() { // 새로운 메소드
			this.menu.forEach(menu => {
				menu.classList.remove('active')
			})
			this.leave()
			this.el.querySelector('.track-line').remove()
		}
    // line move
    enter(e) {
        const target = e.target
        const gnbW = this.gnb.getBoundingClientRect().x
        const { x, width } = target.getBoundingClientRect()
        const line = document.querySelector('.track-line')
				
        line.style.setProperty('--width', width + 'px')
        line.style.setProperty('--left', x - gnbW + 'px')

        gsap.to(line, 0.3, {
            alpha: 1,
            display: "block"
        })

        this.resetColor()
        target.style.color = this.color == undefined ? 'inherit' : this.color
    }
    enter2(el) { // 새로운 메소드
				// mouse event를 타고 들어오지 않기 때문에 target이 없어서 새로 만듦
        const gnbW = this.gnb.getBoundingClientRect().x
        const { x, width } = el.getBoundingClientRect()
        const line = document.querySelector('.track-line')

        line.style.setProperty('--width', width + 'px')
        line.style.setProperty('--left', x - gnbW + 'px')

        gsap.to(line, 0.3, {
            alpha: 1,
            display: "block"
        })

        this.resetColor()
        el.style.color = this.color == undefined ? 'inherit' : this.color
    }
    // line display none
    leave() {
        const line = document.querySelector('.track-line')

        gsap.to(line, 0.3, {
            alpha: 0,
            display: "none"
        })

        this.resetColor()

    }

    resetColor() {
        this.menu.map((el, index) => this.menu[index].style.color = 'inherit')
    }
    //make line dom
    makeDom() {
        const ul = this.el.querySelector('ul')
        const tag = document.createElement('span')
        tag.className = 'track-line'
        ul.append(tag)
    }

}

export { TrackMenu }
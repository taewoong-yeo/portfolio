class videoHover {
    constructor(el) {
        this.el = el
				this.video = this.el.querySelector('video')
    }
    init() {
        this.mouseEnter()
        this.mouseLeave()
    }
		play() { // 새로운 메소드
			this.video.play() // 비디오 재생
			this.el.classList.add('active') // css용
		}
		stop() { // 새로운 메소드
			this.video.pause() // 비디오 멈춤
			this.el.classList.remove('active') // css용
		}
    mouseEnter() {
        this.el.addEventListener('mouseenter', () => {
            this.el.querySelector('video').play()
        })
    }
    mouseLeave() {
        this.el.addEventListener('mouseleave', () => {
            this.el.querySelector('video').pause()
        })
    }
}

export { videoHover }
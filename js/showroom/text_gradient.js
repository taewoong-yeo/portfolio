class TextVideo {
	constructor(el) {
		this.el = el
		this.video = this.el.querySelector('video')
	}
	init() {
		// 상세용
	}
	inits() {
		// 미리보기용
		console.log(this.video)
		this.video.play()
	}
}

export  { TextVideo }
// 분해해서 보여지기
class TypingText {
	constructor(el, option) {
			// this.el = el[0]
			this.el = el
			this.result = this.el.querySelector('.text-typing').textContent.split('')
			this.text = [...this.el.querySelector('.text-typing').textContent]
			const basicOption = {
					duration: 80,
					delay: 0,
			}

			this.option = Object.assign(basicOption, option)

			this.cho = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
			this.jung = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ']
			this.jong = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
			
			this.codeInit = '0xAC00' // 한글 유니코드 포인트 "가"
			this.splitTextArr = []
			this.texting = ''
			this.interval = null

			this.count0 = 0
			this.count1 = 0
			this.count2 = 0
		}
	
	// 상세 페이지 init
	init() {
		this.play()
	}

	// 미리 보기 페이지 init
	inits() {
		// this.play()
	}

	play() {
		this.splitText()
		this.typingTimeout()
	}

	typingTimeout () {
		this.typing()
		this.interval = setInterval(this.typing, 8000)
	}

	typing () {
		const textArea = this.el.querySelector('.text-typing')
		
		if (this.count1 < this.splitTextArr[this.count0].length) {
			const subMax = this.splitTextArr[this.count0][this.count1].length
			textArea.innerHTML = this.texting + this.splitTextArr[this.count0][this.count1][this.count2]
			this.count2 += 1
			if (this.count2 === subMax) {
				this.texting += this.splitTextArr[this.count0][this.count1][this.count2 - 1]
				this.count1 += 1
				this.count2 = 0
			}
		}
		else {
			clearInterval(this.interval);
			if (this.count0 === this.splitTextArr.length - 1) {
				setTimeout(() => {
					this.texting = '';
					this.count0 += 1;
					this.count1 = 0;
					this.count2 = 0;

					if (this.count0 === this.splitTextArr.length) this.count0 = 0
					this.interval = setInterval(this.typing, this.option.duration)
				}, this.option.delay)
			}
		}
	}

	/***************************************************
				글자 쪼개는 영역
	***************************************************/
	splitText() { // 글자 하나씩 분해
		this.result.forEach((txt, index) => {
			this.splitTextArr[index] = []
			Array.from(txt).forEach((char, idx) => {
				this.splitTextArr[index][idx] = this.divisionChar(char)
			})
		})
	}

	/***************************************************
				글자를 초성, 중성, 종성 분해
	***************************************************/
	divisionChar(char) { // 글자를 초성, 중성, 종성 분해
		let charCho; 
		let charJung; 
		let charJong;
		let unicode;
		const divCharArr = []
		for (let i = 0; i < char.length; i++ ) {
			unicode = char.charCodeAt(i)
			if (unicode === 32) { // 띄어쓰기
				divCharArr.push(' ')
			} else if (unicode === 10) { // \n 줄바꿈
				divCharArr.push('<br>')
			} else if (unicode < this.codeInit || unicode > '0xD7A3') { // 한글 아닐 때
				divCharArr.push(char.charAt(i))
			} else {
				unicode = String(char.charCodeAt(i) - this.codeInit)

				charJong = unicode % 28
				charJung = ((unicode - charJong) / 28) % 21
				charCho = (((unicode - charJong) / 28) - charJung) / 21
				divCharArr.push(this.cho[charCho])
				
				const subJung = this.checkSplitChar(this.jung[charJung])
				if (subJung) divCharArr.push(String.fromCharCode(44032 + (charCho * 28 * 21) + (subJung * 28)))
				divCharArr.push(String.fromCharCode(44032 + (charCho * 28 * 21) + (charJung * 28)))
				if (this.jong[charJong] !== '') {
					const subJong = this.checkSplitChar(this.jong[charJong])
					if (subJong) divCharArr.push(String.fromCharCode(44032 + (charCho * 28 * 21) + (charJung * 28) + subJong))
					divCharArr.push(String.fromCharCode(44032 + (charCho * 28 * 21) + (charJung * 28) + charJong))
				}
			}
		}
		return divCharArr
	}
			

	checkSplitChar(char) { // 중성, 종성 타이핑 느낌 나도록 중간 과정 추가
		const subjung = ['ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ']
		const subjong = ['ㄲ', 'ㄳ', 'ㄵ', 'ㄶ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅄ', 'ㅆ']

		if (subjung.includes(char)) {
			if (char === 'ㅘ' || char === 'ㅙ' || char === 'ㅚ') return 8;
			if (char === 'ㅝ' || char === 'ㅞ' || char === 'ㅟ') return 13;
			if (char === 'ㅢ') return 18;
		} else if (subjong.includes(char)) {
			if (char === 'ㄲ' || char === 'ㄳ') return 1;
			if (char === 'ㄵ' || char === 'ㄶ') return 4;
			if (char === 'ㄺ' || char === 'ㄻ' || char === 'ㄼ' || char === 'ㄽ' || char === 'ㄾ' || char === 'ㅀ') return 8;
			if (char === 'ㅄ') return 17;
			if (char === 'ㅆ') return 19;
		}

		return null;
	}   

	/***************************************************
				외부에서 옵션 제어용
	***************************************************/
	setOption(option) {
			this.option = Object.assign(this.option, option)
	}
}


export { TypingText }
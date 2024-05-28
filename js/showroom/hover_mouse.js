// ****************************** common ****************************** //
class Tracking {
    constructor(el) {
        this.el = el
        this.x = null;
        this.y = null;
    }
    init() {
        this.event()
    }
    event() {
        this.mouseenter()
        this.mouseleave()
        this.resizing()
    }
    resizing() {
        window.addEventListener('resize', () => {
            const newcoor = this.el.getBoundingClientRect()
            this.x = newcoor.x
            this.y = newcoor.y
        })
    }
}


// ******************************* skew ******************************* //
class TrackingSkew extends Tracking {
    constructor(el, option) {
        super(el)
        this.skew = null
        this.skewEffect = this.skewEffect.bind(this)

        const basicOption = {
            type: "normal",
            img: false,
            text: false,
            textEl: null
        }

        this.option = Object.assign(basicOption, option)
        this.size = this.option.type == "normal" ? 1 : 1.07
        this.textEl = this.option.text ? this.el.querySelector(`${this.option.textEl} p`) : null
    }
		play() { // 새로운 메소드
			this.skew = this.el.getBoundingClientRect() 
			this.el.addEventListener('mousemove', this.skewEffect)
		}
		stop() { // 새로운 메소드
			document.removeEventListener('mousemove', this.skewEffect);
			this.el.style.transform = ''

			if (this.option.img) {
					this.el.style.transition = 'all .3s ease-out'
					this.el.style.backgroundPosition = '50% 50%'
			}
			if (this.textEl !== null) {
					this.textEl.transition = 'all .3s ease-out'
					this.textEl.style.transform = ''
			}
		}
    mouseenter() {
        this.el.addEventListener('mouseenter', () => {
            this.skew = this.el.getBoundingClientRect()
            this.el.addEventListener('mousemove', this.skewEffect)
        })
    }
    mouseleave() {
        this.el.addEventListener('mouseleave', () => {
            document.removeEventListener('mousemove', this.skewEffect);
            this.el.style.transform = ''

            if (this.option.img) {
                this.el.style.transition = 'all .3s ease-out'
                this.el.style.backgroundPosition = '50% 50%'
            }
            if (this.textEl !== null) {
                this.textEl.transition = 'all .3s ease-out'
                this.textEl.style.transform = ''
            }
        })
    }
    skewEffect(e) {
        const left = e.clientX - this.skew.x
        const top = e.clientY - this.skew.y
        const centerX = left - this.skew.width / 2
        const centerY = top - this.skew.height / 2
        const d = Math.sqrt(centerX ** 2 + centerY ** 2)

        this.el.style.transform = `
        scale3d(${this.size}, ${this.size}, ${this.size})
        rotate3d(
          ${centerY / 100},
          ${-centerX / 100},
          0,
          ${Math.log(d) * 2}deg
        )
      `

        if (this.option.img) {
            this.el.style.transition = ''
            this.el.style.backgroundPosition = `
            ${50 + (centerX / 5)}% ${50 + (centerY / 5)}%
            `
        }

        if (this.option.text) {
            this.textEl.style.transform = `
            translateX(${centerX / 5}px) translateY(${centerY / 5}px) translateZ(100px)
            `
        }
    }
}


// ******************************* move ******************************* //
class TrackingMove extends Tracking {
    constructor(el) {
        super(el)
    }
		play() { // 새로운 메소드
			this.mouseenter()
		}
		stop() { // 새로운 메소드
			this.mouseleave()
		}
    mouseenter() {
        this.el.addEventListener('mouseenter', () => {
            let { x, y, width, height } = this.el.getBoundingClientRect()
            this.el.addEventListener('mousemove', (e) => {
                this.x = x
                this.y = y
                const left = e.clientX - this.x
                const top = e.clientY - this.y
                const centerX = left - width / 2
                const centerY = top - height / 2
                this.el.style.transform = `translate(
          ${centerX / 10}px, ${centerY / 10}px
          )`
            })
        })
    }
    mouseleave() {
        this.el.addEventListener('mouseleave', () => {
            this.el.style.transform = ''
        })
    }
}


// ******************************* water ******************************* //
class TrackingWater extends Tracking {
    constructor(el) {
        super(el)
        this.isRun = true
        this.resolveRippleTimer = null
    }
    init() {
        this.waterRipple(this.el)
        this.playRipple();
    }
    waterRipple(img) {
        var canvas = document.createElement('canvas'),

            ctx = canvas.getContext('2d'),
            width = img.width,
            height = img.height,
            half_width = width >> 1,
            half_height = height >> 1,
            size = width * (height + 2) * 2,
            delay = 48,
            oldind = width,
            newind = width * (height + 3),
            riprad = 10,
            ripplemap = [],
            last_map = [],
            ripple,
            texture,
            mbData = 4096;

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0);
        canvas.style.left = img.offsetLeft + 'px';
        canvas.style.top = img.offsetTop + 'px';

        img.parentNode.insertBefore(canvas, img);


        texture = ctx.getImageData(0, 0, width, height);
        ripple = ctx.getImageData(0, 0, width, height);

        for (var i = 0; i < size; i++) {
            last_map[i] = ripplemap[i] = 0;
        }

        /**
         * Main loop
         */
        function run() {
            newframe();
            ctx.putImageData(ripple, 0, 0);
        }

        /**
         * Disturb water at specified point
         */
        function disturb(dx, dy) {
            dx <<= 0;
            dy <<= 0;

            for (var j = dy - riprad; j < dy + riprad; j++) {
                for (var k = dx - riprad; k < dx + riprad; k++) {
                    ripplemap[oldind + (j * width) + k] += 32;
                }
            }
        }

        /**
         * Generates new ripples
         */
        function newframe() {
            var a, b, data, cur_pixel, new_pixel, old_data;

            var t = oldind;
            oldind = newind;
            newind = t;
            var i = 0;

            // create local copies of variables to decrease
            // scope lookup time in Firefox
            var _width = width,
                _height = height,
                _ripplemap = ripplemap,
                _last_map = last_map,
                _rd = ripple.data,
                _td = texture.data,
                _half_width = half_width,
                _half_height = half_height;

            for (var y = 0; y < _height; y++) {
                for (var x = 0; x < _width; x++) {
                    var _newind = newind + i,
                        _mapind = oldind + i;
                    data = (
                        _ripplemap[_mapind - _width] +
                        _ripplemap[_mapind + _width] +
                        _ripplemap[_mapind - 1] +
                        _ripplemap[_mapind + 1]) >> 1;

                    data -= _ripplemap[_newind];
                    data -= data >> 5;

                    _ripplemap[_newind] = data;

                    //where data=0 then still, where data>0 then wave
                    data = mbData - data;

                    old_data = _last_map[i];
                    _last_map[i] = data;

                    if (old_data != data) {
                        //offsets
                        a = (((x - _half_width) * data / mbData) << 0) + _half_width;
                        b = (((y - _half_height) * data / mbData) << 0) + _half_height;

                        //bounds check
                        if (a >= _width) a = _width - 1;
                        if (a < 0) a = 0;
                        if (b >= _height) b = _height - 1;
                        if (b < 0) b = 0;

                        new_pixel = (a + (b * _width)) * 4;
                        cur_pixel = i * 4;

                        _rd[cur_pixel] = _td[new_pixel];
                        _rd[cur_pixel + 1] = _td[new_pixel + 1];
                        _rd[cur_pixel + 2] = _td[new_pixel + 2];
                    }

                    ++i;
                }
            }
        }

        canvas.onmousemove = function (evt) {
            disturb(evt.offsetX || evt.layerX, evt.offsetY || evt.layerY);
        };

        setInterval(run, delay);

        // generate random ripples
        var rnd = Math.random;
        setInterval(function () {
            if (this.isRun) {
                disturb(rnd() * width, rnd() * height);
            }
        }, 500);
    }
    playRipple() {
        this.isRun = true;
        /* alway ripple for 9 second & stop */
        clearTimeout(this.resolveRippleTimer);
        this.resolveRippleTimer = setTimeout(function () {
            this.pauseRipple();
        }, 9000);
    }
    pauseRipple() {
        this.isRun = false;
    }
}


// ****************************** circle ****************************** //
class TrackingCircle extends Tracking {
    constructor(el) {
        super(el)
        this.circle = ''
        this.timeout = null
    }
		showroomPlay() { // 새로운 메소드
			// 쇼룸용으로 init 대신 사용
			this.mouseenter()
			this.mouseleave()
			const circles = this.el.querySelectorAll('.circle')
			if(circles.length > 1) {
				circles[1].remove() // 제거 안해주면 html에 circle이 계속 쌓여서 제거
														// 근데 원래 상세 페이지에서는 안 쌓이는거 보면 적용을 잘못한 거 같기도 함
			}
		}
    mouseenter() {
        this.makeCircle()

        this.el.addEventListener('mouseenter', (e) => {
            // clearTimeout(this.timeout)
            // this.circle.style.opacity = 1

            this.position(e)

            this.circle.classList.add('active')
        })
    }
    mouseleave() {
        this.el.addEventListener('mouseleave', (e) => {
            this.circle.classList.remove('active')

            this.position(e)

            // this.timeout = setTimeout(() => {
            //     this.circle.style.opacity = 0
            // }, 300)
        })
    }
    makeCircle() {
        const circle = document.createElement('div')
        circle.className = "circle"
        this.el.append(circle)
        this.circle = circle
    }
    position(e) {
        const circleWidth = this.circle.offsetWidth
        let { x, y } = this.el.getBoundingClientRect()
        this.x = x
        this.y = y
        const left = e.clientX - this.x
        const top = e.clientY - this.y
        const centerX = left - circleWidth / 2
        const centerY = top - circleWidth / 2

        this.circle.style.setProperty('--top', centerY + 'px')
        this.circle.style.setProperty('--left', centerX + 'px')
    }
}

export { TrackingSkew, TrackingMove, TrackingWater, TrackingCircle }
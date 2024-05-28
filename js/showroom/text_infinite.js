class InfiniteText {
    constructor(el, option) {
        this.el = el

        // 기본 옵션 normal 기준
        const basicOption = {
            direction: -1,
            speed: 2,
        }

        this.option = Object.assign(basicOption, option)
        this.interval = null
    }

    init() {
        this.copyText()
        this.flowPlay(this.el, this.option.speed)
    }
    flowPlay(el, speed) {
        if(el === null) return
        const textWidthHelf = el.parentNode.scrollWidth / 2
        let count = 0
        cancelAnimationFrame(this.interval)

        const flow = () => {
            if (this.option.direction < 0 && count * speed > textWidthHelf) {
                count = 0
                el.parentNode.style.transform = `translateX(${count * speed})`
            } else if (this.option.direction > 0 && count * speed > 0) {
                count = - textWidthHelf / speed
                el.parentNode.style.transform = `translateX(${count})`
            }
            el.parentNode.style.transform = `translateX(${count * this.option.direction * speed}px)`

            return count
        }

        const loop = () => {
            count++
            count = flow()
            this.interval = window.requestAnimationFrame(loop)
        }

        loop()
    }
    copyText() {
        const copy = this.el.cloneNode(true)
        this.el.after(copy)
        return copy
    }

    terminate() {
      cancelAnimationFrame(this.interval);
      this.el.parentNode.style.transform = `translateX(0px)`;
  }
}

export { InfiniteText }
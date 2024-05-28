class GnbLineSpreadWordUp {
    constructor(el) {
      this.el = el
      this.gnb = this.el.querySelectorAll('.ux-menu-m')
          this.showGnb = this.el.querySelector('.ux-menu-m')
      this.word = []
          this.wordList = []
    }
  
    init() {
      this.split()
    }
  
      play() {
          this.split()
          this.showGnb.classList.add('active')
          this.wordList = this.el.querySelectorAll('span')
      }
  
      stop() {
          this.showGnb.classList.remove('active')
          this.wordList = this.el.querySelectorAll('span')
      }
  
    addClass(target) {
      target.forEach((el, index) => {
        el.classList.add(`up_0${index+1}`);
      })
    }
  
    split() {
      this.gnb.forEach((el)=>{
        el.innerHTML = el.textContent.replace(/\S/g, "<span>$&</span>");
        this.word = el.querySelectorAll("span")
  
        this.addClass(this.word) // addClass() -> ()안에 들어갈 곳이 addClass의 매개변수
      })
    }
  }
  
  export { GnbLineSpreadWordUp }
class hamburger {
    constructor(el, effectFnc) {
      this.el = el
      this.body = document.querySelector('body');
      this.container = document.querySelectorAll('.ux-sidebar-container')
      this.menuBtn = document.querySelector('.ux-sideBtn')
      this.menuText = null
      this.inner = null
  
      const basicOption = {
        menuEffectFnc: this.menuEffectFnc,
        innerEffectFnc: this.innerEffectFnc,
        etcEffect: null
      }
  
      this.effectFnc = effectFnc == "n" ? "notEffect" : Object.assign(basicOption, effectFnc)
  
      // showroom 리스트 전용  
      this.activeContainer = null
    }
    init() {
      this.container.forEach(container => {
        this.setViewport(container)
      })
      this.clickMenu()
    }
  
  
    /***************************************************  
        햄버거 메뉴 클릭 이벤트  
    ***************************************************/
    clickMenu() {
      this.menuBtn.addEventListener('click', () => {
        this.body.classList.toggle('is-sidebar')
  
        this.menuBtn.disabled = true
  
        this.showEffect()
  
        setTimeout(() => {
          this.menuBtn.disabled = false
        }, 1000);
      })
    }
  
  
    /***************************************************  
        뷰포트 사이즈 계산  
    ***************************************************/
    setViewport(target) {
      if (target == null) return
  
      let vh = window.innerHeight * 0.01
      target.style.setProperty('--vh', `${vh}px`)
  
      window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01
        target.style.setProperty('--vh', `${vh}px`)
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      })
    }
  
  
    /***************************************************  
        애니메니션 효과 실행  
    ***************************************************/
        showEffect(showroomListObj) {
          // Common effect function
          const applyEffect = (menu, innerItem) => {
            if (this.effectFnc !== "notEffect") {
              this.effectFnc?.menuEffectFnc(menu);
              this.effectFnc?.innerEffectFnc(innerItem);
            }
          };
        
          if (showroomListObj) {
            const { menuText, inner } = showroomListObj;
            applyEffect(menuText, inner);
          } else {
            console.log('not defined');
            this.container.forEach(container => {
              this.menuText = container.querySelectorAll('.ux-sidemenu a');
              this.inner = container.querySelector('.inner');
              applyEffect(this.menuText, this.inner);
            });
          }
        
          // Etc effect
          this.effectFnc.etcEffect?.();
        }
  
  
    /***************************************************  
        기본 애니메이션 셋팅  
    ***************************************************/
    innerEffectFnc(target) {
      if (document.querySelector('body').classList.contains('is-sidebar')) {
        gsap.set(target, {
          alpha: 1,
          overwrite: true,
        })
      } else {
        gsap.to(target, 0.2, {
          alpha: 0,
          ease: Power3.easeOut,
          overwrite: true,
        })
      }
    }
    menuEffectFnc(target) {
      if (document.querySelector('body').classList.contains('is-sidebar')) {
        gsap.set(target, {
          alpha: 0,
          overwrite: true,
        })
  
        gsap.to(target, 3, {
          delay: 0.1,
          alpha: 1,
          stagger: 0.1,
          ease: "Power4.easeOut",
          overwrite: true,
        })
      }
    }
  
    /***************************************************  
        햄버거 메뉴 호버 이벤트(쇼룸 전용)  
    ***************************************************/
    mouseOverMenu(target) {
      const { parentElement } = target
  
      const showroomObj = {
        menuText: target.querySelectorAll('.ux-sidemenu li'),
        inner: target.querySelector('.inner')
      }
  
      parentElement.classList.toggle('is-sidebar')
  
      this.showEffect(showroomObj)
  
      // if (this.effectFnc == "notEffect") {
      //   return
      // }
      // else {
      //   this.effectFnc.menuEffectFnc(this.menuText)
      //   this.effectFnc.innerEffectFnc(this.inner)
      // }
  
      // if (this.effectFnc.etcEffect == null) {
      //   return
      // } else {
      //   this.effectFnc.etcEffect()
      // }
    }
  
    mouseOutMenu(target) {
      const { parentElement } = target
      console.log('is-out!!!')
      parentElement.classList.toggle('is-sidebar')
    }
  
  }
  
  
  export { hamburger }
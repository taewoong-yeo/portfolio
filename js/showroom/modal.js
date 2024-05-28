
class Modal {
    constructor(el, effect) {
      this.modalWrap = el;
      this.modalType = el.getAttribute('data-modal-trigger');
  
      const basicEffect = {
        dimm: true,
        type: 'normal',
        delay: 0,
        forwardDuration: 0, // 모달, 딤 나타날 때 duration 
        backwardDuration: 0, // 모달, 딤 사라질 때 duration
        forwardEasing: '', // 모달, 딤 나타날 때 easing
        backwardEasing: '', // 모달, 딤 사라질 때 easing
        initXPercent: 0, // 초기 x (%)
        initYPercent: 0, // 초기 y (%)
        backwardXPercent: 0, // 모달 사라질 때 x (%)
        backwardYPercent: 0, // 모달 사라질 때 y (%)
        // forward, backward할 때 px 단위 (공통)
        // x, y를 0으로 초기화 시켜야 transform translate가 중복으로 안 들어감 (원인은 아직 발견 못함)
        x: 0,
        y: 0,
        initScale: 1,
        backwardScale: 1,
        initScaleX: 1,
        initScaleY: 1,
        initScaleZ: 1,
        rotateX: 0,
        rotateY: 0,
        backwardRotateX: 0,
        backwardRotateY: 0,
        transformPerspective: false,
        callback: {
          beforeOpen: () => { console.log('모달 열기 전 실행됨') },
          afterOpen: () => { console.log('모달 열고 나서 실행됨') },
          beforeClose: () => { console.log('모달 닫기 전 실행됨') },
          afterClose: () => { console.log('모달 닫은 후 실행됨') },
        },
      }
      this.effect = Object.assign(basicEffect, effect);
    }
  
    setSelecting() {
      this.dimm = this.modalWrap.querySelector('.dimmm');
      this.modal = this.modalWrap.querySelector('.modal');
      this.modalOpenBtn = document.querySelectorAll(`[data-modal-open="${this.modalType}"]`)
      this.modalCloseBtn = document.querySelectorAll(`[data-modal-close="${this.modalType}"]`)
    }
  
    init() {
      this.setSelecting();
      this.initialState();
      this.bindOpenEvent();
      this.bindCloseEvent();
    }
  
    initialState() { // gsap 초기화, 처음 init과 gsapBackward 후에 실행시켜줌
      gsap.set(this.modal, {
        alpha: 0,
        xPercent: this.effect.initXPercent,
        yPercent: this.effect.initYPercent,
        x: this.effect.x,
        y: this.effect.y,
        scale: this.effect.initScale,
        rotationX: this.effect.rotateX,
        rotationY: this.effect.rotateY,
        transformPerspective: this.effect.transformPerspective,
      })
    }
  
    gsapForward(target) {
      gsap.to(target, {
        onStart: () => { target === this.modal && this.effect.callback.beforeOpen(); },
        delay: this.effect.delay,
        duration: this.effect.forwardDuration,
        alpha: target === this.modal ? 1 : 0.6,
        ease: this.effect.forwardEasing,
        xPercent: 0,
        yPercent: 0,
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        rotationX: 0,
        rotationY: 0,
        transformPerspective: this.effect.transformPerspective,
        onComplete: () => { target === this.modal && this.effect.callback.afterOpen(); }
      },)
    }
  
    gsapForwardBounce() {
      const bounceTimeline = gsap.timeline({ repeat: 0 })
  
      bounceTimeline.to(this.modal, {
        onStart: () => { this.effect.callback.beforeOpen(); },
        delay: this.effect.delay,
        ease: this.effect.forwardEasing,
        duration: this.effect.forwardDuration,
        alpha: 1,
        scaleX: 0,
        scaleY: 0,
      })
        .to(this.modal, {
          duration: this.effect.forwardDuration,
          scaleX: 1.03,
          scaleY: 1.03,
        })
        .to(this.modal, {
          duration: this.effect.forwardDuration,
          scaleX: 1,
          scaleY: 1,
        })
        .to(this.modal, {
          duration: this.effect.forwardDuration,
          scaleX: 0.99,
          scaleY: 0.99,
        })
        .to(this.modal, {
          duration: this.effect.forwardDuration,
          scaleX: 1,
          scaleY: 1,
          onComplete: () => { this.effect.callback.afterOpen(); }
        })
    }
  
    gsapBackward(target) {
      gsap.to(target, {
        onStart: () => { target === this.modal && this.effect.callback.beforeClose(); },
        delay: this.effect.delay,
        duration: this.effect.backwardDuration,
        alpha: 0,
        ease: this.effect.backwardEasing,
        xPercent: target === this.modal ? this.effect.backwardXPercent : 0,
        yPercent: target === this.modal ? this.effect.backwardYPercent : 0,
        x: this.effect.x,
        y: this.effect.y,
        scale: target === this.modal ? this.effect.backwardScale : 1,
        rotationX: target === this.modal ? this.effect.backwardRotateX : 0,
        rotationY: target === this.modal ? this.effect.backwardRotateY : 0,
        transformPerspective: this.effect.transformPerspective,
        onComplete: () => {
          target.style.display = 'none';
          target === this.modal && this.effect.callback.afterClose();
          this.initialState();
        }
      })
    }
  
      play() {
      this.showModal();
      this.animateModal();
      this.handleDimmingEffect();
      }
  
    modalOpen() {
      this.preventBodyScroll();
      this.showModal();
  
      this.animateModal();
      this.handleDimmingEffect();
    }
  
    preventBodyScroll() {
      document.body.style.overflow = 'hidden';
    }
  
    showModal() {
      this.modal.style.display = 'flex';
    }
  
    animateModal() {
      const animationFunction = this.effect.name === 'bounce' ? this.gsapForwardBounce.bind(this) : this.gsapForward.bind(this);
      animationFunction(this.modal);
    }
  
    handleDimmingEffect() {
      if (!this.effect.dimm) return
      this.dimm.style.display = 'block';
      this.gsapForward(this.dimm);
    }
  
    bindOpenEvent() {
      this.modalOpenBtn.forEach(ele => ele.addEventListener('click', this.modalOpen.bind(this)))
    }
  
    modalClose() {
      this.gsapBackward(this.modal);
      this.effect.dimm && this.gsapBackward(this.dimm);
      document.body.style.overflow = 'auto';
    }
  
    bindCloseEvent() {
      this.modalCloseBtn.forEach(ele => ele.addEventListener('click', this.modalClose.bind(this)))
    }
  }
  
  export { Modal }
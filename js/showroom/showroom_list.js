import { InfiniteText } from './text_infinite.js'
import { hamburger } from './hamburger.js'
import { mixEffect, coverCenter, svgEffect01, svgEffect02, circle } from './hamburger_effectList.js'
import { TrackingSkew, TrackingMove, TrackingCircle } from './hover_mouse.js'
import { Modal } from './modal.js'
import { CardSlide } from './motion_card_slide.js'
// import { Paparazzi } from './hover_paparazzi.js'

import textObj from './constants/text_constant.js'
import gnbObj from './constants/gnb_constant.js'
import hoverObj from './constants/hover_constant.js'
import modalObj from './constants/modal_constant.js'
import slideObj from './constants/slide_constant.js'
import motionObj from './constants/motion_constant.js'
import { MotionParticle } from './motion_particle.js'
// import hamburObj from './constants/hamburger_constant.js'

const initializedTargets = new Map();

export const handleMouseOver = (e) => {
	// e.stopPropagation();
  const { target } = e;
  if (target.className !== 'active-zone' || initializedTargets.has(target)) return;

  // infinite text
  const infiniteTextInstance = initTextModule(target);
  if (infiniteTextInstance) {
    initializedTargets.set(target, infiniteTextInstance);
  }

  textEffect(target, 'mouseover')
	gnbEffect(target, 'mouseover')
	slideEffect(target, 'mouseover')
  hamburgerEffect(target, 'mouseover')
  motionEffect(target, 'mouseover')
}

export const handleMouseOut = (e) => {
  const { target } = e;
  if (target.className !== 'active-zone' || initializedTargets.has(target)) return;

  const infiniteTextInstance = initializedTargets.get(target);
  if (infiniteTextInstance) {
    infiniteTextInstance.terminate();
    initializedTargets.delete(target);
  }
  textEffect(target, 'mouseout')
	gnbEffect(target, 'mouseout') 
	slideEffect(target, 'mouseout')
  hamburgerEffect(target, 'mouseout')
	motionEffect(target, 'mouseout')
}

const initTextModule = (target) => {
	if (target.id === 'textInfinite') {

		const forwardEle = document.querySelector('.forward');
		const reverseEle = document.querySelector('.reverse');
		
		const infiniteTextForward = new InfiniteText(forwardEle, {direction: -1});
		infiniteTextForward.init();

		const infiniteTextReverse = new InfiniteText(reverseEle, {direction: 1});
		infiniteTextReverse.init();

	}

}

// Text
export const textEffect = (target, eventType) => {
  // 상태 저장으로 관리?
  // admin에서 수정하면 바로 반영될 수 있게?
	
	textObj.forEach(effect => { 
		if (target.id === effect.id) { 
			const targetId = target.id.toLowerCase(); 
			const el = target.querySelector(effect.selector); 
			const activeEle = target.querySelectorAll(effect.activeEle); 
			if (effect.effectClass) { 
				if(window[targetId] === undefined){ 
					window[targetId] = new effect.effectClass(el, effect.option); 
					window[targetId].inits()
				} 
				activeEle.forEach(active => { 
					if (eventType === 'mouseover') { 
						active.classList.add(effect.class); 
					} else if (eventType === 'mouseout') { 
						active.classList.remove(effect.class); 
					} 
					window[targetId].play(active);
				})

			} else if ((eventType === 'mouseover' && effect.activate) || (eventType === 'mouseout' && effect.deactivate)) { 
				eventType === 'mouseover' ? effect.activate(target) : effect.deactivate(target)	 
			} 
		} 
	}); 
}

// Gnb
export const gnbEffect = (target, eventType) => {

  gnbObj.forEach(effect => {
    if (target.id === effect.id) {
      const el = target;
			const targetId = target.id.toLowerCase();
			if (effect.effectClass) { // effectClass가 있을 땐 moudle 사용 아니면 active 클래스로 제어
				window[targetId] = new effect.effectClass(el, effect.option, eventType);
				// 1. 각각 moudle 파일에 play(), stop() 메소드를 추가로 만들어 쇼룸에서 공통으로 쓸 수 있게 함
				// 2. module 파일에는 mouseEnter(), mouseLeave() 메소드가 있는데 공통으로 쓰기에 부적합하면 쓰지 않고 괜찮으면 씀
				// 3. gnb moudle파일에 splitText() 라는 메소드가 있는데 각각 파일에서 내용이 비슷해서 공통으로 쓸 수 있을거 같음...?
				
				// 원래 gnb 모듈 파일은 각각 nav>ul>li에 hover했을 때 효과가 발생하지만 
				// 쇼룸에서는 div에 mouseover했을 때 첫 번째 li만 효과가 발생해야 함으로
				// 각각 파일에 새로운 변수를 만들어서 그 요소만 실행시킴
				if ((eventType === 'mouseover') || (eventType === 'mouseout')) {
					eventType === 'mouseover' ? window[targetId].play() : window[targetId].stop()
				}
			// 'active' class가 붙을 때 효과 발생
			} else if ((eventType === 'mouseover' && effect.activate) || (eventType === 'mouseout' && effect.deactivate)) {
				eventType === 'mouseover' ? effect.activate(el) : effect.deactivate(el)	
			}
    }
  });
}

// Hover
export const hoverEffect = (e) => {
	// hover는 전반적으로 css로 제어
	// 모듈 중 TrackingCircle을 제외하고는 전부 play, stop 메소드로 제어
	const eventType = e.type;
	hoverObj.forEach(effect => {
    if (e.target.id === effect.id) {
      const el = e.target.querySelector(effect.constructor);
			const instance = new effect.effectClass(el, effect.option)
		
			if (eventType === 'mouseenter' && effect.effectClass !== TrackingCircle) {
				instance.play(e)
			} else if (eventType === 'mouseleave' && effect.effectClass !== TrackingCircle) {
				instance.stop(e)
			}else if (effect.effectClass === TrackingCircle) {
				instance.showroomPlay(e)
			}
    }
  });
}

export const hamburgerEffect = (target, eventType) => {
const effects = [
  {
    id: 'hamburgerPullLeft',
    constructor: '.sidebar-pull',
    animation: null
  },
  {
    id: 'hamburgerCoverTop',
    constructor: '.sidebar-coverTop',
    animation: null
  },
  {
    id: 'hamburgerCoverTopBounce',
    constructor: '.sidebar-topBounce',
    animation: mixEffect("02", "00")
  },
  {
    id: 'hamburgerCoverTopParticle',
    constructor: '.sidebar-coverTopParticle',
    animation: null
  },
  {
    id: 'hamburgerCoverRight',
    constructor: '.sidebar-coverRight',
    animation: mixEffect("03", "01")
  },
  {
    id: 'hamburgerCoverSide',
    constructor: '.sidebar-coverSide',
    animation: null
  },
  {
    id: 'hamburgerCoverFade',
    constructor: '.sidebar-coverFade',
    animation: mixEffect("01", "01")
  },
  {
    id: 'hamburgerCoverCenter',
    constructor: '.sidebar-coverCenter',
    animation: coverCenter()
  },
  {
    id: 'hamburgerCoverSvg01',
    constructor: '.sidebar-coverSvg',
    animation: svgEffect01()
  },
  {
    id: 'hamburgerCoverSvg02',
    constructor: '.sidebar-coverSvg',
    animation: svgEffect02()
  },
  {
    id: 'hamburgerTransition',
    constructor: '.sidebar-transition',
    animation: {
      innerEffectFnc: function (target) {
          if (document.querySelector('body').classList.contains('is-sidebar')) {
              gsap.to(target, {
                  delay: 0.4,
                  alpha: 1,
                  overwrite: true,
              })
          } else {
              gsap.set(target, {
                  alpha: 0,
                  overwrite: true,
              })
          }
      }
    }
  },
  {
    id: 'hamburgerCircle',
    constructor: '.sidebar-circle',
    animation: mixEffect("01", "01")
  },
  {
    id: 'hamburgerCircleGradient',
    constructor: '.sidebar-circleGradient',
    animation: circle({ circle: "#ff5555" })
  },
]

effects.forEach(effect => {
  if (target.id === effect.id) {    
    const animation = { effect }
    const el = target.querySelector(effect.constructor)
    const instance = new hamburger(el, animation)

    // 현재 body에 classList가 전체적으로 이닛중
    // 1. 타겟과 effect의 id value값이 매칭될 때만 클래스를 걸어주면?
    // 2. mouseout 시 분기 처리(현재는 mouseOverMenu 함수에서 전체 실행 중)
    // 3. 타겟 이팩트가 어떤 요소에서 실행 되는지 파악 필요
    eventType === 'mouseover' ? instance.mouseOverMenu(el) : instance.mouseOutMenu(el)
  } else {
  }
});
}

// Slide
export const slideEffect = (target, eventType) => {

	slideObj.forEach(effect => {
		const el = document.querySelector(effect.constructor)
    if(eventType === 'DOMContentLoaded') {
			effect.option.autoplay = false
      window[effect.id] = new Swiper(el, effect.option);
    }
		
    if(target !== null) {
			effect.option.autoplay = {delay: 800}
      const targetId = target.id.toLowerCase();
		
      if (target && target.id === effect.id) {
        if (window[targetId] === undefined) {
          window[targetId] = new Swiper(el, effect.option);
        }
        const { autoplay } = window[targetId]
        
        eventType === 'mouseover' ? isPlay() : isStop()
  
				function isStop() {
					autoplay.stop();
					
					const slideToIndex = (targetId === 'slidecommon02' || targetId === 'slideeffectcube') ? 1 : 0;
					window[targetId].slideTo(slideToIndex, slideToIndex);
				}

        function isPlay() {
          autoplay.start()
        }
      }
    }
	})
}

// Modal 
export const modalEffect = (e) => {
	const { target } = e
	
	modalObj.forEach(effect => {
    if (target.id === effect.id) {
			const el = target.querySelector(effect.constructor)
			const instance = new Modal(el, effect.option)
			instance.init()
			e.type === 'mouseenter' ? instance.play() : instance.modalClose()
    }
  });
}

// Motion
export const motionEffect = (e) => {
	if (e === null) {
		const card = document.querySelector('.card-slide-container')
		const cardSlide = new CardSlide(card)
		cardSlide.setLayout()
		
		return
	}

	if(e !== null) {
		const { target } = e
		motionObj.forEach(effect => {
			if (target.id === effect.id) {
				const el = target.querySelector(effect.selector)
				const instance = new effect.effectClass(el, effect.option, e.type);
				if (target.id !== 'objectMotion02') {
					instance.init()
				} else {
					instance.autoPlay(e.type)
				}
				
			}
		});
	}
}
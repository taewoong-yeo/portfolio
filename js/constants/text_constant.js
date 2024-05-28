// import { InfiniteText } from './text_infinite.js'
import { TextFlip } from '../text_flip.js'
import { TextVideo } from '../text_gradient.js'
import { TextKerning } from '../text_kerning.js'
import { RandomShow } from '../text_random.js'
import { TextScale } from '../text_scale.js'
import { TextShow } from '../text_show.js'
import { TypingText } from '../text_typing.js'

const textObj = [
	{
		id: 'textBlur',
		selector: '.text-blur-wrap',
		activate: (el) => {
			const items = el.querySelectorAll('.text-blur');
			items.forEach((item) => {
				item.classList.add('active');
			})
		},
		deactivate: (el) => {
			const items = el.querySelectorAll('.text-blur');
			items.forEach((item) => {
				item.classList.remove('active');
			})
		}
	},
	{
		id: 'textFlip01',
		selector: '.text-flip-wrap-v',
		activeEle: '.ux-text-el',
		class: 'active',
		effectClass: TextFlip,
		option: {
			direction: "vertical",
			angle: -90,
			duration: 0.3,
			stagger: 0.03,
			delay: 0,
			easing: "linear",
			unit: "letter"
		}
	},
	{
		id: 'textFlip02',
		selector: '.text-flip-wrap-h',
		activeEle: '.ux-text-el',
		class: 'active',
		effectClass: TextFlip,
		option: {
			direction: "horizontal",
			angle: -90,
			duration: 0.3,
			stagger: 0.03,
			delay: 0,
			easing: "linear",
			unit: "letter"
		}
	},
	{
		id: 'textGradient01',
		selector: '.text-gradient-wrap',
		activate: (el) => {
			const item = el.querySelector('.text-gradient-el');
			item.classList.add('active');
		},
		deactivate: (el) => {
			const item = el.querySelector('.text-gradient-el');
			item.classList.remove('active');
		}
	},
	{
		id: 'textGradient02',
		selector: '.vgroup',
		effectClass: TextVideo,
		activate: (el) => {
			const item = el.querySelector('.background-video');
			item.classList.add('active');
		},
		deactivate: (el) => {
			const item = el.querySelector('.background-video');
			item.classList.remove('active');
		}
	},
	{
		id: 'textKerning01',
		selector: '.text-kerning-box',
		activeEle: '.ux-text-el',
		class: 'active',
		effectClass: TextKerning,
		option: {
			direction: 'expandSmall',
			size: 50,
			duration: 1,
			easing: 'power4.out'
		}
	},
	{
		id: 'textKerning02',
		selector: '.text-kerning-box',
		activeEle: '.ux-text-el',
		class: 'active',
		effectClass: TextKerning,
		option: {
			direction: 'reduceSmall',
			size: 100,
			duration: 1,
			easing: 'power4.out'
		}
	},
	{
		id: 'textMaskLine01',
		selector: '.text-maskline-list',
		activate: (el) => {
			const items = el.querySelectorAll('span');
			items.forEach(item => item.classList.add('active'));
		},
		deactivate: (el) => {
			const items = el.querySelectorAll('span');
			items.forEach(item => {
				item.classList.remove('active')
			});
		}
	},
	{
		id: 'textMaskLine02',
		selector: '.text-maskline-list',
		activate: (el) => {
			const items = el.querySelectorAll('span');
			items.forEach(item => item.classList.add('active'));
		},
		deactivate: (el) => {
			const items = el.querySelectorAll('span');
			items.forEach(item => {
				item.classList.remove('active')
			});
		}
	},
	{
		id: 'textMaskLine03',
		selector: '.text-maskline-list',
		activate: (el) => {
			const items = el.querySelectorAll('span');
			items.forEach(item => item.classList.add('active'));
		},
		deactivate: (el) => {
			const items = el.querySelectorAll('span');
			items.forEach(item => {
				item.classList.remove('active')
			});
		}
	},
	{
		id: 'textMaskLine04',
		selector: '.text-maskline-list',
		activate: (el) => {
			const items = el.querySelectorAll('span');
			items.forEach(item => item.classList.add('active'));
		},
		deactivate: (el) => {
			const items = el.querySelectorAll('span');
			items.forEach(item => {
				item.classList.remove('active')
			});
		}
	},
	{
		id: 'textRandom01',
		selector: '.text-random-box',
		class: 'active',
		activeEle: '.ux-text-el',
		effectClass: RandomShow,
		option: {
			unit: "word",
			duration: 1.2,
			stagger: 0.1,
			easing: 'linear'
		}
	},
	{
		id: 'textRandom02',
		selector: '.text-random-box',
		class: 'active',
		activeEle: '.ux-text-el',
		effectClass: RandomShow,
		option: {
			unit: "letter",
			duration: 1.2,
			stagger: 0.02,
			easing: 'linear'
		}
	},
	{
		id: 'textReveal01',
		selector: '.text-reveal-wrap',
		activate: (el) => {
			const items = el.querySelectorAll('p');
			items.forEach(item => item.classList.add('active'));
		},
		deactivate: (el) => {
			const items = el.querySelectorAll('p');
			items.forEach(item => item.classList.remove('active'));
		}
	},
	{
		id: 'textReveal02',
		selector: '.text-reveal-wrap',
		activate: (el) => {
			const items = el.querySelectorAll('p');
			items.forEach(item => item.classList.add('active'));
		},
		deactivate: (el) => {
			const items = el.querySelectorAll('p');
			items.forEach(item => item.classList.remove('active'));
		}
	},
	{
		id: 'textScale01',
		selector: '.text-scale-box',
		class: 'active',
		activeEle: '.ux-text-el',
		effectClass: TextScale,
		option: {
			position: "center",
			duration: 0.7,
			stagger: 0.02,
			easing: "power4.out",
		}
	},
	{
		id: 'textScale02',
		selector: '.text-scale-box',
		class: 'active',
		activeEle: '.ux-text-el',
		effectClass: TextScale,
		option: {
			position: "bottom",
			duration: 0.7,
			stagger: 0.02,
			easing: "power4.out",
		}
	},
	{
		id: 'textShow01',
		selector: '.text-show-box',
		activeEle: '.ux-text-el',
		class: 'active',
		effectClass: TextShow,
		option: {
			unit: "sentence",
			direction: "to-top",
			duration: 1.1,
			stagger: 0.1,
			easing: "power4.out",
		}
	},
	{
		id: 'textShow02',
		selector: '.text-show-box',
		activeEle: '.ux-text-el',
		class: 'active',
		effectClass: TextShow,
		option: {
			unit: "word",
			direction: "to-top",
			duration: 1,
			stagger: 0.05,
			easing: "power4.out",
		}
	},
	{
		id: 'textShow03',
		selector: '.text-show-box',
		activeEle: '.ux-text-el',
		class: 'active',
		effectClass: TextShow,
		option: {
			unit: "word",
			direction: "to-left",
			duration: 0.5,
			stagger: 0.05,
			easing: "power4.out",
		}
	},
	{
		id: 'textShow04',
		selector: '.text-show-box',
		activeEle: '.ux-text-el',
		class: 'active',
		effectClass: TextShow,
		option: {
			unit: "letter",
			direction: "normal",
			duration: 1,
			stagger: 0.02,
			easing: "linear",
		}
	},
	{
		id: 'textShow05',
		selector: '.text-show-box',
		activeEle: '.ux-text-el',
		class: 'active',
		effectClass: TextShow,
		option: {
			unit: "letter",
			direction: "to-top",
			duration: 0.8,
			stagger: 0.02,
			easing: "power4.inOut",
		}
	},
	{
		id: 'textShow06',
		selector: '.text-show-box',
		activeEle: '.ux-text-el',
		class: 'active',
		effectClass: TextShow,
		option: {
			unit: "letter",
			direction: "to-top-ro",
			duration: 0.8,
			stagger: 0.02,
			easing: "power4.inOut",
		}
	},
	{
		id: 'textShow07',
		selector: '.text-show-box',
		activeEle: '.ux-text-el',
		class: 'active',
		effectClass: TextShow,
		option: {
			unit: "letter",
			direction: "to-left",
			duration: 0.8,
			stagger: 0.02,
			easing: "power4.inOut",
		}
	},
	// {
	// 	id: 'textTyping',
	// 	selector: '.text-typing-wrap',
	// 	activeEle: '.ux-text-el',
	// 	class: 'active',
	// 	effectClass: TypingText,
	// 	option: {
	// 		duration: 80,
	// 		easing: 'linear',
	// 		stagger: 0,
	// 	}
	// },
];

export default textObj;
import { GnbFlip, GnbFlipRandom  } from '../gnb_flip.js'
import { GnbRandomText } from '../gnb_randomText.js'
import { GnbRollingText } from '../gnb_rolling.js'
import { TrackMenu } from '../gnb_line.js'
import { GnbLineSpreadWordUp } from '../gnb-line-spread-word-up.js'

const gnbObj = [
	{
		id: 'gnbTransform01',
		selector: '.gnb-skew-wrap',
		activate: (el) => {
			const item = el.querySelector('li')
			item.classList.add('active')
		},
		deactivate: (el) => {
			const item = el.querySelector('li')
			item.classList.remove('active')
		}
	},
	{
		id: 'gnbTransform02',
		selector: '.gnb-spacing',
		activate: (el) => {
			const item = el.querySelector('li')
			item.classList.add('active')
		},
		deactivate: (el) => {
			const item = el.querySelector('li')
			item.classList.remove('active')
		}
	},
	{
		id: 'gnbTransform03',
		selector: '.gnb-flip-wrap',
		effectClass: GnbFlip,
	},
	{
		id: 'gnbTransform04',
		selector: '.gnb-flip-random-wrap',
		effectClass: GnbFlipRandom,
	},
	{
		id: 'gnbTransform05',
		selector: '.gnb-text-change-wrap',
		activate: (el) => {
			const items = el.querySelectorAll('span')
			items.forEach(item => {
				item.classList.add('active')
			})
		},
		deactivate: (el) => {
			const items = el.querySelectorAll('span')
			items.forEach(item => {
				item.classList.remove('active')
			})
		}
	},
	{	
		id: 'gnbTransform06',
		selector: '.gnb-random-text-change-wrap',
		effectClass: GnbRandomText,
		option: {
			index: 0,
		}
	},

	// Gnb Rolling
	{
		id: 'gnbRolling01',
		selector: '.gnb-rolling-wrap',
		activate: (el) => {
			const item = el.querySelector('span')
			item.classList.add('active')
		},
		deactivate: (el) => {
			const item = el.querySelector('span')
			item.classList.remove('active')
		}
	},
	{
		id: 'gnbRolling02',
		selector: '.gnb-rolling-wrap02',
		effectClass: GnbRollingText,
	},
	{
		id: 'gnbRolling03',
		selector: '.gnb-rolling-wrap03',
		activate: (el) => {
			const item = el.querySelector('span')
			item.classList.add('active')
		},
		deactivate: (el) => {
			const item = el.querySelector('span')
			item.classList.remove('active')
		}
	},

	// Gnb Fill
	{
		id: 'gnbFill01',
		selector: '.gnb-fill-wrap',
		activate: (el) => {
			const item = el.querySelector('.menu-m')
			item.classList.add('active')
		},
		deactivate: (el) => {
			const item = el.querySelector('.menu-m')
			item.classList.remove('active')
		}
	},
	{
		id: 'gnbFill02',
		selector: '.gnb-fill-wrap02',
		activate: (el) => {
			const item = el.querySelector('.menu-m')
			item.classList.add('active')
		},
		deactivate: (el) => {
			const item = el.querySelector('.menu-m')
			item.classList.remove('active')
		}
	},
	// Gnb Line
	// gnb line01
	{
		id: 'gnbLine01',
		selector: '.gnb-line-wrap',
		activate: (el) => {
			const item = el.querySelector('span')
			item.classList.add('active')
		},
		deactivate: (el) => {
			const item = el.querySelector('span')
			item.classList.remove('active')
		}
	},
	// gnb line02
	{
		id: 'gnbLine02',
		selector: '.gnb-line-wrap02',
		activate: (el) => {
			const item = el.querySelector('span')
			item.classList.add('active')
		},
		deactivate: (el) => {
			const item = el.querySelector('span')
			item.classList.remove('active')
		}
	},
	// gnb line03
	{
		id: 'gnbLine03',
		selector: '.gnb-line-wrap03',
		activate: (el) => {
			const item = el.querySelector('span')
			item.classList.add('active')
		},
		deactivate: (el) => {
			const item = el.querySelector('span')
			item.classList.remove('active')
		}
	},
	// gnb line04
	{
		id: 'gnbLine04',
		selector: '.gnb-line-wrap04',
		activate: (el) => {
			const item = el.querySelector('span')
			item.classList.add('active')
		},
		deactivate: (el) => {
			const item = el.querySelector('span')
			item.classList.remove('active')
		}
	},
	// gnb line05
	{
		id: 'gnbLine05',
		selector: '.gnb-line-wrap05',
		activate: (el) => {
			const item = el.querySelector('span')
			item.classList.add('active')
		},
		deactivate: (el) => {
			const item = el.querySelector('span')
			item.classList.remove('active')
		}
	},
	//gnb line spread
	{
		id: 'gnbLine06',
		selector: '.gnb-line-spread-wrap',
		activate: (el) => {
			const item = el.querySelector('span')
			item.classList.add('active')
		},
		deactivate: (el) => {
			const item = el.querySelector('span')
			item.classList.remove('active')
		}
	},
	// gnb line tacking
	{
		id: 'gnbLine07',
		selector: '.gnb-line-tracking',
		effectClass: TrackMenu,
		option: '#E74887',
		// activate: (el) => {
		// 	const item = el.querySelector('span')
		// 	item.classList.add('active')
		// },
		// deactivate: (el) => {
		// 	const item = el.querySelector('span')
		// 	item.classList.remove('active')
		// }
	},
	// gnb line double
	{
		id: 'gnbLine08',
		selector: '.gnb-line-double-wrap',
		activate: (el) => {
			const item = el.querySelector('span')
			item.classList.add('active')
		},
		deactivate: (el) => {
			const item = el.querySelector('span')
			item.classList.remove('active')
		}
	},
	// gnb block pull
	{
		id: 'gnbLine09',
		selector: '.gnb-line-block-pull-wrap',
		activate: (el) => {
			const item = el.querySelector('span')
			item.classList.add('active')
		},
		deactivate: (el) => {
			const item = el.querySelector('span')
			item.classList.remove('active')
		}
	},
	// gnb block passing
	{
		id: 'gnbLine10',
		selector: '.gnb-line-block-passing-wrap',
		activate: (el) => {
			const item = el.querySelector('span')
			item.classList.add('active')
		},
		deactivate: (el) => {
			const item = el.querySelector('span')
			item.classList.remove('active')
		}
	},
	// gnb line up
	{
		id: 'gnbLine11',
		selector: '.gnb-line-pull-up',
		activate: (el) => {
			const item = el.querySelector('span')
			item.classList.add('active')
		},
		deactivate: (el) => {
			const item = el.querySelector('span')
			item.classList.remove('active')
		}
	},
	// gnb line 12
	{
		id: 'gnbLine12',
		selector: '.gnb-line-pass-up',
		activate: (el) => {
			const item = el.querySelector('span')
			item.classList.add('active')
		},
		deactivate: (el) => {
			const item = el.querySelector('span')
			item.classList.remove('active')
		}
	},
	// gnb line spread text up
	{
		id: 'gnbLine13',
		selector: '.line-spread-text-wrap',
		activate: (el) => {
			const box = el.querySelector('.gnb-line-spread-text-up-wrap')
			const item = el.querySelector('.menu-m')
			box.classList.add('active')
			item.classList.add('active')
		},
		deactivate: (el) => {
			const box = el.querySelector('.gnb-line-spread-text-up-wrap')
			const item = el.querySelector('.menu-m')
			box.classList.remove('active')
			item.classList.remove('active')
		}
	},
	// gnb line spread word up
	{
		id: 'gnbLine14',
		selector: '.gnb-line-spread-word-up-wrap',
		activate: (el) => {
			const item = el.querySelector('.ux-menu-m')
			item.classList.add('active')
		},
		deactivate: (el) => {
			const item = el.querySelector('.ux-menu-m')
			item.classList.remove('active')
		}
	},
];

export default gnbObj
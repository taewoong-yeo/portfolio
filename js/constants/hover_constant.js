import { videoHover } from '../hover_play_video.js'
import { TrackingSkew, TrackingMove, TrackingCircle } from '../hover_mouse.js'
import { Paparazzi } from '../hover_paparazzi.js'

const hoverObj = [
	{
		id: 'video01',
		constructor: '.play01',
		effectClass: videoHover
	},
	{
		id: 'video02',
		constructor: '.play02',
		effectClass: videoHover
	},
	{
		id: 'trackSkew01',
		constructor: '.track-skew01',
		effectClass: TrackingSkew
	},
	{
		id: 'trackSkew02',
		constructor: '.track-skew02',
		effectClass: TrackingSkew,
		option: {
			type: 'large'
		}
	},
	{
		id: 'trackSkew03',
		constructor: '.track-skew03',
		effectClass: TrackingSkew,
		option: {
			img: true,
			text: true,
			textEl: '.skew-text'
		}
	},
	{
		id: 'trackingMove01',
		constructor: '.track-move',
		effectClass: TrackingMove,
	},
	{
		id: 'trackingCircle01',
		constructor: '.track-circle01',
		effectClass: TrackingCircle,
	},
	{
		id: 'trackingCircle02',
		constructor: '.track-circle02',
		effectClass: TrackingCircle,
	},
	{
		id:'hoverPaparazzi',
		constructor:'.paparazzi',
		effectClass: Paparazzi,
	}
]

export default hoverObj
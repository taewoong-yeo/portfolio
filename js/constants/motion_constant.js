import { MotionParticle } from '../motion_particle.js'
import { CardSlide } from '../motion_card_slide.js';
import { MotionFloating } from '../motion_floating.js';

const motionObj = [
	{
		id: 'motionParticle01',
		selector: '.particle-wrap',
		effectClass: MotionParticle,
		option : {
			stopOverlap : true, // particle 겹치지 않게 설정
			count : { min: 20, max: 30 }, // particle 개수
			size : { min: 20, max: 50 }, // particle 사이즈
			duration : 1,
			rotate: 900,
		}
	},
	{
		id: 'objectMotion01',
		selector: '.floating-box',
		effectClass: MotionFloating,
	},
	{
		id: 'objectMotion02',
		selector: '.card-slide-container',
		effectClass: CardSlide,
	}
];

export default motionObj
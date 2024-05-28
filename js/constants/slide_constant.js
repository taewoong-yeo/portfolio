const DELAY = 800
const ELEMENT_NAME = '.swiper-pagination'

const slideObj = [
	{
		id: 'slideCommon01',
		rewind: false,
		constructor: '.slide_common',
		option: {
			spaceBetween: 30,
			pagination: {
					el: ELEMENT_NAME,
					clickable: true,
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			autoplay : {
				delay : DELAY,
			},
			loop: false,
		}
	},
	{
		id: 'slideCommon02',
		constructor: '.slide-infinite-loop',
		option: {
			spaceBetween:30,
			loop: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			autoplay : {
				delay : DELAY
			}
		}
	},
	{
		id: 'slideCommon03',
		constructor: '.slide-infinite-loop-rewind',
		option: {
			spaceBetween: 30,
			rewind: true,
			pagination: {
					el: ".swiper-pagination",
					clickable: true,
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			autoplay : {
				delay : DELAY
			}
		}
	},
	{
		id: 'slideOpacity01',
		constructor: '.slide_opacity01',
		option: {
			slidesPerView: 3,
			spaceBetween: 30,
			centeredSlides: true,
			pagination: {
					el: ".swiper-pagination",
					clickable: true,
			},
			autoplay : {
				delay : DELAY
			}
		}
	},
	{
		id: 'slideOpacity02',
		constructor: '.slide_opacity02',
		option: {
      // slidesPerView: 1,
			spaceBetween: 30,
			crossFade: true,
        effect: "fade",
        crossFade: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
				autoplay : {
				delay : DELAY
			}
		}
	},
	{
		id: 'slidePagination01',
		constructor: '.slide-pagination01',
		option: {
			slidesPerView: 3,
			spaceBetween: 30,
			pagination: {
				el: ".swiper-pagination",
				dynamicBullets: true,
			},
			autoplay : {
				delay : DELAY
			}
		}
	},
	{
		id: 'slidePagination02',
		constructor: '.slide-pagination02',
		option: {
			spaceBetween: 30,
			pagination: {
				el: ".swiper-pagination",
				type: "progressbar",
			},
			autoplay : {
				delay : DELAY
			}
		}
	},
	{
		id: 'slidePagination03',
		constructor: '.slide-pagination03',
		option: {
			spaceBetween: 30,
			spaceBetween: 30,
			pagination: {
				el: ".swiper-pagination",
				type: "fraction",
			},
			autoplay : {
				delay : DELAY
			}
		}
	},
	{
		id: 'slidePagination04',
		constructor: '.slide-pagination04',
		option: {
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
				dynamicBullets: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			autoplay : {
				delay : DELAY
			}
		}
	},
	{
		id: 'slideDynamic',
		constructor: '.slide-dynamic01',
		option: {
			effect: "creative",
			creativeEffect: {
				prev: {
					shadow: true,
					translate: ["-20%", 0, -1],
				},
				next: {
					translate: ["100%", 0, 0],
				},
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			autoplay : {
				delay : DELAY
			}
		}
	},
	{
		id: 'slideParallax01',
		constructor: '.slide-parallax01',
		option: {
			speed: 600,
			parallax: true,
			allowTouchMove: false,
			pagination: {
				el: ".swiper-pagination",
				dynamicBullets: true,
				clickable: true,
			},
			autoplay : {
				delay : DELAY
			}
		}
	},
	{
		id: 'slideParallax02',
		constructor: '.slide-parallax02',
		option: {
			loop: true,
			speed: 1000,
			watchSlidesProgress: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true
			},
			on: {
				progress: function () {
					const slideElements = document.querySelectorAll('.slide-parallax02 .swiper-slide');
					slideElements.forEach(slide => {
						let slideProgress = slide.progress;
						let innerOffset = this.width * 0.5;
						let innerTranslate = slideProgress * innerOffset;
						slide.querySelector('.swiper-item').style.transform = 'translateX(' + innerTranslate + "px)";
					});
				},
				setTransition: function (swiper, speed) {
					const slideElements = swiper.slides
					slideElements.forEach(slide => {
					slide.style.transition = speed + 'ms';
					slide.querySelector('.swiper-item').style.transition = speed + 'ms';
					slide.querySelector(".swiper-item").style.transitionTimingFunction = "ease";
					});
				},
			}
		}
	},
	{
		id: 'slideParallax03',
		constructor: '.slide-parallax03',
		option: {
      slidesPerView: 1,
			speed: 800,
			initialSlide: 2,
			watchSlidesProgress: true,
			pagination: {
          el: ".swiper-pagination",
          clickable: true
			},
			transition: {
			timingFunction: 'ease-in-out', // 원하는 타이밍 함수
			},
			on: {
				progress: function(swiper) {
					const slideElements = swiper.slides;
					slideElements.forEach(slide => {
						let slideProgress = slide.progress;
						slide.querySelector('.swiper-mask').style.transform = 'translateX(' + slideProgress * 300 +'px)';
					})
				},
				setTransition: function (swiper, speed) {
					// 여기서 speed는 전환 속도이다.
					const slideElements = swiper.slides
					slideElements.forEach(slide => {
						slide.querySelector('.swiper-mask').style.transition = speed + 'ms';
						slide.style.transition = speed + 'ms';
						slide.querySelector(".swiper-mask").style.transitionTimingFunction = "ease-in-out";
					});
				},
			}
		}
	},
	{
		id: 'slideParallax04',
		constructor: '.slide-parallax04',
		option: {
      slidesPerView: 1,
			speed: 800,
			initialSlide: 2,
			watchSlidesProgress: true,
			pagination: {
          el: ".swiper-pagination",
          clickable: true
			},
			on: {
				slideChange: function (swiper) {
					const slideElements = swiper.slides;
					const activeSlide = swiper.slides[this.activeIndex]
					slideElements.forEach(slide => {
						slide.querySelector('.swiper-mask').style.transform = 'scale(1.2)'
					})
					activeSlide.querySelector('.swiper-mask').style.transform = 'scale(1)';
				},
				setTransition: function (swiper, speed) {
					const slideElements = swiper.slides
					slideElements.forEach(slide => {
						slide.querySelector('.swiper-mask').style.transition = speed + 'ms';
						slide.style.transition = speed + 'ms';
						slide.querySelector(".swiper-mask").style.transitionTimingFunction = "ease-in-out";
					});
				},
			}
		}
	},
	{
		id: 'slideEffectCube',
		constructor: '.slide-effect01',
		option: {
			effect: "cube",
			grabCursor: true,
			loop: true,
			cubeEffect: {
				shadow: true, // 슬라이더 밑의 그림자 표시 여부
				slideShadows: true, // 슬라이더를 돌릴때 흐릿해 지는 그림자 표시 여부
				shadowOffeset: 5, // 그림자 위치, 수치가 클수록 아래로 내려감
				shadowScale: 0.94, // 그림자 크기, 수치가 클수록 그림자 커짐
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			autoplay : {
				delay : DELAY,
				disableOnInteraction: false,
			}
		}
	},
	{
		id: 'slideEffectOverflow',
		constructor: '.slide-effect02',
		option: {
			allowTouchMove: false,
			effect: "coverflow",
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: "auto",
			coverflowEffect: {
				rotate: 50,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows: true,
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			autoplay : {
				delay : DELAY
			}
		}
	},
	{
		id: 'slideEffectFlip',
		constructor: '.slide-effect03',
		option: {
			effect: "flip",
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: "auto",
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			autoplay : {
				delay : DELAY
			}
		}
	},
	{
		id: 'slideEffectCards',
		constructor: '.slide-effect04',
		option: {
			effect: "cards",
			grabCursor: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			autoplay : {
				delay : DELAY
			}
		}
	},
	{
		id: 'slideCreativeZoomOut',
		constructor: '.slide-creative01',
		option: {
			grabCursor: true,
			effect: "creative",
			creativeEffect: {
				prev: {
					shadow: true,
					translate: [0, 0, -400],
				},
				next: {
					translate: ["100%", 0, 0],
				},
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			autoplay : {
				delay : DELAY
			}
		}
	},
	{
		id: 'slideCreativeZoomInOut',
		constructor: '.slide-creative02',
		option: {
			grabCursor: true,
			effect: "creative",
			creativeEffect: {
				prev: {
					shadow: true,
					translate: ["-120%", 0, -500],
				},
				next: {
					shadow: true,
					translate: ["120%", 0, -500],
				},
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			autoplay : {
				delay : DELAY
			}
		}
	},
	{
		id: 'slideCreative2dRotate',
		constructor: '.slide-creative03',
		option: {
			grabCursor: true,
			effect: "creative",
			creativeEffect: {
				prev: {
					shadow: true,
					translate: ["-125%", 0, -800],
					rotate: [0, 0, -90],
				},
				next: {
					shadow: true,
					translate: ["125%", 0, -800],
					rotate: [0, 0, 90],
				},
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			autoplay : {
				delay : DELAY
			}
		}
	},
	{
		id: 'slideCreative3d',
		constructor: '.slide-creative04',
		option: {
			grabCursor: true,
			effect: "creative",
			creativeEffect: {
				prev: {
					shadow: true,
					origin: "left center",
					translate: ["-5%", 0, -200],
					rotate: [0, 100, 0],
				},
				next: {
					origin: "right center",
					translate: ["5%", 0, -200],
					rotate: [0, -100, 0],
				},
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			autoplay : {
				delay : DELAY
			}
		}
	},
	{
		id: 'slideCreative3dFlipH',
		constructor: '.slide-creative05',
		option: {
			grabCursor: true,
			effect: "creative",
			creativeEffect: {
				prev: {
					shadow: true,
					translate: [0, 0, -800],
					rotate: [0, -180, 0],
				},
				next: {
					shadow: true,
					translate: [0, 0, -800],
					rotate: [0, 180, 0],
				},
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			autoplay : {
				delay : DELAY
			}
		}
	},
	{
		id: 'slideCreative3dFlipV',
		constructor: '.slide-creative06',
		option: {
			grabCursor: true,
			effect: "creative",
			creativeEffect: {
				prev: {
					shadow: true,
					translate: [0, 0, -800],
					rotate: [-180, 0, 0],
				},
				next: {
					shadow: true,
					translate: [0, 0, -800],
					rotate: [180, 0, 0],
				},
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			autoplay : {
				delay : DELAY
			}
		}
	},
]

export default slideObj
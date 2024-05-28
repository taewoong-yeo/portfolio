/***************************************************
        스트링을 함수로 변환, 효과 추가할 때마다 추가해야 함...
***************************************************/
(function convertFnc() {
    window["menu00"] = menu00
    window["menu01"] = menu01
    window["menu02"] = menu02
    window["menu03"] = menu03

    window["inner00"] = inner00
    window["inner01"] = inner01
    window["inner02"] = inner02
})()



/***************************************************
        기본 옵션 선언
***************************************************/
let basicTiming = {
    menuDuration: 0,
    menuDelay: 0,
    menuEasing: "linear",
    innerDuration: 0,
    innerDelay: 0,
    innerEasing: "linear",
    circle: "#ff0000",
    optionUndefined: true
}


/***************************************************
        옵션 값 설정하는 함수
***************************************************/
function setting(check, duration, delay, easing) {
    basicTiming[check + "Duration"] = duration
    basicTiming[check + "Delay"] = delay
    basicTiming[check + "Easing"] = easing
}


/***************************************************
        기존의 옵션과 외부 옵션을 합치는 함수
***************************************************/
function coverOption(timing) {
    basicTiming = Object.assign(basicTiming, timing)
}


/***************************************************
        애니메이션 설정하는 함수
***************************************************/
function frame(menuEffect, innerEffect, etcEffect) {
    const option = {
        menuEffectFnc: menuEffect,
        innerEffectFnc: innerEffect,
        etcEffect: etcEffect
    }

    return option
}


/***************************************************
        애니메이션 display setting
***************************************************/
function checkContainerStyle() {
    const container = document.querySelector('.ux-sidebar-container')

    if (window.getComputedStyle(container).display == "none") {
        gsap.set(container, {
            display: "block",
            alpha: 1,
            overwrite: true
        })
    } else {
        gsap.set(container, {
            display: "none",
            alpha: 0,
            overwrite: true
        })
    }

}

const tl = gsap.timeline({ paused: true })
const tl01 = gsap.timeline({ paused: true })


//********************************애니메이션 리스트**********************************/
function menu00() {
}
function inner00() {

}

function menu01(target) {
    if (basicTiming.optionUndefined) {
        setting("menu", 1.2, 0.3, "Power3.easeOut")
    }

    gsap.set(target.parentNode, {
        perspective: "500px"
    })

    if (document.querySelector('body').classList.contains('is-sidebar')) {
        gsap.set(target, {
            rotateX: "-70deg",
            transform: "translate3d(0, 20px, -50px)",
            alpha: 0,
            overwrite: true,
            transformOrigin: "bottom",
        })

        gsap.to(target, basicTiming.menuDuration, {
            rotateX: 0,
            transform: "translate3d(0, 0, 0)",
            visibility: "inherit",
            alpha: 1,
            stagger: 0.12,
            delay: basicTiming.menuDelay,
            ease: basicTiming.menuEasing,
            overwrite: true,
        })
    }
}

function menu02(target) {
    if (basicTiming.optionUndefined) {
        setting("menu", 0.8, 0.2, "Power3.easeOut")
    }

    if (document.querySelector('body').classList.contains('is-sidebar')) {
        gsap.set(target, {
            y: "150%",
            alpha: 0,
            overwrite: true,
            transformOrigin: "bottom",
        })

        gsap.to(target, basicTiming.menuDuration, {
            y: 0,
            alpha: 1,
            stagger: 0.12,
            delay: basicTiming.menuDelay,
            ease: basicTiming.menuEasing,
            overwrite: true,
        })
    } else {
        // gsap.to(target, 0.6, {
        //     y: "150%",
        //     alpha: 0,
        //     stagger: 0.12,
        //     delay: 0,
        //     ease: basicTiming.menuEasing,
        //     overwrite: true,
        // })
    }
}

function menu03(target) {
    if (basicTiming.optionUndefined) {
        setting("menu", 0.6, 0.1, "Power3.easeOut")
    }

    if (document.querySelector('body').classList.contains('is-sidebar')) {
        gsap.set(target, {
            x: "80%",
            alpha: 0,
            overwrite: true,
            transformOrigin: "bottom",
        })

        gsap.to(target, basicTiming.menuDuration, {
            x: 0,
            alpha: 1,
            stagger: 0.1,
            delay: basicTiming.menuDelay,
            ease: basicTiming.menuEasing,
            overwrite: true,
        })
    }
}


function inner01(target) {
    if (basicTiming.optionUndefined) {
        setting("inner", 1.2, 0.3, "Power3.easeOut")
    }

    // if (document.querySelector('body').classList.contains('is-sidebar')) {

    //     gsap.set(target, {
    //         alpha: 0,
    //         overwrite: true,
    //     })

    //     gsap.to(target, basicTiming.innerDuration, {
    //         alpha: 1,
    //         delay: basicTiming.innerDelay,
    //         ease: basicTiming.innerEasing,
    //         overwrite: true,
    //     })
    // } else {
    //     gsap.to(target, 0.3, {
    //         alpha: 0,
    //         overwrite: true,
    //     })
    // }
}


function inner02(target) {
    // if (basicTiming.optionUndefined) {
    //     setting("inner", 1.2, 0.3, "Power3.easeOut")
    // }

    // gsap.set(target.parentNode, {
    //     perspective: "500px"
    // })

    // if (document.querySelector('body').classList.contains('is-sidebar')) {
    //     gsap.set(target, {
    //         transform: "rotate3d(-1, -1, 0, -20deg) translateZ(-30px)",
    //         alpha: 0,
    //         overwrite: true,
    //     })

    //     gsap.to(target, basicTiming.innerDuration, {
    //         transform: "rotate3d(0, 0, 0, 0deg) translateZ(0)",
    //         alpha: 1,
    //         delay: basicTiming.innerDelay,
    //         ease: basicTiming.innerEasing,
    //         overwrite: true,
    //     })
    // } else {
    //     gsap.to(target, 0.3, {
    //         alpha: 0,
    //         overwrite: true,
    //     })
    // }
}


function coverMenu(target) {
    if (document.querySelector('body').classList.contains('is-sidebar')) {
        gsap.set(target, {
            alpha: 0,
            overwrite: true,
        })

        gsap.to(target, basicTiming.menuDuration, {
            alpha: 1,
            stagger: {
                amount: 0.3
            },
            delay: basicTiming.menuDelay,
            ease: basicTiming.menuEasing,
            overwrite: true,
        })
    }
}


function coverEtc() {
    const mask = document.querySelector('.ux-sidebar-container')
    const bg = document.querySelector('.ux-bg')
    const layer = document.querySelector('.ux-layer')
    const inner = document.querySelector('.ux-inner')

    if (document.querySelector('body').classList.contains('is-sidebar')) {
        checkContainerStyle()

        gsap.set(bg, {
            scale: 0,
            overwrite: true,
        })

        gsap.set(inner, {
            alpha: 0,
            scale: 2,
            overwrite: true,
        })

        gsap.set(layer, {
            maskSize: "0% 0%",
            opacity: 1,
            overwrite: true,
        })

        gsap.set(mask, {
            clipPath: "polygon(0% 0%, 0% 100%, 50% 100%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 101% 100%, 101% 0%)",
        })

        gsap.to(bg, 0.5, {
            scale: 1,
            overwrite: true,
        })

        gsap.to(inner, 1, {
            alpha: 1,
            scale: 1,
            delay: 0.2,
            ease: Power4.easeOut,
            overwrite: true,
        })

        gsap.to(layer, 1, {
            maskSize: "100% 100%",
            delay: 0.2,
            ease: Power4.easeOut,
            overwrite: true,
        })
    } else {
        gsap.to(mask, 1, {
            clipPath: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%, 101% 100%, 101% 0%)",
            ease: Power3.easeInOut,
            overwrite: true,
            onComplete() {
                checkContainerStyle()
                gsap.set(bg, {
                    scale: 0
                })
            }
        })
    }
}

function circleEtc() {
    const circleArea = document.querySelector('.circle-area')
    const circle = document.querySelector('.side-circle')
    if (document.querySelector('body').classList.contains('is-sidebar')) {

        checkContainerStyle()

        gsap.set(circleArea, {
            display: "block",
            alpha: 1,
        })

        gsap.set(circle, {
            scale: 1,
            alpha: 1,
            background: `radial-gradient(circle at center, ${basicTiming.circle} 30%, transparent 70%)`
        })

        gsap.to(circle, 0.6, {
            scale: 200,
            overwrite: true,
            ease: Power2.easeIn
        })
    } else {
        gsap.set(circle, {
            background: `radial-gradient(circle at center center, ${basicTiming.circle}00 -1%,  ${basicTiming.circle}50 -1%, ${basicTiming.circle} 0%)`
        })

        gsap.to(circle, 0.7, {
            overwrite: true,
            ease: Power2.easeIn,
            background: `radial-gradient(circle at center, ${basicTiming.circle}00 0%,  ${basicTiming.circle}50 10%, ${basicTiming.circle} 50%)`,
            onComplete() {
                gsap.to(circle, {
                    alpha: 0,
                    onComplete() {
                        gsap.set(circleArea, {
                            display: "none",
                            alpha: 0,
                        })
                    }
                })
                checkContainerStyle()
            }
        })
    }
}

function svg01Etc() {
    if (document.querySelector('body').classList.contains('is-sidebar')) {

        checkContainerStyle()
        tl.play()
    } else {
        tl.reverse()
    }
}

function svg02Etc() {
    if (document.querySelector('body').classList.contains('is-sidebar')) {

        checkContainerStyle()
        tl.restart()
    } else {
        tl01.restart()
    }
}



/***************************************************
        패키지형, 조합용 함수
***************************************************/
const coverCenter = (timing) => {
    setting('menu', 1, 0.3, "Power2.easeInOut")

    coverOption(timing)
    return frame(coverMenu, inner00, coverEtc)
}

const circle = (timing) => {
    setting('inner', 1, 0.3, "Power2.easeIn")

    coverOption(timing)

    return frame(menu00, inner01, circleEtc)
}

const svgEffect01 = (timing) => {
    setting('inner', 1, 0.5, "Power2.easeOut")
    setting('menu', 0.6, 0.5, "Power2.easeOut")

    basicTiming.optionUndefined = false
    coverOption(timing)

    const path = document.querySelector('.path')
    const set = "M 0 100 V 100 Q 50 100 100 100 V 100 z"
    const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
    // const start = "M 0 100 V 50 Q 50 100 100 50 V 100 z";
    const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

    tl.set(path, { attr: { d: set } })
    tl.to(path, 0.5, { attr: { d: start }, ease: Power2.easeIn })
        .to(path, 0.4, {
            attr: { d: end }, ease: Power2.easeOut, onReverseComplete() {
                gsap.delayedCall(0.2, checkContainerStyle)
            }
        })


    return frame(menu02, inner01, svg01Etc)
}

const svgEffect02 = (timing) => {
    setting('inner', 1, 0.4, "Power2.easeOut")
    setting('menu', 0.6, 0.4, "Power2.easeOut")

    basicTiming.optionUndefined = false
    coverOption(timing)

    const path = document.querySelector('.path')
    const set = "M 0 0 V 0 Q 50 0 100 0 V 0 z"
    const start = "M 0 0 V 50 Q 50 100 100 50 V 0 z";
    const start01 = "M 0 0 V 50 Q 50 0 100 50 V 0 z";
    const end = "M 0 0 V 100 Q 50 100 100 100 V 0 z";

    tl.set(path, { attr: { d: set } })
    tl.to(path, 0.5, { attr: { d: start }, ease: Power2.easeIn })
        .to(path, 0.4, {
            attr: { d: end }, ease: Power2.easeOut
        })

    tl01.to(path, 0.4, { attr: { d: start01 }, ease: Power2.easeIn })
        .to(path, 0.5, {
            attr: { d: set }, ease: Power2.easeOut, onComplete() {
                gsap.delayedCall(0.2, checkContainerStyle)
            }
        })

    return frame(menu02, inner01, svg02Etc)
}

const mixEffect = (menuNum, innerNum, timing) => {

    if (timing !== undefined) {
        basicTiming.optionUndefined = false
        coverOption(timing)
    }

    return frame(window[`menu${menuNum}`], window[`inner${innerNum}`])
}

export { coverCenter, circle, svgEffect01, svgEffect02, mixEffect }


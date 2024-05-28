class MotionFloating {
	constructor(el) {
			this.el = el;
			this.flotingEl = this.el.querySelector('img');
			this.randomX = this.random(1, 30);
			this.randomY = this.random(1, 30);
			this.randomDelay = this.random(0, 1);
			this.randomTime = this.random(3, 5);
			this.randomTime2 = this.random(5, 10);
			this.randomAngle = this.random(-10, 10);
	}

	init() {
			this.run();
	}

	run() {
			gsap.set(this.flotingEl, {
					x: this.randomX(-1),
					y: this.randomY(1),
					rotation: this.randomAngle(-1)
			});

			this.moveX(this.flotingEl, 1);
			this.moveY(this.flotingEl, -1);
			this.rotate(this.flotingEl, 3);
	}

	rotate(target, direction) {
			gsap.to(target, this.randomTime2(), {
					rotation: this.randomAngle(direction),
					ease: Sine.easeInOut,
					onComplete: () => this.rotate(target, direction * -1)
			});
	}

	moveX(target, direction) {
			gsap.to(target, this.randomTime(), {
					x: this.randomX(direction),
					ease: Sine.easeInOut,
					onComplete: () => this.moveX(target, direction * -1)
			});
	}

	moveY(target, direction) {
			gsap.to(target, this.randomTime(), {
					y: this.randomY(direction),
					ease: Sine.easeInOut,
					onComplete: () => this.moveY(target, direction * -1)
			});
	}

	random(min, max) {
			const delta = max - min;
			return (direction = 1) => (min + delta * Math.random()) * direction;
	}
}

export { MotionFloating };
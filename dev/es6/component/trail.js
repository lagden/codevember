'use strict';

import random from 'component/rnd';
import AddLetter from 'component/letter';

const letters = 'thiagolagden1234567890';
const nums = letters.length;

class Trail {
	constructor(context) {
		this.x = Math.floor(random(0, context.canvas.width) / 10) * 10;
		this.y = -100;
		this.size = random(1, 10) * 8;
		this.spacing = this.size;
		this.ctx = context;
		this.cc = 255;
		this.letters = [];
	}
	draw() {
		if (this.y < this.ctx.canvas.height) {
			this.cc -= 10;
			this.y += this.spacing;
			const char = letters.charAt(random(0, nums - 1));
			const t = new AddLetter(char, `${this.size}px SG07`, this.size);
			t.draw(this.ctx, this.x, this.y, this.cc);
			this.letters.push(t);
		} else {
			this.letters.shift();
		}
	}
}

export default Trail;

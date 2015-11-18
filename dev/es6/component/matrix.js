'use strict';

import random from 'component/rnd';
import webFont from 'webfontloader/webfontloader';
import Trail from 'component/trail';

const matrix = document.querySelector('#matrix');
const body = document.body;
const trails = [];
let context = matrix.getContext('2d');

function retina() {
	const ratio = window.devicePixelRatio || 1;
	matrix.width *= ratio;
	matrix.height *= ratio;
	context = matrix.getContext('2d');
}

function resize() {
	context.canvas.width = body.clientWidth;
	context.canvas.height = body.clientHeight;
	retina();
}

function add() {
	const t = new Trail(context);
	trails.push(t);
}

function update() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	context.save();
	let t;
	for (t of trails) {
		t.draw();
		if (t.letters.length === 0) {
			const idx = trails.indexOf(t);
			if (idx > -1) {
				trails.splice(idx, 1);
			}
		}
	}
}

const fps = 15;
function loop() {
	if (random(1, 10) % 2) {
		add();
	}
	setTimeout(() => {
		window.requestAnimationFrame(loop);
		update();
	}, 1000 / fps);
}

function init() {
	window.addEventListener('resize', resize);
	matrix.addEventListener('click', add);
	resize();
	loop();
}

// Webfont
const webFontConfig = {
	custom: {
		families: ['SG07']
	},
	active: init
};
webFont.load(webFontConfig);

'use strict';

class AddLetter {
	constructor(...opts) {
		const [char, font, size] = opts;
		this.char = char;
		this.font = font;
		this.size = size;
		this.tempCanvas = document.createElement('canvas');
		this.tempCtx = this.tempCanvas.getContext('2d');
		this.firstTime = true;
	}
	draw(context, x, y, cc) {
		context.font = this.font;
		context.fillStyle = rgbToHex(cc, cc, cc);
		context.fillText(this.char, x, y);
	}
}

function componentToHex(c) {
	const hexa = c.toString(16);
	return hexa.length === 1 ? `0${hexa}` : hexa;
}

function rgbToHex(r, g, b) {
	return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

export default AddLetter;

function random(min, max) {
	return (min + Math.random() * (max - min) + 0.5) | 0;
}

export default random;

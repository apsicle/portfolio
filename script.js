"use strict";
let n = 5; //number of images, i.e. sides of the carousel
let panel_width = 210; //width of a panel, i.e. length of a side on the polygon

let carousel = document.getElementById("carousel");
let figures = carousel.children;

function calc_angles() {
	//the outward angle from a point in the center of a regular n-sided polygon with projections from n to each vertex.
	let angle = 360 / (n);
	let angle_rad = angle * Math.PI / 180;
	let z_proj = panel_width / (2 * Math.tan(angle_rad / 2));
	for(let i = 0; i < n; i++) {
		let current_rotation = angle * (i);
		let figure = figures[i];
		figure.style.transform = "rotateY(" + String(current_rotation) + "deg) translateZ(" + String(z_proj) + "px)";
	}
}

function move(num) {
	//spins the carousel so that the nth picture is facing the front
	let angle = 360 / n;
	let angle_rad = angle * Math.PI / 180;
	let z_proj = panel_width / (2 * Math.tan(angle_rad / 2));
	for(let i = 0; i < n; i++) {
		let current_rotation = angle * (i - num);
		let figure = figures[i];
		figure.style.transform = "rotateY(" + String(current_rotation) + "deg) translateZ(" + String(z_proj) + "px)";
	}

}

function right() {
	//spins the carousel to show the next image on the right
}

function previous() {
	//spins the carousel to show the previous image on the left
}

calc_angles();
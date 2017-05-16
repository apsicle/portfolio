"use strict";
let n = 5; //number of images, i.e. sides of the carousel
let panel_width = 600; //width of a panel, i.e. length of a side on the polygon

let carousel = document.getElementById("carousel");
let figures = carousel.children;
let active_figure = figures[0];
$(active_figure).hover( hoverVideo, hideVideo );

function calc_angles() {
	//the outward angle from a point in the center of a regular n-sided polygon with projections from n to each vertex.
	let angle = 360 / (n);
	let angle_rad = angle * Math.PI / 180;
	let z_proj = panel_width / (2 * Math.tan(angle_rad / 2));
	for(let i = 0; i < n; i++) {
		let cur_z = 20 - Math.abs(20*(2 - i));
		let current_rotation = angle * (i);
		let figure = figures[i];
		figure.style.transform = "rotateY(" + String(current_rotation) + "deg) rotateX(" + String(cur_z) + "deg) translateZ(" + String(z_proj) + "px)";
	}
}

function move(num) {
	//spins the carousel so that the nth picture is facing the front
	$(active_figure).off('hover');
	let angle = 360 / n;
	let angle_rad = angle * Math.PI / 180;
	let z_rot = -60;
	let z_proj = panel_width / (2 * Math.tan(angle_rad / 2));
	for(let i = 0; i < n; i++) {
		let current_rotation = angle * (i - num);
		let cur_z = 20 - Math.abs(20*(2 - i));
		let figure = figures[i];
		figure.style.transform = "rotateY(" + String(current_rotation) + "deg) rotateX(" + String(cur_z) + "deg) translateZ(" + String(z_proj) + "px)";
	}
	active_figure = figures[num];
	$(active_figure).hover( hoverVideo, hideVideo );
	display_info(num);
}

function right() {
	//spins the carousel to show the next image on the right
}

function previous() {
	//spins the carousel to show the previous image on the left
}

function hoverVideo(e) { 
	$('.overlay', this).get(0).play(); 
}

function hideVideo(e) {
	let vid = $('.overlay', this).get(0);
    vid.pause();
    vid.currentTime = 0;
}

function display_info(num) {
	//fills the sidebar with info for the currently active figure
	let title = document.getElementById("item_title");
	let description = document.getElementById("item_description");

	switch(num) {
		case 0:
			title.innerHTML = "Rain Drops";
			break;
		case 1:
			title.innerHTML = "Dota Heroes";
			break;
		case 2:
			title.innerHTML = "Skyline";
			break;
		case 3:
			title.innerHTML = "Wisdom";
			break;
		case 4:
			title.innerHTML = "Stone Henge";
			break;
		}

	}

calc_angles();
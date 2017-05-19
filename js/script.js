"use strict";
let n = 5; //number of images, i.e. sides of the carousel
let panel_width = 800; //width of a panel, i.e. length of a side on the polygon

let active_page = document.getElementById("carousel_page")
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
	$('.sidebar', active_page).get(0).style.opacity = 1;
	//spins the carousel so that the nth picture is facing the front
	$(active_figure).off('mouseenter mouseleave');
	let angle = 360 / n;
	let angle_rad = angle * Math.PI / 180;
	let z_rot = -60;
	let z_proj = panel_width / (2 * Math.tan(angle_rad / 2));
	for(let i = 0; i < n; i++) {
		let current_rotation = angle * (i - num);
		let cur_z = 0;
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
	let vid = $('.overlay', this).get(0);
	vid.style.opacity = 1;
	vid.style.transform = "scale(1.15, 1.15)";
	vid.play();
}

function hideVideo(e) {
	let vid = $('.overlay', this).get(0);
	vid.style.opacity = 0;
	vid.style.transform = "scale(1, 1)";
    vid.pause();
    vid.currentTime = 0;
}

function refresh_content(div_obj, content) {
	div_obj.style.opacity = 0;
	setTimeout(function() {div_obj.innerHTML = content; div_obj.style.opacity = 1;}, 500);
	/*$(div_obj).fadeOut('slow', function() {
	    $(div_obj).html(content);
	    $(div_obj).fadeIn('slow');
	});*/
}

function display_info(num) {
	//fills the sidebar with info for the currently active figure
	let title = document.getElementById("item_title");
	let description = document.getElementById("item_description");

	switch(num) {
		case 0:
			refresh_content(title, "<a class='my_link' href='https://github.com/suhuiii/Colorburst'>Rain Drops</a>");
			refresh_content(description, "<p> Inspired by summer storms that add a splash of color into long, \
			hot, summer day. Created in p5. The default image is from <a class='my_link' \
			href='http://www.zerochan.net/1431763'>here</a> Note: suhuii and I turned this into a chrome new tab \
			extension with random images from Unsplash.");
			break;
		case 1:
			refresh_content(title, "<a class='my_link' href='https://github.com/apsicle/octosoccer'>Octosoccer</a>");
			refresh_content(description, "<p>Octosoccer was an experiment in creating an online multiplayer game. \
			Sprint, score, juke, trash talk. Download <a class='my_link' href='files/octosoccer_client.exe'>the game</a>.\
			Made with Lua, sock.lua (networking), bitser (serialization), LÖVE, Piskel, and GIMP</p>");

			break;
		case 2:
			refresh_content(title, "<a class='my_link' href='https://github.com/apsicle/8bitifier'>8-Bitifier</a>");
			refresh_content(description, "<p>Turns your everyday images into 8-bit art! Written in Python and Flask,\
			using scipy, hosted on <a class='my_link' href='http://apsicle.pythonanywhere.com/main'>pythonanywhere</a>.</p>");
			break;
		case 3:
			refresh_content(title, "<a class='my_link' href='https://github.com/apsicle/crimson'>Crimson</a>");
			refresh_content(description, "<p>Elemental spell-based dungeoncrawler / roguelike (on hold). Combine \
			elements to cast unique spells and target elemental weaknesses. Made with Lua, LÖVE, Piskel, and GIMP.</p>");
			break;
		case 4:
			refresh_content(title, "<a class='my_link' href='https://github.com/apsicle/happy_holidays'>Happy Holidays</a>");
			refresh_content(description,"<p>Inspired by a friend of mine who is so busy but always has time to care \
			for the people around her. Since I'm no good at crafts, I decided to make her a Christmas card while \
			exploring CSS transitions, HTML canvas, and object-oriented programming in Javascript.</p>");
			break;
		}



}

$(document).ready(function() {
	$(active_page).get(0).style.background = "black";
	calc_angles();
});


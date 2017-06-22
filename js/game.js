let startTime = Date.now();
let startFrame = 1;
let cursorHTML = "<img src='files/cursor1.png' width='25' height='25' align=''>"

let message = "Hi, I’m Ryan. I grew up a computer geek and nature lover. I finished my degree in Computational and \
Applied Mathematics and Statistics in May 2016, completing my thesis work on population network models of invasive \
species. After a bit of a rut dealing with a chronic back injury, I moved to NYC to attend Recurse Center. I went from \
building websites with HTML, CSS, and Javascript, to development with web APIs, Heroku and Node, Python and Flask, to \
the wonderful world of algorithmic art in p5, game development in GML, Lua, and LÖVE. Through it all I've found that \
what I love most about being a developer is being able to craft experiences for people to enjoy."

let contact = "\
		Email: rcyan@email.wm.edu\
		<br>\
		Twitter: <a style='color: black;' class='my_link' href='https://twitter.com/ryanincyan'>@ryanincyan</a>\
		<br>\
		Github: <a style='color: black;' class='my_link' href='https://github.com/apsicle'>github.com/apsicle</a>\
		<br>\
		Personal Site: <a style='color: black;' class='my_link' href='http://ryancyan.com/'>Soon to be repurposed</a>"

class Texter {
	constructor(target, message, index, cursorInterval, textInterval, active, callback) {
		// HTML target to append to, message to append, index is 
		this.target = target;
		this.message = message;
		this.index = index;
		this.active = active;
		this.cursorOn = false;
		this.cursorBlinkController = {'dt': 0, 'interval': cursorInterval || 750};
		this.appendTextController = {'dt': 0, 'interval': textInterval || 50};
		this.time = 0;
		this.callback = callback;
	}
	
	animate(dt) {
		// Behaviour of animate is to either append the next letter or to show a blinking cursor
		this.cursorBlinkController.dt += dt; //The amount of time elapsed since the last event
		this.appendTextController.dt += dt;
		if (this.active && this.appendTextController.dt > this.appendTextController.interval) {
			this.appendText();
			this.appendTextController.dt -= this.appendTextController.interval;
			if (this.appendTextController.dt > this.appendTextController.interval) {
				this.appendTextController.dt = 0;
			}
		}
		else if (!this.active && this.cursorBlinkController.dt > this.cursorBlinkController.interval) {
			this.blinkCursor();
			this.cursorBlinkController.dt -= this.cursorBlinkController.interval;
			if (this.cursorBlinkController.dt > this.cursorBlinkController.interval) {
				this.cursorBlinkController.dt = 0;
			}
		}
	}

	appendText() {
	// Given an array, "message", append the next element of the array.
		if (this.index < this.message.length) {
			this.target.innerHTML = this.target.innerText;
			$(this.target).append(this.message[this.index++]);
			$(this.target).append(cursorHTML);
		}
		else {
			this.pause();
			if (this.callback) {
				this.callback();
			}
		}
	}

	blinkCursor() {
		if (this.cursorOn) {
			this.target.innerHTML = this.target.innerText;
			this.cursorOn = false;
		}
		else {
			$(this.target).append(cursorHTML);
			this.cursorOn = true;
		}
	}

	pause() {
		this.active = false;
	}

	unpause() {
		this.active = true;
	}

	showAll() {
		this.target.innerHTML = message;
		this.pause();
	}

	set changeInterval(milliseconds) {
		this.interval = milliseconds;
	}
}

$(window).load(function() {
	let interactiveDiv = document.getElementById("column1_1");
	let myTexter = new Texter(interactiveDiv, message, 0, 750, 50, true);

	function run() {
		
		let dt = Date.now() - startTime;

		if (dt > 60) {
			console.log("running");
			startTime = Date.now();
			myTexter.animate(dt);
		}

		requestAnimationFrame(run);
	}
	run();

	$(interactiveDiv).click(function() {
		// closure here so that "this" will refer to object myTexter instead of scope of .click call (the p#column1);
		myTexter.showAll();
	});
});

/*!
 * rainDrop.js
 *
 * Copyright 2014 Hilson Shrestha
 * Released under the MIT license
 * https://github.com/hilsonshrestha/rainDrop/blob/master/LICENSE
 */

 (function(window) {
	var rainDrop = function( userOptions ) {
		// creates main holder div which holdes all the smaller rain divs
		var rdHolder = document.createElement('div'),
			drops = [], // list of all drops
			drop,
			cnt = 0,
			interval,
			merge,
			options = {};

		// merge second object to first one.
		merge = function(first, second) {
			for (var i in second) {
				first[i] = second[i];
			}
			return first;
		}

		// overwrite default options with user options
		merge(options, rainDrop.defaults);
		merge(options, userOptions);

		rdHolder.classList.add('rdHolder');

		// create drops and append it to the drops array
		for (var i = 0; i < options.total; i++) {
			drop = document.createElement('div');
			drop.classList.add('rdDrop');
			rdHolder.appendChild(drop);
			drops.push(drop);
		}

		interval = setInterval(function() {
			// add animation to each drops delayed by some time.
			drops[cnt].classList.add('active');
			drops[cnt].style.animation = drops[cnt].style.webkitAnimation = 'rdDrop-' + options.type + ' ' + (options.time) + 'ms linear 0s infinite ' + options.direction;
			if (options.color.length) drops[cnt].style.backgroundColor = options.color[cnt % options.color.length];
			cnt++;
			if (cnt == options.total) clearInterval(interval);
		}, options.time * .5 / options.total);
		return rdHolder;
	}

	// default options
	rainDrop.defaults = {
		// total number of drops
		total: 3,

		// animation time
		time: 1500,

		// colors of drops.
		// if length of this list is less than total drops,
		// this list is relooped.
		color: ['#F38630', '#E0E4CC', '#69D2E7'],

		// animation direction
		// normal, reverse, alternate, alternate-reverse
		direction: 'alternate-reverse',

		//type
		// normal, wave, ...
		type: 'normal'
	}
	
	window.rainDrop = rainDrop;
})(window);

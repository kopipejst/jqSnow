/**
 * jquery.snow - jQuery Snow Effect Plugin
 *
 * Available under MIT licence
 *
 * @version 1 (21. Jan 2012)
 * @author Ivan Lazarevic
 * @requires jQuery
 * @see http://workshop.rs
 *
 * @params flakeChar - the HTML char to animate
 * @params minSize - min size of snowflake, 10 by default
 * @params maxSize - max size of snowflake, 20 by default
 * @params newOn - frequency in ms of appearing of new snowflake, 500 by default
 * @params flakeColors - array of colors , #FFFFFF by default
 * @params durationMillis - stop effect after duration
 * @example $.fn.snow({ maxSize: 200, newOn: 1000 });
 */
(function($){
	
	$.fn.snow = function(options){
	
			var $flake 			= $('<div class="flake" />').css({'position': 'absolute', 'top': '-50px'}),
				documentHeight 	= $(document).height(),
				documentWidth	= $(document).width(),
				defaults		= {
									flakeChar	: "&#10052;", 
									minSize		: 10,
									maxSize		: 20,
									newOn		: 500,
									flakeColor	: ["#ffffff"],
									durationMillis: null
								},
				options			= $.extend({}, defaults, options);
							
			$flake.html(options.flakeChar);

			var interval		= setInterval( function(){
				var startPositionLeft 	= Math.random() * documentWidth - 100,
				 	startOpacity		= 0.5 + Math.random(),
					sizeFlake			= options.minSize + Math.random() * options.maxSize,
					endPositionTop		= documentHeight - defaults.maxSize - 40,
					endPositionLeft		= startPositionLeft - 100 + Math.random() * 200,
					durationFall		= documentHeight * 10 + Math.random() * 5000;
				$flake
					.clone()
					.appendTo('body')
					.css(
						{
							left: startPositionLeft,
							opacity: startOpacity,
							'font-size': sizeFlake,
							color: options.flakeColor[Math.floor((Math.random() * options.flakeColor.length))]
						}
					)
					.animate(
						{
							top: endPositionTop,
							left: endPositionLeft,
							opacity: 0.2
						},
						durationFall,
						'linear',
						function() {
							$(this).remove()
						}
					);
			}, options.newOn);

			if (options.durationMillis) {
				setTimeout(function() {
					removeInterval(interval);
				}, options.durationMillis);
			}	
	};
	
})(jQuery);

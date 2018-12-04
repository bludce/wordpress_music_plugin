jQuery.noConflict(); 

jQuery(document).ready(function() {
    var armElement = jQuery('.player-container .player .player__element-tonearm img'),
        vinylElement = jQuery('.player-container .player .player__element-vinyl  .element-vinyl__disk');
 
    function armPositionStart() {
        armElement.attr("src", "/wp-content/plugins/vinylPlayer/assets/img/igla.gif");
        armElement.velocity({
            rotateZ: "0deg"
        }, {
            duration: 1200,
            easing: "linear"
        });
    }

    function recordPlaying() {
        var currentTrack = audio.duration;
        jQuery('li.current-track').attr('data-duration',Math.round(currentTrack));
        var trackDuration = jQuery('li.current-track').attr('data-duration');

        armElement.velocity({
            rotateZ: "5deg"
        }, {
            duration: (trackDuration * 1000),
            easing: "linear"
        });

        vinylElement.velocity({
            rotateZ: "+=360deg"
        }, {
            duration: 2500,
            easing: "linear",
            loop: true,
            delay: 0
        });
    }

    function armPositionReset() {
        armElement.velocity('stop');
        armElement.velocity({
            rotateZ: "0deg"
        }, {
            duration: 1200,
            easing: "linear"
        });
    }

    function recordPausing() {
        armElement.velocity('stop');
        vinylElement.velocity('stop', true);
    }

    function recordStopping() { 
        vinylElement.velocity('stop', true);
        armElement.velocity('stop');
        armElement.velocity({
            rotateZ: "0deg"
        });
    }
    var myaudio = jQuery('.player-playlist').find('li:first-child').attr('data-track');
        myaudio = jQuery('.audio').attr('src',myaudio);
    var audio = jQuery('.audio')[0],
        firstTrack = jQuery('.player-playlist').find('li:first-child'),
        lastTrack = jQuery('.player-playlist').find('li:last-child');

    jQuery('.element-controls__play').click(function() {
        jQuery(this).addClass('none');
        jQuery('.element-controls__pause').addClass('paused');
        jQuery('.element-vinyl__shadow').css("opacity","1");
        if (audio.currentTime > 0 && audio.paused) {
            recordPlaying();
            audio.play();
        }
        else {
			armPositionStart();
            firstTrack.addClass('current-track');
            jQuery('.audio').attr('src', firstTrack.attr('data-track')); 
           
            /*Добавление бегущей строки*/    
            var info = jQuery('.current-track').text();
            jQuery(".player__element-info #marquee").html("");
            jQuery(".player__element-info #marquee").append(info);
            jQuery(function() {
              var marquee = jQuery("#marquee"); 
              marquee.css({"overflow": "hidden", "width": "100%"});
              // оболочка для текста ввиде span (IE не любит дивы с inline-block)
              marquee.wrapInner("<span>");
              marquee.find("span").css({ "width": "50%", "display": "inline-block", "text-align":"center" ,"height":"56px" }); 
              marquee.append(marquee.find("span").clone()); // тут у нас два span с текстом
              marquee.wrapInner("<div>");
              marquee.find("div").css("width", "200%");
              var reset = function() {
                jQuery(this).css("margin-left", "0%");
                jQuery(this).animate({ "margin-left": "-100%" }, 12000, 'linear', reset);
              };
              reset.call(marquee.find("div"));
            });     
            setTimeout(function() {
                recordPlaying();
                audio.play();
            }, 3030);
        }
    });

    jQuery('.element-controls__pause').click(function() {
        recordPausing();
        jQuery(this).removeClass('paused');
        jQuery('.element-controls__play').removeClass('none');
        audio.pause();
    });

    jQuery('.element-controls__stop').click(function() {
        if (jQuery('.song').hasClass('current-track')===false) {
            return;
        }
        armElement.attr("src", "/wp-content/plugins/vinylPlayer/assets/img/iglrevers.gif");
        jQuery('.album-shadow').css("opacity","0");
        jQuery('li.current-track').removeClass('current-track');
        jQuery('.element-controls__play, .element-controls__pause').removeClass('paused').removeClass('none');
        jQuery('.element-vinyl__shadow').css("opacity","0");
        jQuery(".player__element-info #marquee").html("");
        audio.pause();
        audio.currentTime = 0;
        recordStopping();
        
    });

    jQuery('.element-controls__prev').click(function() {
        if ( jQuery('li.current-track').length ) {
            armPositionReset();
            var currentTrack = jQuery('li.current-track'),
                prev = (currentTrack.is(':first-child')) ? lastTrack : currentTrack.prev(),
                prevTrack = prev.attr('data-track');
            currentTrack.removeClass('current-track');
        }
        else {
            armPositionStart();
            var prev = firstTrack,
                prevTrack = prev.attr('data-track');
        }

        jQuery('.element-controls__play:not(.none)').addClass('none');
        jQuery('.element-controls__pause:not(.paused)').addClass('paused');

        prev.addClass('current-track');

        jQuery('.audio').attr('src', prevTrack);
        
        audio.pause();
        audio.load();
        /*Добавление бегущей строки*/    
        var info = jQuery('.current-track').text();
        jQuery(".player__element-info #marquee").html("");
        jQuery(".player__element-info #marquee").append(info);
        jQuery(function() {
          var marquee = jQuery("#marquee"); 
          marquee.css({"overflow": "hidden", "width": "100%"});
          // оболочка для текста ввиде span (IE не любит дивы с inline-block)
          marquee.wrapInner("<span>");
          marquee.find("span").css({ "width": "50%", "display": "inline-block", "text-align":"center" ,"height":"56px" }); 
          marquee.append(marquee.find("span").clone()); // тут у нас два span с текстом
          marquee.wrapInner("<div>");
          marquee.find("div").css("width", "200%");
          var reset = function() {
            jQuery(this).css("margin-left", "0%");
            jQuery(this).animate({ "margin-left": "-100%" }, 12000, 'linear', reset);
          };
          reset.call(marquee.find("div"));
        });     

        setTimeout(function() {
            recordPlaying();
            audio.oncanplaythrough = audio.play();
        }, 2000);

    });

    jQuery('.element-controls__next').click(function() {
        if (jQuery('li.current-track').length ) {
            armPositionReset();
            var currentTrack = jQuery('li.current-track'),
                next = (currentTrack.is(':last-child')) ? firstTrack : currentTrack.next(),
                nextTrack = next.attr('data-track');
            currentTrack.removeClass('current-track');
        }
        else {
            armPositionStart();
            var next = firstTrack,
                nextTrack = next.attr('data-track'),
                nextArtwork = next.find('img').attr('src');
        }

        jQuery('.element-controls__play:not(.none)').addClass('none');
        jQuery('.element-controls__pause:not(.paused)').addClass('paused');

        next.addClass('current-track');

        jQuery('.audio').attr('src', nextTrack);

        audio.pause();
        audio.load();
        /*Добавление бегущей строки*/    
        var info = jQuery('.current-track').text();
        jQuery(".player__element-info #marquee").html("");
        jQuery(".player__element-info #marquee").append(info);
        jQuery(function() {
          var marquee = jQuery("#marquee"); 
          marquee.css({"overflow": "hidden", "width": "100%"});
          // оболочка для текста ввиде span (IE не любит дивы с inline-block)
          marquee.wrapInner("<span>");
          marquee.find("span").css({ "width": "50%", "display": "inline-block", "text-align":"center" ,"height":"56px" }); 
          marquee.append(marquee.find("span").clone()); // тут у нас два span с текстом
          marquee.wrapInner("<div>");
          marquee.find("div").css("width", "200%");
          var reset = function() {
            jQuery(this).css("margin-left", "0%");
            jQuery(this).animate({ "margin-left": "-100%" }, 12000, 'linear', reset);
          };
          reset.call(marquee.find("div"));
        });     
        
        setTimeout(function() {
            recordPlaying();
            audio.oncanplaythrough = audio.play();
        }, 2000);

    });

   jQuery('.player-playlist').find('li').click(function() {
        armPositionReset();
        jQuery('.album-shadow').css("opacity","1");
        selectedTrack = jQuery(this);
        if ( jQuery('li.current-track').length ) {
            jQuery('li.current-track').removeClass('current-track');
            selectedTrack.addClass('current-track');
            jQuery('.audio').attr('src', selectedTrack.attr('data-track'));
            /*Добавление бегущей строки*/    
            var info = jQuery('.current-track').text();
            jQuery(".player__element-info #marquee").html("");
            jQuery(".player__element-info #marquee").append(info);
            jQuery(function() {
              var marquee = jQuery("#marquee"); 
              marquee.css({"overflow": "hidden", "width": "100%"});
              // оболочка для текста ввиде span (IE не любит дивы с inline-block)
              marquee.wrapInner("<span>");
              marquee.find("span").css({ "width": "50%", "display": "inline-block", "text-align":"center" ,"height":"56px" }); 
              marquee.append(marquee.find("span").clone()); // тут у нас два span с текстом
              marquee.wrapInner("<div>");
              marquee.find("div").css("width", "200%");
              var reset = function() {
                jQuery(this).css("margin-left", "0%");
                jQuery(this).animate({ "margin-left": "-100%" }, 12000, 'linear', reset);
              };
              reset.call(marquee.find("div"));
            });     
        }
        else {
            armPositionStart();
            selectedTrack.addClass('current-track');
            jQuery('.audio').attr('src', selectedTrack.attr('data-track'));
            /*Добавление бегущей строки*/    
            var info = jQuery('.current-track').text();
            jQuery(".player__element-info #marquee").html("");
            jQuery(".player__element-info #marquee").append(info);
            jQuery(function() {
              var marquee = jQuery("#marquee"); 
              marquee.css({"overflow": "hidden", "width": "100%"});
              // оболочка для текста ввиде span (IE не любит дивы с inline-block)
              marquee.wrapInner("<span>");
              marquee.find("span").css({ "width": "50%", "display": "inline-block", "text-align":"center" ,"height":"56px" }); 
              marquee.append(marquee.find("span").clone()); // тут у нас два span с текстом
              marquee.wrapInner("<div>");
              marquee.find("div").css("width", "200%");
              var reset = function() {
                jQuery(this).css("margin-left", "0%");
                jQuery(this).animate({ "margin-left": "-100%" }, 12000, 'linear', reset);
              };
              reset.call(marquee.find("div"));
            });     
            
        }

        jQuery('.element-controls__play:not(.none)').addClass('none');
        jQuery('.element-controls__pause:not(.paused)').addClass('paused');

        audio.pause();
        audio.load();

        setTimeout(function() {
            recordPlaying();
            audio.oncanplaythrough = audio.play();
        }, 1500);
    });

    audio.addEventListener('ended', function(){
        var currentTrack = jQuery('li.current-track');
        if (currentTrack.is(':last-child')) {
            currentTrack.removeClass('current-track');
            jQuery('.element-controls__play, .element-controls__pause').removeClass('paused').removeClass('none');
            audio.pause();
            audio.currentTime = 0;
            recordStopping();
            /*Добавление бегущей строки*/    
            jQuery(".player__element-info #marquee").html("");
        }
        else {
            armPositionReset();           
            var next = currentTrack.next(),
                nextTrack = next.attr('data-track');
            currentTrack.removeClass('current-track');
            next.addClass('current-track');
            jQuery('.audio').attr('src', nextTrack);
        
            audio.pause();
            audio.load();
            /*Добавление бегущей строки*/    
            var info = jQuery('.current-track').text();
            jQuery(".player__element-info #marquee").html("");
            jQuery(".player__element-info #marquee").append(info);
            jQuery(function() {
              var marquee = jQuery("#marquee"); 
              marquee.css({"overflow": "hidden", "width": "100%"});
              // оболочка для текста ввиде span (IE не любит дивы с inline-block)
              marquee.wrapInner("<span>");
              marquee.find("span").css({ "width": "50%", "display": "inline-block", "text-align":"center" ,"height":"56px" }); 
              marquee.append(marquee.find("span").clone()); // тут у нас два span с текстом
              marquee.wrapInner("<div>");
              marquee.find("div").css("width", "200%");
              var reset = function() {
                jQuery(this).css("margin-left", "0%");
                jQuery(this).animate({ "margin-left": "-100%" }, 12000, 'linear', reset);
              };
              reset.call(marquee.find("div"));
            });     
            setTimeout(function() {
                recordPlaying();
                audio.oncanplaythrough = audio.play();
            }, 3000);
        }
    });

    /*Добавление индикатора громкости*/
    var colors = [
         'e52000',
         'ff7005',
         'ffc30a',
         'd7ff07',
         '8cff09',
         '51ef00',
     ];
    var bars = $('.player__element-bars');
    for(var i=0;i<colors.length;i++){
        jQuery('<div class="colorBar active">').css({
            backgroundColor: '#'+colors[i],
            marginTop: 7,
        }).appendTo('.player__element-bars');
    }

    /*Добавление регулировки громкости*/
    var rheostat = new Rheostat('Container', 'Indicator', { minValue: 0, maxValue: 100 });
    var vid = document.getElementById("audio");

    rheostat.addEvent('valueChanged', function(value){
        var size = value/100;
        vid.volume = size;
        if (value<100) {
            jQuery( ".player__element-bars" ).find('.colorBar').removeClass('active').slice(0).addClass('colorBar active');
        }
        if (value<80) {
            jQuery( ".player__element-bars" ).find('.colorBar').removeClass('active').slice(1).addClass('colorBar active');
        }
        if (value<64) {
            jQuery( ".player__element-bars" ).find('.colorBar').removeClass('active').slice(2).addClass('colorBar active');
        }
        if (value<48) {
            jQuery( ".player__element-bars" ).find('.colorBar').removeClass('active').slice(3).addClass('colorBar active');
        }
        if (value<32) {
            jQuery( ".player__element-bars" ).find('.colorBar').removeClass('active').slice(4).addClass('colorBar active');
        }
        if (value<16) {
            jQuery( ".player__element-bars" ).find('.colorBar').removeClass('active').slice(5).addClass('colorBar active');
        } 
        if (value<5) {
            jQuery( ".player__element-bars" ).find('.colorBar').removeClass('active');
        } 
    });

    //display current audio play time
	jQuery('.audio').on('timeupdate', function() {
		var currentPos = audio.currentTime;
		var maxduration = audio.duration;
		var perc = 100 * currentPos / maxduration;
		if(perc>=100)
		{
			perc= 99.5;
		}
		jQuery('.element-scrubber__progress').css('width',perc+'%');
	});

    //audio PROGRESS BAR
	//when audio timebar clicked
	var timeDrag = false;	/* check for drag event */
	jQuery('.player__element-scrubber').on('mousedown', function(e) {
		timeDrag = true;
		updatebar(e.pageX);
	});
	jQuery(document).on('mouseup', function(e) {
		if(timeDrag) {
			timeDrag = false;
			updatebar(e.pageX);
		}
	});
	jQuery(document).on('mousemove', function(e) {
		if(timeDrag) {
			updatebar(e.pageX);
		}
	});
	var updatebar = function(x) {
        var progress = jQuery('.player__element-scrubber');
		//calculate drag position
		//and update audio currenttime
		//as well as progress bar
        var maxduration = audio.duration;
		var position = x - progress.offset().left;
		var percentage = 100 * position / progress.width();
		if(percentage > 100) {
			percentage = 99.5;
		}
		if(percentage < 0) {
			percentage = 0;
		}
		jQuery('.element-scrubber__progress').css('width',percentage+'%');
		//$('.my-audio-volume-button').css('margin-left',percentage-2+'%');
		audio.currentTime = maxduration * percentage / 100;
	};

});

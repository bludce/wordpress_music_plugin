<?php
wp_register_style('main', '/wp-content/plugins/vinylPlayer/assets/css/main.css', '', '', '');
wp_enqueue_style('main');

function wpb_adding_scripts() {
    wp_deregister_script( 'jquery' );
    wp_register_script('jquery',  '/wp-content/plugins/vinylPlayer/assets/js/jquery-3.3.1.min.js','','1.1', true);
    wp_enqueue_script('jquery');

    wp_register_script('mootools',  '/wp-content/plugins/vinylPlayer/assets/js/MooToolsCore.js','','1.1', true);
    wp_enqueue_script('mootools');

    wp_register_script('rheostat',  '/wp-content/plugins/vinylPlayer/assets/js/rheostat.js','','1.1', true);
    wp_enqueue_script('rheostat');

    wp_register_script('velocity',  '/wp-content/plugins/vinylPlayer/assets/js/velocity.min.js','','1.1', true);
    wp_enqueue_script('velocity');

    wp_register_script('player',  '/wp-content/plugins/vinylPlayer/assets/js/player.js','','1.1', true);
    wp_enqueue_script('player');
}
add_action( 'wp_enqueue_scripts', 'wpb_adding_scripts' );

?>
<?php
add_action("wp_footer", "wp_footer_extra_code");

function wp_footer_extra_code() {?>
	<div class="player-container">
        <div class="player">
            <div class="player__element-vinyl element-vinyl">
                <div class="element-vinyl__content">
                    <div class="element-vinyl__shadow"></div>
                    <div class="element-vinyl__disk">
                        <div class="cover gradient"></div>
                    </div>
                </div>
            </div>
            <div class="player__element-tonearm element-tonearm">
                <img src="/wp-content/plugins/vinylPlayer/assets/img/start.png" class="element-tonearm__img">
            </div>
            <div class="player__element-bars"></div>
            <div class="player__element-info">
                <div id="marquee"></div>
            </div>
            <div class="player__element-scrubber element-scrubber">
                <div class="element-scrubber__progress"></div>
            </div>
            <div class="player__element-controls">
                <span class="element-controls element-controls__prev">
                    <svg class="mysvg prev" x="0px" y="0px" viewBox="0 0 21 22" xml:space="preserve">
                        <path d="M11,0v10L21,0v22L11,12v10L0,11L11,0z"></path>
                    </svg>
                </span>
                <span class="element-controls element-controls__play">
                    <svg class="mysvg play" x="0px" y="0px" viewBox="0 0 10 12" xml:space="preserve">
	                    <path d="M10,6c0,0.3-0.3,0.5-0.3,0.5l-8.6,5.3C0.5,12.2,0,11.9,0,11.1V0.9c0-0.8,0.5-1.1,1.1-0.7l8.6,5.3C9.7,5.5,10,5.7,10,6z"></path>
	                </svg>
                </span>
                <span class="element-controls element-controls__pause">
                    <svg class="mysvg pause" x="0px" y="0px" viewBox="0 0 12 14" xml:space="preserve">
	                    <path d="M11,0H9C8.4,0,8,0,8,0.6v12.8C8,14,8.4,14,9,14h2c0.6,0,1,0,1-0.6V0.6C12,0,11.6,0,11,0z M3,0H1C0.4,0,0,0,0,0.6v12.8C0,14,0.4,14,1,14h2c0.6,0,1,0,1-0.6V0.6C4,0,3.6,0,3,0z"></path>
	                </svg>
                </span>
                <span class="element-controls element-controls__stop">
                    <svg class="mysvg stop" x="0px" y="0px" viewBox="0 0 12 12" xml:space="preserve">
                        <path d="M12,1v9.8c0,0.7-0.5,1.2-1.2,1.2H1c-0.6,0-1-0.4-1-1V1.2C0,0.5,0.5,0,1.2,0H11C11.6,0,12,0.4,12,1z"></path>
                    </svg>
                </span>
                <span class="element-controls element-controls__next">
                    <svg class="mysvg next" x="0px" y="0px" viewBox="0 0 21 22" xml:space="preserve">
                        <path d="M10,22V12L0,22V0l10,10V0l11,11L10,22z"></path>
                    </svg>
                </span>
            </div>
            <div class="player__element-volume element-volume">
                <div class="element-volume__container" id="Container">
                    <div class="element-volume__indicator" id="Indicator"></div>
                </div>
            </div>
            <audio src="" id="audio" class="audio"></audio>
        </div>
    </div>
    <ol class="player-playlist">
        <?php 
            global $wpdb;
            $table_name = $wpdb->prefix . "vinyl";
            $music = $wpdb->get_results("
            SELECT * 
            FROM $table_name
            WHERE ID IS NOT NULL 
            ");
            foreach ($music as $row) {?>
                <li class="song" data-track="<?php echo $row->src ?>">
                    <div class="song__cover gradient"></div>
					<svg width="150" height="150" viewBox="0 0 200 200" class="text-circle" fill="#fff">
						<path d="M 52 74 A 40 40 0 1 1 52 76 Z" id="circle" fill="transparent"></path>
						<text>
							<textPath class="song-text" xlink:href="#circle">
								<?php echo $row->artist?> "<?php echo $row->song?>"
							</textPath>
						</text>
					</svg>
                </li>
            <?php } ?>
    </ol>
<?php }
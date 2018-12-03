<?php
// правильный способ подключить стили и скрипты
// Регистрирую стили
wp_register_style( 'my_style', '/wp-content/plugins/vinylPlayer/assets/css/main.css', '', '', '');
// Подключаю стили
wp_enqueue_style( 'my_style');
?>
<?php
add_action("wp_head", "wp_head_extra_code");
 
function wp_head_extra_code() {?>
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
            <div class="player__element-tonearm">
                <div class="element-tonearm__img"></div>
            </div>
            <div class="player__element-bars"></div>
            <div class="player__element-info">asfasgas</div>
            <div class="player__element-scrubber">asas</div>
            <div class="player__element-controls">
                <span class="element-controls element-controls__prev">
                    <svg class="svg prev" x="0px" y="0px" viewBox="0 0 21 22" xml:space="preserve">
                        <path d="M11,0v10L21,0v22L11,12v10L0,11L11,0z"></path>
                    </svg>
                </span>
                <span class="element-controls element-controls__play">
                    <svg class="svg play" x="0px" y="0px" viewBox="0 0 10 12" xml:space="preserve">
	                    <path d="M10,6c0,0.3-0.3,0.5-0.3,0.5l-8.6,5.3C0.5,12.2,0,11.9,0,11.1V0.9c0-0.8,0.5-1.1,1.1-0.7l8.6,5.3C9.7,5.5,10,5.7,10,6z"></path>
	                </svg>
                </span>
                <span class="element-controls element-controls__pause">
                    <svg class="svg pause" x="0px" y="0px" viewBox="0 0 12 14" xml:space="preserve">
	                    <path d="M11,0H9C8.4,0,8,0,8,0.6v12.8C8,14,8.4,14,9,14h2c0.6,0,1,0,1-0.6V0.6C12,0,11.6,0,11,0z M3,0H1C0.4,0,0,0,0,0.6v12.8C0,14,0.4,14,1,14h2c0.6,0,1,0,1-0.6V0.6C4,0,3.6,0,3,0z"></path>
	                </svg>
                </span>
                <span class="element-controls element-controls__stop">
                    <svg class="svg stop" x="0px" y="0px" viewBox="0 0 12 12" xml:space="preserve">
                        <path d="M12,1v9.8c0,0.7-0.5,1.2-1.2,1.2H1c-0.6,0-1-0.4-1-1V1.2C0,0.5,0.5,0,1.2,0H11C11.6,0,12,0.4,12,1z"></path>
                    </svg>
                </span>
                <span class="element-controls element-controls__next">
                    <svg class="svg next" x="0px" y="0px" viewBox="0 0 21 22" xml:space="preserve">
                        <path d="M10,22V12L0,22V0l10,10V0l11,11L10,22z"></path>
                    </svg>
                </span>
            </div>
        </div>
    </div>
<?php }
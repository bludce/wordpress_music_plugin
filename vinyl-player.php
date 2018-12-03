<?php
/*
Plugin Name: Vinyl-player
Description: This is a music player in the style of vinyl player
Version: 1.0
Author: Aleksey Zadorozhny
Author URI: https://github.com/bludce/
Plugin URI: https://github.com/bludce/wordpress_music_plugin
*/

define('VINYL_PLAYER_DIR', plugin_dir_path(__FILE__));
define('VINYL_PLAYER_URL', plugin_dir_url(__FILE__));

register_activation_hook(__FILE__, 'vinyl_activation');
register_deactivation_hook(__FILE__, 'vinyl_deactivation');
register_uninstall_hook(__FILE__, 'vinyl_uninstall');


function vinyl_load(){
    
    if(is_admin()) // подключаем файлы администратора, только если он авторизован
        require_once(VINYL_PLAYER_DIR.'includes/admin.php');
        
    //require_once(VINYL_PLAYER_URL.'includes/core.php');
}
vinyl_load();



 
function vinyl_activation() {
    global $wpdb;
    $table_name = $wpdb->prefix . "vinyl";
    if($wpdb->get_var("show tables like '$table_name'") != $table_name) {
        $sql = "CREATE TABLE " . $table_name . " (
            ID int NOT NULL AUTO_INCREMENT,
            src varchar(255) NOT NULL,
            song varchar(255),
            artist varchar(255),
            PRIMARY KEY (ID)
        );";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}

function vinyl_deactivation()
{
 return true;
}
 
function vinyl_uninstall() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'vinyl';
    $sql = "DROP TABLE IF EXISTS $table_name";
    $wpdb->query($sql);
}


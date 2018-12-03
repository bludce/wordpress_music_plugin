<?php



add_action( 'admin_menu', 'register_my_custom_menu_page' );
function register_my_custom_menu_page(){
	add_menu_page( 
		'Виниловый проигрыватель', 'Виниловый проигрыватель', 'manage_options', 'custompage', 'my_custom_menu_page', '', 6 
	); 
}

function my_custom_menu_page(){?>
	<div class="wrap">
        <?php screen_icon(); ?>
        <h2><?php echo get_admin_page_title() ?></h2>
        <h3>Список композиций</h3>
        <?php
            global $wpdb;
            $table_name = $wpdb->prefix . "vinyl";
            $music = $wpdb->get_results("
            SELECT ID, src, song, artist 
            FROM $table_name
            WHERE ID IS NOT NULL 
            ");

            ?>
        <div class="admin">
            <div class="admin__container music">
                <table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Исполнитель</td>
                            <td>Название песни</td>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($music as $row) {?>
                        <tr>
                            <td><?php echo $row->ID?></td>
                                <td><?php echo $row->song?></td>
                                <td><?php echo $row->artist?></td>
                            </tr>
                        <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>
        <h3>Добавить композицию</h3>
        <form enctype="multipart/form-data" action="" method="POST" id="myform">
            <?php wp_nonce_field( 'my_file_upload', 'fileup_nonce' ); ?>
            <input name="my_file_upload" type="file" />
            <label for="">Название песни <input type="text" name="song"></label>
            <label for="">Исполнитель песни <input type="text" name="artist"></label>
            <input type="submit" id="submit" value="Добавить песню" />
        </form>
       
    </div>
    <?php 
        if( wp_verify_nonce( $_POST['fileup_nonce'], 'my_file_upload' ) ){
            if ( ! function_exists( 'wp_handle_upload' ) ) 
                require_once( ABSPATH . 'wp-admin/includes/file.php' );
        
            $file = &$_FILES['my_file_upload'];
            $overrides = array( 'test_form' => false );
        
            $movefile = wp_handle_upload( $file, $overrides );
        
            if ( $movefile && empty($movefile['error']) ) {
                echo "Файл был успешно загружен.\n";
                //print_r( $movefile );
                $wpdb->insert($table_name, array('src'=>$movefile["file"], 'song'=>$_POST["song"],'artist'=>$_POST["artist"]));
            } else {
                echo "Возможны атаки при загрузке файла!\n";
            }
        }
        
    ?>
    
<?php } ?>
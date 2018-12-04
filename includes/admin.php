<?php
add_action( 'admin_menu', 'register_my_custom_menu_page' );
function register_my_custom_menu_page(){
	add_menu_page( 
		'Виниловый проигрыватель', 'Виниловый проигрыватель', 'manage_options', 'custompage', 'my_custom_menu_page', '', 6 
	); 
}

add_action( 'wp_enqueue_scripts', 'fhw_register_script' );

function fhw_register_script() {
	
	wp_localize_script( 'fhw_formular', 'ajax_object',
            array( 'ajax_url' => admin_url( 'admin-ajax.php' ), 'we_value' => 1234 ) );
}

//add_action('admin_print_scripts', 'my_action_javascript'); // такое подключение будет работать не всегда
add_action('admin_print_footer_scripts', 'my_action_javascript', 99);
function my_action_javascript() {
	?>
	<script>
	jQuery('.del').click(function(e) {
        e.preventDefault(); 
		var data = {
			action: 'my_action',
			whatever: jQuery(this).parent().parent().find('.table-id').text(),
		};

		// с версии 2.8 'ajaxurl' всегда определен в админке
		jQuery.post( ajaxurl, data, function(response) {
			alert('Песня удалена');
            document.location.reload(true);
		});
	});
	</script>
	<?php
}
add_action( 'wp_ajax_my_action', 'my_action_callback' );
function my_action_callback() {
	$whatever = intval( $_POST['whatever'] );
    global $wpdb;
    $table_name = $wpdb->prefix . "vinyl";
    $delete = $wpdb->get_results("
            DELETE FROM $table_name
            WHERE ID=$whatever
            ");
	echo $whatever;

	wp_die(); // выход нужен для того, чтобы в ответе не было ничего лишнего, только то что возвращает функция
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
            SELECT * 
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
                            <td>Удалить</td>
                            <td style="display:none">id песни</td>
                        </tr>
                    </thead>
                    <tbody>
                        <?php $id=1; foreach ($music as $row) {?>
                        <tr>
                            <td><?php echo $id?></td>
                            <td><?php echo $row->song?></td>
                            <td><?php echo $row->artist?></td>
                            <td><a href="" class="del">Удалить</a></td>
                            <td style="display:none" class="table-id"><?php echo $row->ID?></td>
                        </tr>
                        <?php $id++; } ?>
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
                $wpdb->insert($table_name, array('src'=>$movefile["url"], 'song'=>$_POST["song"],'artist'=>$_POST["artist"]));
                ?><script>document.location.reload(true);</script><?php
            } else {
                echo "Возможны атаки при загрузке файла!\n";
            }
        }
        
    ?>
    
<?php } ?>
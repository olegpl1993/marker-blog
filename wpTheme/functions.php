<?php
// добавление картинки поста
add_action( 'after_setup_theme', function () {
    add_theme_support( 'post-thumbnails' );
} );

// добавление кастомных полей
add_action( 'rest_api_init', function () {

  register_rest_field( 'post', 'game', array(
    'get_callback' => function( $post_arr ) {
        return get_post_meta( $post_arr['id'], 'game', true );
    },
    'schema' => null,
) );

    register_rest_field( 'post', 'developer', array(
        'get_callback' => function( $post_arr ) {
            return get_post_meta( $post_arr['id'], 'developer', true );
        },
        'schema' => null,
    ) );

    register_rest_field( 'post', 'release', array(
        'get_callback' => function( $post_arr ) {
            return get_post_meta( $post_arr['id'], 'release', true );
        },
        'schema' => null,
    ) );
	
	register_rest_field( 'post', 'genre', array(
        'get_callback' => function( $post_arr ) {
            return get_post_meta( $post_arr['id'], 'genre', true );
        },
        'schema' => null,
    ) );
	
	register_rest_field( 'post', 'publisher', array(
        'get_callback' => function( $post_arr ) {
            return get_post_meta( $post_arr['id'], 'publisher', true );
        },
        'schema' => null,
    ) );
	
	register_rest_field( 'post', 'platform', array(
        'get_callback' => function( $post_arr ) {
            return get_post_meta( $post_arr['id'], 'platform', true );
        },
        'schema' => null,
    ) );
} );
?>
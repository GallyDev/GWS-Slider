<?php
	// this file will be included by GWS-Debugian automatically
	define('GWS_SLIDER_VERSION', '1.0.3');
	// MESSAGE_INFO for the Git-Commit-Message: Erster Klick im Pagination-Thumbnail war kaputt
	// Use this format to generate Git-Commit-Message: "Vx.x.x - MESSAGE_INFO"
	// The Git-Messages must be in german

	add_action('wp_enqueue_scripts', 'gws_slider_scripts');
	function gws_slider_scripts() {
		wp_enqueue_script( 'gws-slider-js', plugin_dir_url( __FILE__ ) . 'js/gws-slider.js', array(), GWS_SLIDER_VERSION, true );
		wp_enqueue_style( 'gws-slider-css', plugin_dir_url( __FILE__ ) . 'css/gws-slider.css', array(), GWS_SLIDER_VERSION );
	}
	
	add_action('enqueue_block_editor_assets', 'gws_slider_editor_scripts');
	function gws_slider_editor_scripts() {
		wp_enqueue_style( 'gws-slider-editor-css', plugin_dir_url( __FILE__ ) . 'css/gws-slider-editor.css', array(), GWS_SLIDER_VERSION );
	}
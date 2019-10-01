<?php
/**
 * Plugin Name: EOM SVG Code Snippets
 * Plugin URI: https://github.com/joshsmith01/eom-svg-code-snippets.git
 * Description: Create performant code snippets that look great!
 * Author: joshsmith01
 * Author URI: https://www.efficiencyofmovement.com
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package EOM-SVG-code-snippets
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

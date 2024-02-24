import { writeFileSync } from "fs";

const phpContent = `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php wp_title(); ?></title>
  <link rel="icon" href="/favicon.ico" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
  />
  <script type="module" src="<?php echo get_template_directory_uri(); ?>/assets/index.js"></script>
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/index.css">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
  <div id="root"></div>
  <?php wp_footer(); ?>
</body>
</html>`;

const functionPHP = `<?php
if ( function_exists( 'add_theme_support' ) ) { 
	add_theme_support( 'post-thumbnails' ); 
}
?>`;

writeFileSync("dist/index.php", phpContent);
writeFileSync("dist/style.css", "");
writeFileSync("dist/function.php", functionPHP);

---
title: "WordPress Developer - Plugins & Theme"
date: "2021-04-01"
---

## 01 Getting Started

### Getting to know WordPress

[wordpress.com](https://wordpress.com/)

- hosting platform for wordpress
- user friendly, but not developer friendly

[wordpress.org](https://wordpress.org/)

- official wordpress site
- 튜토리얼: v 5.0 / 최신: v 5.7
- support / documentation / Codex
- [codex.wordpress.org](https://codex.wordpress.org/)
- -> [developer.wordpress.org](https://developer.wordpress.org/)

ex. Code Refference: `the_content`

- original source code: 코어 워드프레스
- changelog: 해당 함수가 어떻게 바뀌었는지 기록
- related: 코어 워드프레스에서 어디에서 사용 되었는지
- user contributes:

automattic.com

- Jetpack / WooCommerce
- own 'wordpress.com'

### PHP Refesher & WordPress Coding Standards

PHP online editor: [writephponline](https://www.writephponline.com/)

```php
<?php
// 현재 파일의 결재 함수
echo __FILE__;

// array
$arr = [1, 2, 3, 4, 5];

// 함수
// Example 1
$arr_double = array_map(function($val){
  return $val * 2;
}, $arr);

print_r( $arr_double );

// Example 2
function not_an_anonymous_function($val){
   return $val * 2;
}

$arr_double_v2 = array_map('not_an_anonymous_function', $arr);
print_r($arr_double_v2);

```

배열의 map 메서드

- `array_map(익명함수, 배열)`
- `array_map(함수이름, 배열)`

Resources

- [OOP / Object-Oriented PHP for Beginner](https://code.tutsplus.com/tutorials/object-oriented-php-for-beginners--net-12762)
- [WordPress Best Practices](https://make.wordpress.org/core/handbook/best-practices/)

## 02 Theme Development Foundation

### Exploring Wordpress & Configuring the wp-config.php file

root/wp-config.php

- WP를 설치 했을 때 자동으로 생성되는 파일 (DB, 환경변수...)
- **define(WP_DEBUG, true);** // development
- define(WP_DEBUG, false); // production
- Authentication:
  - hashed string
  - online generator: 생성된 값을 복사해서 사용 할 수 있다.
- wp-config-sample.php
  - config 파일이 자동으로 생성하지 않을 경우, 사용할 수 있는 파일

root/wp-includes: functions & classes

root/wp-admin: admin page 에서 사용되는 코드

root/wp-content: 사용자로 부터 입력 받은 모든 아셋 (plugins, themes, uploads)

Aphache config (php.ini)

- max_execution_time=500 // 기본값: 120
- post_max_size=50M // 기본값: 40M
- upload_max_filesize=50M // 기본값: 40M

### File Headers

Theme에 반드시 `index.php`, `style.css`이 포함되어야 한다.

[File Headers](https://codex.wordpress.org/File_Header)

- `styles.css` 파일 안에 `/* */` 안에 작성되고
- theme/plugin의 meta information이 name:key 형태로 저장되어 있다.
- Text Domain: a unique ID for your translations. (주로 파일명과 동일하게 작성한다.)

wp-content/themes/udemy

- style.css (File Headers)
- index.php
- Screenshot.png (theme screentshop: 880x660)

styles.css

```css
/*
Theme Name: Udemy
Author: Jack
Author URI: https://udemy.com
Description: A simple bootstrap WordPress theme.
version: 1.0
License:
License:
Tags: 검색에 사용 되는 태그
Text Domain: udemy
*/
```

index.php

```php
Hello World!
```

## Functions & Action Hooks

1. 강의에서 제공된 theme 파일 안의 assets 폴더를 로컬 wp 폴더에 복사한다.
2. index.html (정적 페이지)를 index.php (동적 페이지)에 복사한다.
3. functions.php: index.php를 로드하기 전에 실행된다. (function, action hook...)

[Plugin API/Hooks](https://codex.wordpress.org/Plugin_API/Hooks)

- Filter Hooks: Post, Page, and Attachment (Upload) Filters
- Action Hooks: Actions Run During a Typical Request
  - `do_action()`
  - `do_action_ref_array()`

```php
function themeslug_enqueue_style() {
    wp_enqueue_style( 'my-theme', 'style.css', false );
}

function themeslug_enqueue_script() {
    wp_enqueue_script( 'my-js', 'filename.js', false );
}

add_action( 'wp_enqueue_scripts', 'themeslug_enqueue_style' );
add_action( 'wp_enqueue_scripts', 'themeslug_enqueue_script' );
```

functions.php

```php
<?php

// Setup

// Includes
include( get_theme_file_path('/includes/front/enqueue.php') );

// Hooks
add_action('wp_enqueue_scipts', 'ju_enqueue');

// Shortcodes
```

includes/front/enqueue.php

```php
<?php

function ju_enqueue(){}

```

### Loading styles and scripts with enqueues

- 외부 스크립트/스타일시트는 등록을 먼저 한 후 가져온다.
- prefix를 사용하여, handle이 중복되는 것을 방지 한다. (ex. ju_bootstrap, ju_plugin).
- `wp_head();`, `wp_footer();` 을 사용하여 외부 스크립트나 스타일시트가 삽입 되는 위치를 지정한다.
- wordpress는 여러 외부 모듈을 기본적으로 포함하고 있다. 해당 모듈은 개발자가 따로 삽입하여 충돌하지 않도록 한다. (ex. jquery)
- `get_theme_file_uri();`: (http url) http://example.com/wp-content/theme/...
- `get_theme_file_path();`: (file system) /home/mysite/www/wp-content/theme/..

Reference

[wp_register_style](https://developer.wordpress.org/reference/functions/wp_register_style/)

```php
wp_register_style( string $handle, string|bool $src, string[] $deps = array(), string|bool|null $ver = false, string $media = 'all' )
```

[wp_enqueue_style](https://developer.wordpress.org/reference/functions/wp_enqueue_style/)

```php
wp_enqueue_style( string $handle, string $src = '', string[] $deps = array(), string|bool|null $ver = false, string $media = 'all' )
```

[wp_register_script](https://developer.wordpress.org/reference/functions/wp_register_script/)

```php
wp_register_script( string $handle, string|bool $src, string[] $deps = array(), string|bool|null $ver = false, bool $in_footer = false )
```

[wp_enqueue_script](https://developer.wordpress.org/reference/functions/wp_enqueue_script/)

```php
wp_enqueue_script( string $handle, string|bool $src, string[] $deps = array(), string|bool|null $ver = false, bool $in_footer = false )
```

[Default Scripts and JS Libraries Included and Registered by WordPress](https://developer.wordpress.org/reference/functions/wp_enqueue_script/#default-scripts-and-js-libraries-included-and-registered-by-wordpress)

index.php

```html
<head>
  <?php wp_head(); ?>
</head>
<body>
  <?php wp_footer(); ?>
</body>
```

includes/front/enqueue.php

```php
<?php
function ju_enqueue(){
  $uri = get_theme_file_uri();

  // resiter styles: wp_register_style($handle*, $src*, $deps, $ver, $media)
  wp_register_style('ju_google_fonts', 'https://fonts.googleapis.com/css?family=Lato:300,400,400i,700|Raleway:300,400,500,600,700|Crete+Round:400i');
  wp_register_style('ju_bootstrap', $uri . "/assets/css/bootstrap.css");

  // enqueue styles: wp_enqueue_style($handle*, $src, $deps, $ver, $media)
  wp_enqueue_style('ju_google_fonts');
  wp_enqueue_style('ju_bootstrap');

  // resiter scripts: wp_register_script($handle*, $src*, $deps, $ver, $in_footer)
  wp_register_script('ju_plugins', $uri . '/assets/js/plugin.js', [], false, true);
  wp_register_script('ju_functions', $uri . '/assets/js/functions.js', [], false, true);

  // enqueue scripts: wp_enqueue_script($handle*, $src, $deps, $ver, $in_footer)
  wp_enqueue_script('jquery'); // core wordpress defendencies
  wp_enqueue_script('ju_plugins');
  wp_enqueue_script('ju_functions');
}
```

### Cache Issues

- 효율적으로 페이지를 로드하기 위해 기존의 코드(CSS, JS, image)를 브라우저 캐쉬에 저장한다.
- 개발 중에서는 교체된 코드를 반영하기 위해 캐시를 지워워야 한다.
- wordpress는 버전을 사용해서 최신 코드를 로드 할 수 있다.
- 개발 모드 변수를 할당하여, 모드에 따라 버전을 지정할 수 있다. (`time()`)

functions.php

```php
define(JU_DEVELOPMENT_MODE, true);
```

enqueue.php

```php
<?php
function enqueue(){
  $ver = JU_DEVELOPMENT_MODE ? time() : false;

  wp_register_style(
    'ju_google_font',
    'https://fonts.googleapis.com/css?family=Lato:300,400,400i,700|Raleway:300,400,500,600,700|Crete+Round:400i',
    [],
    $ver
  );
  wp_enqueue_style('ju_google_fonts');

  wp_register_script(
    'ju_plugins',
    $uri . '/assets/js/plugin.js',
    [],
    $ver,
    true
  );
  wp_enqueue_script('ju_plugins');
}

```

### Adding Dummy Content

FakerPress: create faker users / terms and posts

### Menu Support

1. 메뉴가 활성화 되면, `register_nav_menu()` 를 사용해서 메뉴를 등록할 수 있다.
2. menu를 등록하면, `wp_nav_menu()`를 통해 페이지에 출력할 수 있다. (CSS 클래스를 설정하기 위해서는 `custom walker`가 필요하다.)
3. WP는 문자열을 변환해주는 함수를 제공한다. translation을 찾지 못하면 WP는 문자열 그대로 출력한다.

functions.php

```php
include(get_theme_file_path('/includes/setup.php'));
add_action('after_setup_theme', 'ju_setup_theme');
```

includes/setup.php // 메뉴 등록

```php
<?php

function ju_setup_theme()
{
  register_nav_menu('primary',  __('Primary Menu', 'udemy'));
}

```

index.php // 메뉴 츨력

```php
<?php
if (has_nav_menu('primary')) {
  wp_nav_menu([
    'theme_location'   =>  'primary',
    'container'        =>   false,
    'fallback-cb'      =>   false,
    'depth'            =>   4
  ]);
}
?>
```

[register_nav_menu($location, $description)](https://developer.wordpress.org/reference/functions/register_nav_menu/)

- $location\*: Munu location identifier
- $description\*: Menu location descriptive text

```php
<?php
add_action( 'after_setup_theme', 'register_my_menu' );
function register_my_menu() {
  register_nav_menu( 'primary', __( 'Primary Menu', 'theme-slug' ) );
}
?>
```

[wp_nav_menu($args)](https://developer.wordpress.org/reference/functions/wp_nav_menu/)

```php
wp_nav_menu( array $args = array(
    'menu'              => "", // (int|string|WP_Term) Desired menu. Accepts a menu ID, slug, name, or object.
    'menu_class'        => "", // (string) CSS class to use for the ul element which forms the menu. Default 'menu'.
    'menu_id'           => "", // (string) The ID that is applied to the ul element which forms the menu. Default is the menu slug, incremented.
    'container'         => "", // (string) Whether to wrap the ul, and what to wrap it with. Default 'div'.
    'container_class'   => "", // (string) Class that is applied to the container. Default 'menu-{menu slug}-container'.
    'container_id'      => "", // (string) The ID that is applied to the container.
    'fallback_cb'       => "", // (callable|bool) If the menu doesn't exists, a callback function will fire. Default is 'wp_page_menu'. Set to false for no fallback.
    'before'            => "", // (string) Text before the link markup.
    'after'             => "", // (string) Text after the link markup.
    'link_before'       => "", // (string) Text before the link text.
    'link_after'        => "", // (string) Text after the link text.
    'echo'              => "", // (bool) Whether to echo the menu or return it. Default true.
    'depth'             => "", // (int) How many levels of the hierarchy are to be included. 0 means all. Default 0.
    'walker'            => "", // (object) Instance of a custom walker class.
    'theme_location'    => "", // (string) Theme location to be used. Must be registered with register_nav_menu() in order to be selectable by the user.
    'items_wrap'        => "", // (string) How the list items should be wrapped. Default is a ul with an id and class. Uses printf() format with numbered placeholders.
    'item_spacing'      => "", // (string) Whether to preserve whitespace within the menu's HTML. Accepts 'preserve' or 'discard'. Default 'preserve'.
) );
```

[WP Bootstrap Navwalker](https://github.com/wp-bootstrap/wp-bootstrap-navwalker)

### Aside: Menu Walker

### Create Header & Footer Areas

1. `get_header()`, `get_footer()`을 사용해서 header.php, footer.php를 index.php 안으로 가져올 수 있다.
2. header.php / footer.php: 파일명은 반드시 동일 형식 이여야 한다.
3. `header-v2.php` -> `get_header('v2')`: `header-`로 시작하는 파일은 `get_header()`을 통해 가져올 수 있다.
4. `body_class( string )`: 사용자가 입력한 클래스 및 WP에서 자동으로 삽입 되는 클래스를 모두 반영한다.

root/header.php

```php
<html>
<!-- ... -->
<body <?php body_class('stretched no-transition'); ?>>
<!-- ... -->
</header>
```

root/footer.php

```php
<footer>
<!-- ... -->
</html>
```

root.index.php

```php
<?php get_header(); ?>
<section id="content">CONTENT</section>
<?php get_footer(); ?>
```

[body_class($class)](https://developer.wordpress.org/reference/functions/body_class/)

- $class: 클래스1 클래스2 클래스2

### Creating Sidebar and Widget Areas

1. sidebars 코드는 sidebar.php 파일 안에 작성하고, index.php 에서 `get_sidebar()`를 사용해서 가져온다.
2. sidebars 또한 header / footer 와 동일한 방식으로 명명된다.
3. WP에서 생성된 코드와 병합되기 때문에 HTML/CSS 를 최대한 간단하게 작성한다.
4. 사이드바가 활성화 되어있는지는 `is_active_sidebar()` 을 사용한다.

root/functions.php

```php
include(get_theme_file_path('/includes/widgets.php'));
add_action('widgets_init', 'ju_widjets');
```

root/includes/widgets.php

```php
<?php

function ju_widjets()
{
  register_sidebar([
    'name'          => __('My Frist Theme Sidebar', 'udemy'),
    'id'            => 'ju_sidebar',
    'description'   => __('Sidebar for the theme Udemy', 'udemy'),
    'before_widget' => '<div id="%1$s" class="widget cleafix %2$s">',
    'after_widget'  => '</div>',
    'before_title'  => '<h4>',
    'after_title'   => '</h4>'
  ]);
};

```

index.php

```php
<?php get_sidebar(); ?>
```

sidebar.php

```php
<div class="sidebar nobottommargin col_last">
  <div class="sidebar-widgets-wrap">
    <?php
    if (is_active_sidebar('ju_sidebar')) {
      dynamic_sidebar('ju_sidebar');
    };
    ?>
  </div>
</div>
```

[register_sidebar($args)](https://developer.wordpress.org/reference/functions/register_sidebar/)

- before_widget: 위젯의 아이디의 값을 `%1$s`, 클래스의 이름을 `%2$s`로 가져와서 렌더링 한다.

### Formatting the search form

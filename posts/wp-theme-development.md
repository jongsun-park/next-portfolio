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

### Functions & Action Hooks

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

- 워드프레스는 searchform.php 파일을 검색하고, 해당 코드를 검색 파일로 사용한다.
- 해당 템플릿을 발견하지 못한 경우, WP는 자동으로 `get_search_form()` 을 실행하여 검색 위젯을 출력한다.
- method: GET, input name: s

searchform.php

```php
<?php $unique_id = esc_attr(uniqid('search-form-')); ?>

<form role="search" method="get" class="search-form" action="<?php echo esc_url(home_url('/')); ?>">
  <div class="input-group">
    <input type="search" id="<?php echo $unique_id; ?>" class="form-control" name="s" value="<?php the_search_query(); ?>" placeholder="<?php _e('Search', 'udemy'); ?>" />
    <span class="input-group-btn">
      <button type="submit" class="btn btn-danger"><i class="icon-search"></i></button>
    </span>
  </div>
</form>
```

`esc_attr( $text )`: Escaping for HTTML attributes.

`uniqid( $prefix)`: Gnerate a unique ID, [php.net](https://www.php.net/manual/en/function.uniqid.php)

`esc_url( $url, $protocols, $_context )`: Checks and clean a URL

`home_url( $path, $scheme )`: Retrieves the URL for the current site where the front end is accessible.

```
$url = home_url( '/' );
echo $url;
// Output: http://www.example.com/
```

`the_search_query()`: Displays the contents of the search query variable.

`__()`: return the translated string.

`_e()`: output the translated string.

[get_search_form($args)](https://developer.wordpress.org/reference/functions/get_search_form/)

### The Loop

1. The loop를 사용해서 posts 배열을 순회 할 수 있다.
2. `add_theme_support ('post-thumbnails');`를 사용해서 featured-image를 사용할 수 있다.)
3. `the_post()`

- Iterate the post index in the loop.
- 루프 내에서 post를 가져오고, 다음 루프에서 다음 post를 가져올 수 있도록 한다.
- the_post() 사용하지 않은 경우, 한 post를 계속 출력한다. (무한반복)

조건문

1. curly brackets

```
if(){

}

```

2. `if:`, `endif:`

```php
<?php
if(have_posts()):

  while(have_posts()):
    the_post();
    get_template_part('template-parts/post/content', get_post_format());
  endwhile;

  the_posts_pagination( array() );

else:

  get_template_part( 'template-parts/post/content', 'none');

endif;
?>
```

[The Loop](https://developer.wordpress.org/themes/basics/the-loop/)

[`the_post()`](https://developer.wordpress.org/reference/functions/the_post/)

```php
if ( have_posts() ) {
    while ( have_posts() ) {
        the_post(); ?>
        <h2><?php the_title(); ?></h2>
        <?php the_content(); ?>
    <?php }
}
```

### Template Parts

1. Template parts는 템플렛을 재사용가능한 코드 블록으로 나누어 사용할 수 있다.
2. `get_template_part( $slug, $name )`:

- $slug: the generic template
- $name: the specified template

3. The generic template: the specified template를 찾을 수 없을 때 가져올 탬플렛

```php
get_template_part('content'); // content.php
get_template_part('content', 'foo'); // content-foo.php -> content.php
get_template_part('content-foo'); when you don't need backup template
```

`get_template_part('partials/post/content-excerpt');`: $slug 는 root 폴더를 기준으로 설정된 경로

`Partials`: parts of a template (template parts, views)

[add_theme_support( $feature, $mixed )](https://developer.wordpress.org/reference/functions/add_theme_support/): Registers theme support for a given feature.

[get_template_part( $slug, $name, $args )](https://developer.wordpress.org/reference/functions/get_template_part/): Loads a template part into a template.

### Template Tags

1. Template Tags: 데이터를 가공하거나, 출력하는 함수.
2. 대부분의 템플릿 태그는 루프 안의 post를 감지해서 해당 post의 데이터를 가져올 수 있다.
3. loop안에서 `the_date()` 대신 `get_the_date()` 사용
4. thumbnails은 여러 사이즈를 가질 수 있다. (원본사이즈: full)

- `get_title()`: get function, return the value
- `the_title();`: non-get function, echo out the value

index.php

```php
<div id="posts">
<?php
if (have_posts()) {
  while (have_posts()) {
    the_post();
    get_template_part('partials/post/content-excerpt');
  }
}
?>
</div>
```

partials/post/content-excerpt.php

```php
<div class="entry clearfix">
  <?php
  if (has_post_thumbnail()) {
  ?>
    <div class="entry-image">
      <a href="<?php the_permalink(); ?>">
        <?php the_post_thumbnail('full', ['class' => 'image_fade']); ?>
      </a>
    </div>
  <?php
  }
  ?>

  <div class="entry-title">
    <h2>
      <a href="<?php the_permalink(); ?>">
        <?php the_title(); ?>
      </a>
    </h2>
  </div>

  <ul class="entry-meta clearfix">
    <li><i class="icon-calendar3"></i><?php echo get_the_date(); ?></li>
    <li>
      <a href="<?php echo get_author_posts_url(get_the_author_meta('ID')); ?>">
        <i class="icon-user"></i>
        <?php the_author(); ?>
      </a>
    </li>
    <li>
      <i class="icon-folder-open"></i>
      <?php the_category(' '); ?>
    </li>
    <li>
      <a href="#">
        <i class="icon-comments"></i>
        <?php comments_number('0'); ?>
      </a>
    </li>
  </ul>
  <div class="entry-content">
    <p>
      <?php the_excerpt(); ?>
    </p>
    <a href="<?php the_permalink(); ?>" class="more-link">Read More</a>
  </div>
</div>
```

[List of Template Tags](https://developer.wordpress.org/themes/references/list-of-template-tags/)

- wp-includes/${type}-template.php

[Post Thumbnails](https://codex.wordpress.org/Post_Thumbnails)

- `has_post_thumbnail()`
- `the_post_thumbnail( $size, $attr )`: thumbnail, medium, medium_large, large, full
- `the_post_thumbnail_url()`
- `get_the_post_thumnail()`

```php
the_post_thumbnail('post-thumbnail', ['class' => 'img-responsive responsive--full', 'title' => 'Feature image']);
```

[Formatting Date and Time](https://wordpress.org/support/article/formatting-date-and-time/)

- 사용자가 직접 포멧을 선택할 수 있고, 개발자가 포멧을 설정할 수도 있다.
- `the_date()`
- `the_time()`

[the_author_meta( $field, $user_id )](https://developer.wordpress.org/reference/functions/the_author_meta/)

- Outputs the field from the user’s DB object. Defaults to current post’s author.

### Pagination

[Pagination](https://developer.wordpress.org/themes/functionality/pagination/)

```html
<div class="nav-previous alignleft">
  <?php next_posts_link( 'Older posts' ); ?>
</div>
<div class="nav-next alignright">
  <?php previous_posts_link( 'Newer posts' ); ?>
</div>
```

#### Styles & Scripts

- Be sure to register and enqueue your scripts/styles.
- Registering allows for plugins and Wordpress to manipulate your files for whatever reason.
- Easier to manage and control

#### Menus

- Wordpress provides in-build features that you can enable/disable.
- Menus can be enabled by calling the `register_nav_menu()` function

#### Template Parts

- It's good practice to split resuable pieces of code into seperate files so you can include theme later.

## 03 Templates & The Customizer

### Theme Hierachy & Single Post Template

Posts

- single-{post-type}-{slug}.php (single-post-hello.php)
- single-{post-type}.php (single-post.php)
- single.php: single.php(post template) / page.php(page template)
- singular.php: an extra fallback for all post types, regardless if built-in or custom
- index.php

Navigation

- `previous_posts_link()`, `next_posts_link()`: paginating pages with multiple posts
- `previous_post_link()`, `next_post_link()`: providing links to the next and previous post for a single post

single.php

```php
<?php
if (have_posts()){
  while(have_posts()){
    the_post();
    global $post;
    $author_ID    = $post->post_author;
    $author_URL   = get_author_posts_url($author_ID);
?>

  <?php the_title(); ?>
  <?php echo get_the_date(); ?>
  <?php the_author(); ?>
  <?php the_category(); ?>
  <?php comments_number(); ?>
  <?php
    if (has_post_thumbnail()){
      <?php the_permalink(); ?>
      <?php the_post_thumbnail('full'); ?>
    }
  ?>
  <?php
    the_content();
    $default = array(
      'before'    => '<p class="text-center">' . __('Page: ', 'udemy'),
      'after'     => '</p>'
    );
  ?>
  <?php the_tags('', ' '); ?>
  <?php previous_post_link(); ?>
  <?php next_post_link(); ?>

<?php
  }
}
?>
```

[Theme Development](https://codex.wordpress.org/Theme_Development)

[VISUALIZE THE WORDPRESS TEMPLATE HIERARCHY](https://wphierarchy.com/)

[Template Hierarchy](https://developer.wordpress.org/themes/basics/template-hierarchy/)

### Comments Template

- pluggable: the code can be extended by 3rd party plugins or WordPress itself.
- comments.php: a template for comments
- `post_password_required()`: check if the current post is password protected
- `comment_form()`
  - display form
  - perform additional checks before displaying the form
- `comments`:
  - global varialble
  - available for access inside a loop

single.php

```php
<?php if (comments_open() || get_comments_number()) {
  comments_template();
}
?>
```

comments.php

```php
<?php
if (post_password_required()) {
  return;
  // function 으로 해당 템플릿을 불러오기 때문에 이후 코드는 실행 되지 않는다.
};
?>

// 만약 comment가 있다면
<?php if (have_comments()) { ?>
  // total count
  <?php comments_number(); ?>
    // comments iteration
    <?php foreach ($comments as $comment) { ?>
        // avater: binding, size, , , attrs
        <?php echo get_avatar($comment, 60, '', '', ['class', 'avatar-60 photo avatar-default']); ?>
        // 작성자
        <?php comment_author(); ?>
        // 작성 날짜
        <?php comment_date(); ?>
        // 작성 내용
        <?php comment_text() ?>
      <?php } ?>
    <?php } ?>
    // pagination
    the_comments_pagination();
<?php } ?>

<?php
  comment_form([
    'comment_filed' => '',
    'fields'        => [
      'author'      => '<div><label>' . __('Name', 'udemy').'<label><input type="text" name="author" class=""/></div>',
      'email'       => '<div><label>' . __('Email', 'udemy').'<label><input type="text" name="email" class=""/></div>',
      'url'         => '<div><label>' . __('Website', 'udemy').'<label><input type="text" name="url" class=""/></div>',
    ],
    'class_submit'  => '',
    'label_submit'  => __('Submit Comment', 'udemy'),
    'title_reply'   => __('Leave a Comment', 'udemy')
  ])
?>
```

### Author Template Tags

- `nl2br()`: format text / long user bio's readable
- `get avartar()`: accepts a user ID, email or comment object

(`get_avatar( mixed $id_or_email, int $size = 96, string $default = '', string $alt = '', array $args = null )`)[https://developer.wordpress.org/reference/functions/get_avatar/]

(`the_author_meta( string $field = '', int|false $user_id = false )`)[https://developer.wordpress.org/reference/functions/the_author_meta/]

single.php

```php
// auther url & name
<strong>
  Posted by
  <a href="<?php echo $author_URL; ?>">
    <?php the_author(); ?>
  </a>
</strong>

// author avatar
<div class="author-image">
  <?php echo get_avatar($author_ID, 90, '', false, ['class' => 'img-circle']); ?>
</div>

// get method:
// nl2br: 줄 바꿈 하기 전에 br를 삽입한다.
<?php echo nl2br(get_the_author_meta('description')); ?>
```

### Related Posts using the WP_Query Class

- WP_Query class: query to the database for the posts. (create & executed)
- Main loops
  - generated by WordPress / using the `URL` the user is visiting
  - Done automatically by WordPress behind the scences.
- Secondary loops
  - created by you / using `WP_Query` class
  - Can query any/mutiple types of posts in the database
- 여러 loop를 사용하는 경우, 사용한 후 초기화 시켜줘야 한다.
- WP_Query 클래스는 여러 테마, 플러그인에서 사용하므로 주의해서 사용해야 한다.

(`WP_Query`)[https://developer.wordpress.org/reference/classes/wp_query/]

(`WP_Post`)[https://developer.wordpress.org/reference/classes/WP_Post/]

(`wp_reset_postdata()`)[https://developer.wordpress.org/reference/functions/wp_reset_postdata/]

- restores the $post global to the current post in the main query.

(`the_post()`)[https://developer.wordpress.org/reference/functions/the_post/]

- iterate the post index in the loop

WP_Query Class를 사용해야 하는 경우

- A list of related posts undert the current post / ex. all pots in the same category
- To create two loops on the same page / ex. FAQ page with the question titles at the top and the content beneath
- To create custom list of current posts in the sidebar or the footer of your site, when the Recent Posts widget doesn't do what you need
- To create custom queries for taxonomies uding more than one taxonomy to define what's displayed.

WP_Query Class를 사용하면 불편한 경우

- 특정 포스트나 카테고리에 따라 레이아웃 스타일을 다르고 하고 싶은 경우, WP_Query를 사용하는 것 보다 새로운 템플렛을 만들고 loop에서 해당 템플릿을 사용하도록 한다.
- 기본값보다 많거나 적은 post를 출력하고 싶은 경우, WP_Query 를 사용해서 새로운 query를 만들지 않고. `pre_get_posts`를 사용해서 메인 쿼리를 수정한다. 조건문을 함께 사용할 수 있다.

4 ~ 5 개 이상의 query를 사용해야하는 경우, 차라리 새로운 페이지를 만드는게 좋다.

single.php / Related Posts

```php
<?php
  $categories   = get_the_category();
  // printout data: print_r($categories);

  $rp_query     =   new WP_Query([
    // how many result
    'post_per_page'     =>    2,
    // not include current post
    'post__not_in'      =>    [$post->ID],
    // same category // categotries가 존재하는 경우 term_id, 아닌 경우 null
    'cat'               => !empty($categories) ? $categories[0]->term_id : null
  ]);
  // return array of post

  // secondary loop
  if ($rp_query->have_posts()) {
    while ($rp_query->have_posts()) {
      $rp_query->the_post();
  ?>
    // thumnail 이 존재한다면
    <?php if (has_post_thumbnail()) { ?>
       <a href="<?php get_permalink(); ?>">
          <?php the_post_thumbnail('thumnail'); ?>
        </a>
    <?php
      }
    ?>
    <?php the_permalink(); ?> // 원본 링크
    <?php echo the_title(); ?> // 제목
    <?php comments_number('0'); ?> // 댓글 수
    <?php the_excerpt(); ?> // 내용
  <?php
    }
    // reset $post global varibale
    // reset secondary loop
    wp_reset_postdata();
  }
  ?>
</div>
```

### Page Template (page.php)

- WordPress will load a template called `page.php` for page templates
- Pages templates tend to be a more minial version of a single post template, but it's completely up to the developer/designer.
- If you use the main loop multiple times, then you need to reset the loop every time using the `rewind_posts()` function.
- If you plan on integrating other plugins then it's always good to check if their activated. One way of checking is by using the `function_exists()` function

Page Template Order

1.  Custom Template File
2.  page-{slug}.php
3.  page-{id}.php
4.  _page.php_
5.  singular.php
6.  index.php

create loop

```php
<?php
  get_header();
  while( have_posts() ){
    the_post();
    ?>
    <!-- Page Title !-->
    <section id="page-title">
      <div class="container clearfix">
        <h1><?php the_title(); ?></h1>
        <span>
          <?php
            if( function_exists( 'the_subtitle' ){
              the_subtitle();
            }
          ?>
        </span>
      </div>
    </section>
    <?php
  }
?>
<?php rewind_posts(); ?>
```

without loop (simple solution)

```php
<?php get_header(); ?>

<!-- Page Title !-->
<section id="page-title">
  <div class="container clearfix">
    <h1><?php single_post_title(); ?></h1>
    <span>
      <?php
        if( function_exists( 'the_subtitle' ){
          the_subtitle();
        }
      ?>
    </span>
  </div>
</section>

```

`rewind_posts`: Rewind the posts in order to re-use the same query in different locations on a page

Plugin: WP Subtitle

### 404 and Category Template

- 404 / 404.php
- catetory / category.php
- search form:` <?php get_search_form(); ?>`
- a resusable templage: `<?php get_template_part(); ?>`

#### 404.php

404 Template Order

1. 404.php
2. index.php

```php
<?php get_header(); ?>

// make it translatable
// page title
<h1><?php _e( 'Page Not Found', 'udemy' ); ?></h1>
// heading
<h4><?php _e( "Oooops! The Page you were looking for, couldn't be found.", 'udemy' ); ?></h4>

// search form
<?php get_search_form(); ?> // searchform.php

<?php get_footer(); ?>
```

Category Template Order

1. category-{slug}.php
2. _category-{id}.php_
3. _category.php_
4. archive.php (Tags, Dates...)
5. index.php

#### category.php

```php
<?php get_header(); ?>

// Page title
<section id="page-title">
  <div class="container clearfix">
    <h1><?php the_archive_title(); ?></h1>
    <span>
      <?php the_archive_description(); ?>
    </span>
  </div>
</section>

// section

<?php get_footer(); ?>

```

id / slug 에 따른 별도의 템플릿을 적용해야 하는 경우 (taxonomy=category&tag_ID=6)

category-6.php

```php
<section id="page-title">
  <div class="container clearfix">
    <h1><?php the_archive_title(); ?> <em class="text-danger">IMPORTANT</em></h1>
    <span>
      <?php the_archive_description(); ?>
    </span>
  </div>
</section>

```

The index template should be loaded only when any other template is not suitable for the job.
(index 페이지에 의존하는 페이지가 많아 질수록, 웹사이트를 수정하기 힘들어 진다.)

### Date Template

- Date templates are not commonly created, but you may come across them so its good to know how to work with them.
- The date template is a type of archive template. It can be used for displaying posts within a certain year, month or day.
- WordPress doesn't provide much flexibility with this template. You'll need to use conditional tags to render date specific content.

Date Order Template

1. date.php
2. archive.php
3. index.php

date.php

```php
// copy from category template
// the_archive_description ->
<span>
<?php
  if( is_year() ){
    ?>You are viewing a year archive.<?php
  } else if( is_month() ){
    ?>You are viewing a month archive.<?php
  } else if( is_day() ){
    ?>You are viewing a day archive.<?php
  }
?>
</span>
```

한계: 선택된 날짜에 post가 없으면 404 템플릿이 출력된다.

### 30 Attachment Templates

- Attachments are what WordPress calls the images, videos, and any other files you uploaded on your site through the media uploader
- If you create an attachment template, then you're responsible for displaying the attachment
- The _post_ varialbe contains information about the attachments such as the full HTTP URL.
- Mine types specify what kind of file you're dealing with

#### What are mime types?

- A mine type is a way for a program/browser to identify what kind of file is being loaded.
- Similar to extensions.
- Stored internally.

#### Attachment Template order

1. {Mine-type}.php
2. attachment.php
3. sinle-attachment-{slug}.php
4. single.php
5. singular.php
6. index.php

#### attachment.php

```php
// copy from single.php
// title / content / comment
<a href="<?php echo $post->guid; ?>">Direct Dowload</a>
<?php
  // echo "<pre";
  // print_r( $post );
  // echo "</pre";
  // $post->post_type
  // $post->post_min_type
  // $post->guid
  the_content();
?>
```

#### image.php

```php
// copy from attachment.php
<img src="<?php echo $post->guid; ?>" alt="" class="img-responsive"/>
```

### Search and Custom Template

- The _search.php_ file is for search templates. It's important that you provibe a form with the searched term.
- Custom template files allow you to give users the choice to choose different template designs.
- You can name your templates whatever you want. It's best to keep the names short and concise.
- Custom templates can be applied to multiple post types. This is a new featured in versions 4.7 and above.

#### search.php

```php
// page title
<section id="page-title">
  <h1><?php _e('Search Results for:', 'udemy'); ?> <?php the_search_query(); ?></h1>
</section>
// search box
<div>
  <div><?php _e('What are you searching for today?', 'udemy'); ?></div>
  <div><?php get_search_form(); ?></div>
</div>
```

#### full-width-page.php

post type: page

```php
<?php
/*
* Template Name: Full Width Page
*/
?>

// copy from page.php
// remove sidebar
```

Creating page templates for specific post types

- 기본적으로 페이지에서만 커스텀 템플릿을 사용할 수 있다.
- 템플릿의 블록 주석에 타입을 설정하면, 다른 포스트 타입도 커스텀 템플릿을 선택 할 수 있다.
- WP 4.7+

```php
<?php
/*
* Template Name: Full Width Page
* Template Post Type: post, page, event
*/
?>
```

#### full-width-post.php

```php
// copy from single.php
<?php
/*
* Template Name: Full Width Post
* Template Post Type: post
*/
get_header();
?>
```

### Completing the Header, Title and Ad sections

## 04 Theme Template

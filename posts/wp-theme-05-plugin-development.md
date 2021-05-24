---
title: "WP Theme - 05 Plugin Development"
date: "2021-05-24"
---

# Plugin Development

Learn how to extend the functionality of WordPress by creating a plugin

## Overview

### Notes

You're more than free to add code to the theme rather than creating a separate plugin, but that's not recommended. You want to keep code that extends Wordpress into its own file.

### Recipe Plugin

- User Registeration/Login
- Recipe Management (Custom Post Types)
- Admin Forms
- Etc

## Creating out First Plugin

### Notes

- All plugins are stored inside the `wp-content/plugins` folder. WordPress will provide 2 plugins which are the Hello Dolly and Akismet plugins.
- WordPress will scan the **plugins** directory for files and any subfolder files for file headers.
- The minimum requirement for WordPress to recognize a plugin is the **Plugin Name** header property
- You can name your main plugin files whatever you want. Some plugins will use the `index.php` file and others will use the name of their plugin.

### wp-content/plugins/recipe/index.php

[Plugin File Header Example](https://codex.wordpress.org/File_Header)

```php
<?php
/*
  Plugin Name: Recipe
  Description: A simple WordPress plugin that allows user to create recipes and rate those recipes
  Version: 0.1.0
  Author: Udemy
  Author URI: http://udemy.com
  Text Domain: recipe
*/
```

## WordPress Action & Filter Hooks

### Notes

- Hooks, Actions and Filters are what WordPress calls the Plugins API
- Filter hooks/functions are **always** pass in something to filter and are **always** expected to return something. You are allowed to return **false**.
- Action hooks/functions can do anything behind the scenes. You don't have to output or return anything. You can run an SQL query or send out an email. Anything goes.

### Understanding WordPress Hooks

Plugin API (aka the Hooks API)

- Sometimes referred as the **hooks API**
- Applies to both plugins and themes.

What is a hook?

- A **hook** is a place in WordPress' code that can get functions added to it. When you carete a **hook** in WordPress, you gave yourself and other developers the opportunity to add in additional functionally at that location.
- **Hooked functions** are the pieces of external code that can be added into WordPress's processing at the locations specific by its hooks. In other words, these are the functions get "**hooked into**" WordPress.

2 Types of Hooks

- **Action Hooks**

  - Allow you to perform custom functionality.
  - Can do anything you want.
  - Occur during certain milestones.
  - ex: The page's **head** section is being built.
    No responsibility to anyone else.
  - ex: Sending emails, query the database, output messages, etc

- **Filter Hooks**
  - Allow you to modify data.
  - You can **return** the data, a modified version of the data, or something entirely different.
  - Unlike action hooks, contractors are expected to perform a certain task
  - Insert themselves in a normal work process.
  - Given a piece of "data" and are expected to return it to the regular work process.

Who are these contractors

- Contractors are PHP functions in your code.
- Formal term for them is **hooked functions**

```php
<?php
/**
 * Plugin Name: Hooks Example
 */

function ju_title( $title ){
  return 'Hooked ' . $title;
}

function ju_footer_shoutout(){
  echo 'Hooked Example plugin was here.';
}

add_filter( 'the_title', 'ju_title' ); // modify data
add_action( 'wp_footer', 'ju_footer_shoutout'); // custom action
```

## Custom Hooks and Prioritization

### Notes

- It's perfectly acceptable to use the same hooks several times. To control which functions runs first you should set the priority. (default: 10)
- If you don't set the priority, WordPress will run the functions as 1st come 1st serve. The lower the number the higher priority it gets.
- Action hooks are triggered using the **do_action()** function. This function accepts the name of the hooks you'd like to trigger.
- Filter hooks are triggered using the **apply_filters()** function which accepts the name of the hook to trigger and the data to filter.

### Priority

```php
add_action( 'wp_footer', 'ju_footer_shoutout');
add_action( 'wp_footer', 'ju_footer_shoutout_v2', 5);
```

1. 먼저 입력된 action 이 먼저 실행
2. 우선도의 기본값은 10 / 작은 값이 우선도를 갖는다.

### function wp_footer(){ /\*\*/ do_action('wp_footer')};

The first step is register a hook using the **add_action()** Function. The first parameter is the name of the hook. This can actually be any name.

### Customize Plugin

1. WP initializes
2. Plugins are loaded
3. Out example plugin registers some hooks
4. The template gets loaded
5. The **wp_footer()** function will run the event **wp_footer**
6. The **ju_footer()** function runs the event **ju_custom_footer**
7. The function **ju_kill_wp()** runs and echos out the text.

```php
function ju_footer(){
  do_action('ju_custom_footer');
};

function ju_kill_wp(){
  echo 'Hello';
};

add_action('wp_footer', 'ju_footer');
add_action('ju_custom_footer', 'ju_kill_wp');
```

## Plugin Activation & Security

### Notes

- Checking if a function or constant is defined is a great way to check if a WordPress is the one loading your files.
- The **register_activation_hook()** function is a function specifically made for plugins that will trigger when your plugin is activated.
- It's always good practice to perform checks to make sure the current WordPress site is compatible with your plugin.
- The **version_compare()** function allows you to compare version schematics that aren't possible with traditional comparison operators.

### Plugin Activation Setting

recipe/index.php

```php
if(!function_exists('add_action')){
  echo "Hi there! I'm just a plugin not much I can do when called directly.";
  exit;
};

// Setup

// Includes
include('includes/activate.php');

// Hooks
register_activation_hook( __FILE__, 'r_activate_plugin' );

// Shortcodes
```

/includes/activate.php

```php
function r_activate_plugin(){
  // 현재 WP 버전이 최소 버전(5.0) 보다 작은 경우 경고문 출력
  if(version_compare(get_bloginfo( 'version' ), '5.0', '<')){
    wp_die( __("You must update Wordpress to use this plugin"), 'recipe' );
  }
}
```

## Creating a Custom Post Type

### Notes

- Custom post types allow you to create a custom UI for a specific kind of content
- The **init** hook runs when the WordPress begins to initialize the data. This hook runs very early so it's the best place to register post types
- The **\_x()** function allows you to translate strings and also provide a context for the translator. A context allows you to describe how the translated string is being used for a more accurate translation.
- The **register_post_type()** function will allow you to create a post type. This function requires the name of the post type along with various settings.

### Problems

- Hard to distinguish different pieces of content
- If you wanted to create a certain type of content, you'd need to take the time to format each post.
- Difficult to keep track which are regular posts and which aren't

### Post Types

- post
- page
- attachment
- revision
- menu

### index.php

```php
// register
include('includes/init.php');
// hooks
add_action('init', 'recipe_init');
```

### includes/init.php

[register_post_type](https://developer.wordpress.org/reference/functions/register_post_type/#user-contributed-notes)

```php
function recipe_init(){
  $labels = array();
  $args = array();
  register_post_type( 'recipe', $args );
}
```

### Gutenberg Editor

```php
$args = array(
  'supports'            =>  [ 'editor' ],
  'show_in_rest'        =>  true
)
```

## Metadata API

Store data related to a post.

### Notes

- The metadata API allows you to attach data to specific content from posts to users. By itself, the data is not useful. Metadata **has** to be attached to something.
- The **update_post_meta()** function will create the metadata if it already doesn't exist.
- The **save_post** hook is **optionally** dynamic. By appending your custom post type you can make sure the hook is only triggered when your custom post type is create/update.
- It's always important to sanitize user input. The **update_post_meta** will already do it for you, but you should still take extra precautions.

### What is Metadata?

Metadata is basically just pieces of information related to a post, page or user. On its own, it's not very useful. Metadata **HAS** to be connected to something.

### [Metadata API](https://codex.wordpress.org/Metadata_API)

This is a generic, low level function and shoud **not** be used directly by plugins or themes

- add_metadata()

The corresponding meta funcstions

- add_post_meta()
- add_user_meta()
- add_comment_meta()
- add_term_meta()

### WordPress Formatting API (includes/formatting.php)

Sanitizing data function from WP

### index.php

```php
// includes
include('process/save-post.php');

// hooks
add_action( 'save_post_recipe', 'r_save_post_admin', 10, 3 );
```

`save_post_recipe`: save_post_postType

10: priority (default)

3: Numbers of arguments

### process/save-post.php

```php
function r_save_post_admin( $post_id, $post, $update ){
  $recipe_data            = get_post_meta( $post_id, 'recipe_data', true );
  $recipe_data            = empty( $recipe_data ) ? [] : $recipe_data;
  $recipe_data['rating']  = isset($recipe_data['rating']) ? absint( $recipe_data['rating'] ) : 0 ;
  $recipe_data['rating_count']  = isset($recipe_data['rating_count']) ? absint( $recipe_data['rating_count'] ) : 0 ;

  update_post_meta( $post_id, 'recipe_data', $recipe_data );
  // save_post_meta() 대신 사용, metadata가 없으면 새로 생성
}
```

empty(): falsy 값을 false 로 리턴한다.

isset(): null, undefiend 의 경우 0, 아닌 경우 해당 값을 리턴한다.

### (Sanitization)[https://developer.wordpress.org/themes/theme-security/data-sanitization-escaping/]

## Filter Hooks

### Notes

- Filter hooks/functions allow you to filter through data and modify the final result. You're always expected to return data.
- Whenever you create a post type, WordPress will generate a new permalink structure. You need to flush the rules in order for WordPress to recognise the changes, One way is by updating the prmalink structure from the admin dashboard.
- Separating the HTML from PHP can be a great way to organize our code.
- I18N means **internationalization**. It's a term for making your code translatable.

### index.php

```php
// includes
include('process/filter-content.php');
// hooks
add_filter( 'the_content', 'r_filter_recipe_content');
```

### process/filter-content.php

```php
function r_filter_recipe_content($content){
  if( !is_singular( 'recipe' )){
    return $content;
  }

  global $post;
  $recipe_data      = get_post_meta( $post->ID, 'recipe_data', true);
  $recipe_html      = file_get_contents('recipe-template.php', true);
  $recipe_html      = str_replace( 'RATE_I18N', __("Rating", "recipe"), $recipe_html);

  return $recipe_html . $content;
}
```

### process/recipe-template.php

```html
<ul class="list-unstyled">
  <li>
    <strong>RATE_I18N:</strong>
    <div
      id="recipe_rating"
      class="rateit"
      data-rateit-resetable="false"
      data-rid="RECIPTE_ID"
    ></div>
  </li>
</ul>
```

## Creating Database Tables

### Notes

- WordPress creates about 11 database tables on a fresh installation.
- You are allowed to create your own database tables if the APIs don't suit your needs.
- To create a database table you'll need the function **dbDelta()** to help you do so.
- HeidiSQL is a great tool for interating with your SQL database. It provides a lot of tools and information.

### activate.php

phpMyAdmin 에서 테이블 생성하고, 해당 SQL 코드 복사해서 전달

플러그인이 활성화 될 때 해당 테이블을 생성한다.

```php
  global $wpdb;
  // 강의 예제
  // $createSQL = "
  //   CREATE TABLE `" . $wpdb->prefix . "recipe_ratings` (
  //     `ID` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT ,
  //     `recipe_id` BIGINT(20) UNSIGNED NOT NULL ,
  //     `ratings` FLOAT(3,2) UNSIGNED NOT NULL ,
  //     `user_ip` VARCHAR(50) NOT NULL ,
  //     PRIMARY KEY (`ID`)
  //     ) ENGINE = InnoDB . $wpdb->get_charset_collate() . ";";
  // ";

  // comment solution
  $createSQL = "CREATE TABLE " . $wpdb->prefix . "recipe_ratings (
    ID BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
   recipe_id BIGINT(20) UNSIGNED NOT NULL,
    rating FLOAT(3,2) UNSIGNED NOT NULL,
    user_ip VARCHAR(50) NOT NULL,
    PRIMARY KEY (ID)
 )ENGINE = InnoDB " . $wpdb->get_charset_collate() . ";";

  require( ABSPATH . "/wp-admin/includes/upgrade.php");

  dbDelta( $createSQL );
```

### [dbDelta](https://developer.wordpress.org/reference/functions/dbdelta/)

Modifies the database based on specified SQL statements.

```php
  require_once(ABSPATH . 'wp-admin/includes/upgrade.php'); // dbDelta 를 사용하기 위해 import 해야되는 모듈
  dbDelta( $sql );
```

## Sending and using AJAX Requests

### Notes

- WordPress does not provide a AJAX URL variable to you will need to generate one and pass it to your JS files using the **wp_localize_script()** function.
- All AJAX requests should be sent to the **admin-ajax.php** file inside the **wp-admin** folder.
- The chrome developer tools provide a way for you to keep track of what files are loaded and how long it took to load those files. It event provides information about each individual file.
- There are 2 hooks. The **wp_ajax** and **wp_ajax_nopriv** hooks. The **nopriv** version is for users who are not logged in.

### [jquery rateit](https://github.com/gjunge/rateit.js)

### [AJAX in Plugins](https://codex.wordpress.org/AJAX_in_Plugins)

### [wp_ajax_action](https://developer.wordpress.org/reference/hooks/wp_ajax_action/)

### index.php

```php
// setup
// 현재 파일의 절대 경로를 변수에 할당
define('RECIPE_PLUGIN_URL', __FILE__);

// includes
include( 'includes/front/enqueue.php' );
include( 'process/rate-recipe.php' );

// hooks
add_action( 'wp_enqueue_scripts', 'r_enqueue_scripts', 100 ); // load plugin asset last
add_action( 'wp_ajax_r_rate_recipe', 'r_rate_recipe' );
add_action( 'wp_ajax_nopriv_r_rate_recipe', 'r_rate_recipe' );
```

### includes/front/enqueue.php

'rateit' 라이브러리의 js/css, main.js 를 등록하고 로드

```php
function r_enqueue_scripts(){
  wp_register_style(
    'r_rateit',
    plugins_url('/assets/rateit/rateit.css', RECIPE_PLUGIN_URL )
  );
  wp_enqueue_style( 'r_rateit' );

  wp_register_script(
    'r_rateit',
    plugins_url( '/assets/rateit/jquery.rateit.min.js', RECIPE_PLUGIN_URL ),
    ['jquery'], // dependencies
    '1.0.0', // version
    true // in footer
  );

  wp_register_script(
    'r_main',
    plugins_url('/assets/js/main.js', RECIPE_PLUGIN_URL),
    ['jquery'],
    '1.0.0',
    true
  );

  wp_localize_script( 'r_main', 'recipe_obj', [
    'ajax_url'      =>  admin_url( 'admin-ajax.php' )
  ]);
  // recipe_obj.ajax_url // admin_url( 'admin-ajax.php' )

  wp_enqueue_script( 'r_rateit' );
  wp_enqueue_script( 'r_main' );
}
```

wp_localize_script($handle, $object_name, $110n)

- PHP API 에 사용되는 데이터를 JS에 사용하기 위해 작성
- $object_name: the variable which will contain the data
- $110m: Data

### assets/js/main.js

```js
(function ($) {
  $("#recipe_rating").bind("rated", function () {
    $(this).rateit("readonly", true);

    var form = {
      action: "r_rate_recipe",
      rid: $(this).data("rid"),
      rating: $(this).rateit("value"),
    };

    $.post(recipe_obj.ajax_url, form, function (data) {}); // object_name.110m = admin_url( 'admin-ajax.php' )
  });
})(jQuery);
```

### process/rate-recipe.php

```php
<?php
function r_rate_recipe(){
  print_r($_POST);
}
```

## Handling AJAX Request and inesrting data inthe the Database

### Notes

- You can insert data using the **wpdb->insert()** method. This method will also sanitize all data and generate a proper query for you.
- There are 3 formats which are string, integer and float. The format for stinrg is **%s**. The format ofr integer is **%d**. The format for float is **%f**.
- WordPress provides a few method for executing custom queries. The **get_value()** method will execute a custom query and return a single value from that query.
- The **AVG()** SQL function will average out all the values from a particular column.

### /wp-admin/admin-ajax.php

로그인 상태이면 아무것도 출력하지 않는다. (`print_r(_$POST)`)

### [wpdb](https://developer.wordpress.org/reference/classes/wpdb/)

데이터베이스 테이블에 CRUD 하기 위한 클래스

#### [wpdb->insert](https://developer.wordpress.org/reference/classes/wpdb/#examples-5)

```php
$wpdb->insert(
    'table',
    array(
        'column1' => 'value1',
        'column2' => 123,
    ),
    array(
        '%s',
        '%d',
    )
);
```

### process/rate-recipe.php

```php
function r_rate_recipe(){
  global $wpdb;

  $output             =   [ 'status' => 1 ];
  $post_ID            =   absint( $_POST['rid'] );
  $rating             =   round( $_POST['rating'], 1 );
  $user_IP            =   $_SERVER['REMOTE_ADDR'];

  $rating_count       =   $wpdb->get_var(
      "SELECT COUNT(*) FROM `" . $wpdb->prefix . "recipe_ratings`
      WHERE recipe_id='" . $post_ID . "' AND user_ip='" . $user_IP . "'"
  );

  if( $rating_count > 0 ){
      wp_send_json( $output );
  }

  // Insert Rating into database
  $wpdb->insert(
    $wpdb->prefix . 'recipe_ratings',
    [
      'recipe_id' =>  $post_ID,
      'rating'    =>  $rating,
      'user_ip'   =>  $user_IP
    ],
    [ '%d', '%f', '%s' ]
  );

  // Update Recipe Metadata
  $recipe_data        =   get_post_meta( $post_ID, 'recipe_data', true );
  $recipe_data['rating_count']++;
  $recipe_data['rating']  =   round($wpdb->get_var(
      "SELECT AVG(`rating`) FROM `" . $wpdb->prefix . "recipe_ratings`
      WHERE recipe_id='" . $post_ID . "'"
  ), 1);

  update_post_meta( $post_ID, 'recipe_data', $recipe_data );

  $output['status']   =   2;
  wp_send_json( $output );
}
```

### process/filter-content.php

```php
<?php

function r_filter_recipe_content( $content ){
  if( !is_singular( 'recipe' ) ){
      return $content;
  }

  global $post, $wpdb;
  $recipe_data        =   get_post_meta( $post->ID, 'recipe_data', true );
  $recipe_html        =   file_get_contents( 'recipe-template.php', true );
  $recipe_html        =   str_replace( 'RATE_I18N', __("Rating", "recipe"), $recipe_html );
  $recipe_html        =   str_replace( 'RECIPE_ID', $post->ID, $recipe_html );
  $recipe_html        =   str_replace( 'RECIPE_RATING', $recipe_data['rating'], $recipe_html );

  $user_IP            =   $_SERVER['REMOTE_ADDR'];

  $rating_count       =   $wpdb->get_var(
      "SELECT COUNT(*) FROM `" . $wpdb->prefix . "recipe_ratings`
      WHERE recipe_id='" . $post->ID . "' AND user_ip='" . $user_IP . "'"
  );

  if( $rating_count > 0 ){
      $recipe_html    =   str_replace(
          'READONLY_PLACEHOLDER', 'data-rateit-readonly="true"', $recipe_html
      );
  }else{
      $recipe_html    =   str_replace( 'READONLY_PLACEHOLDER', '', $recipe_html );
  }

  return $recipe_html . $content;
}
```

### recipe-template.php

```html
<ul class="list-unstyled">
  <li>
    <strong>RATE_I18N: </strong>
    <div
      id="recipe_rating"
      class="rateit"
      READONLY_PLACEHOLDER
      data-rateit-value="RECIPE_RATING"
      data-rateit-resetable="false"
      data-rid="RECIPE_ID"
    ></div>
  </li>
</ul>
```

## Changing the Custom Post Type's Table Columns

### Notes

- You are allowed to modify the columns on the admin side of WordPress using action/filter hooks
- Custom columns must be handled by you. WordPress will take cate of it's own columns.

### index.php

```php
include( 'includes/admin/init.php' );
add_action( 'admin_init', 'recipe_admin_init');
```

### includes/admin/init.php

```php
function recipe_admin_init(){
    include( 'columns.php' );

    add_filter( 'manage_recipe_posts_columns', 'r_add_new_recipe_columns' );
    add_action( 'manage_recipe_posts_custom_column', 'r_manage_recipe_columns', 10, 2 );
}
```

### includes/admin/columns.php

```php
function r_add_new_recipe_columns( $columns ){
    $new_columns                =   [];
    $new_columns['cb']          =   '<input type="checkbox" />';
    $new_columns['title']       =   __( 'Title', 'recipe' );
    $new_columns['author']      =   __( 'Author', 'recipe' );
    $new_columns['categories']  =   __( 'Categories', 'recipe' );
    $new_columns['count']       =   __( 'Ratings count', 'recipe' );
    $new_columns['rating']      =   __( 'Average Rating', 'recipe' );
    $new_columns['date']        =   __( 'Date', 'recipe' );

    return $new_columns;
}

function r_manage_recipe_columns( $column, $post_id ){
    switch( $column ){
        case 'count':
            $recipe_data        =   get_post_meta( $post_id, 'recipe_data', true );
            echo isset($recipe_data['rating_count']) ? $recipe_data['rating_count'] : 0;
            break;
        case 'rating':
            $recipe_data        =   get_post_meta( $post_id, 'recipe_data', true );
            echo isset($recipe_data['rating']) ? $recipe_data['rating'] : 'N/A';
            break;
        default:
            break;
    }
}
```

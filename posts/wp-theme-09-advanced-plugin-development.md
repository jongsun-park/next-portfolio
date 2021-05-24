---
title: "WP Theme - 09 Advanced Plugin Development"
date: "2021-05-24"
---

# 09 Advanced Plugin Development

## Creating a Widget

### Notes

- Widgets are called at a weird time so make sure you include your widgets and functions using the full system path.
- You must extend the **WP_Widgets** class so Wordpress can assist you with setting up the widget.
- WordPress will take care of you submitting, processing and display the values/fields. Use the **get_field_name()** and **get_filed_id()** methods to help you generate the attributes.
- The **update()** methods allows you to filter the date your own way. it's important that you return the array so WordPress can update everything properly.

### [Widgets_AP](https://codex.wordpress.org/Widgets_API)

### index.php

```php
// register
include( dirname(RECIPE_PLUGIN_URL) . '/includes/widgets.php' ); // 절대 경로 입력
include( 'includes/widgets/daily-recipe.php');

// hooks
add_action( 'widgets_init', 'r_widgets_init' );
```

### includes/widgets.php

```php
function r_widgets_init(){
  register_widget( 'R_Daily_Recipe_Widget' );
}
```

### includes/widgets/daily-recipe.php

```php
class R_Daily_Recipe_Widget extends WP_Widget{
  /**
	 * Sets up the widgets name etc
	 */

	public function __construct() {
		$widget_ops = array(
			'description' => 'Display a random recipe each day.',
		);
		parent::__construct( 'r_daily_recipe_widget', 'Recipe of the Day', $widget_ops );
	}

	/**
	 * Outputs the options form on admin
	 *
	 * @param array $instance The widget options
	 */

	public function form( $instance ) {
		// outputs the options form on admin
    $defualt = [ 'title' => 'Recipe of the day'];
    $instance = wp_parse_args((array) $instance, $defualt);
    ?>
<p>
  <label for="<?php echo $this->get_field_id('title'); ?>">Title: </label>
  <input type="text" class="widefat"
    id="<?php echo $this->get_field_id('title'); ?>"
    name="<?php echo $this->get_field_name('title'); ?>"
    value="<?php echo esc_attr( $instance['title']); ?>" />
</p>
<?php
	}

	/**
	 * Processing widget options on save
	 *
	 * @param array $new_instance The new options
	 * @param array $old_instance The previous options
	 *
	 * @return array
	 */

	public function update( $new_instance, $old_instance ) {
		// processes widget options to be saved
    $instance = [];
    $instance['title'] = strip_tags($new_instance['title']);
    // strip_tags($string): strip HTML and PHP tags from a string
    return $instance;
	}


	/**
	 * Outputs the content of the widget
	 *
	 * @param array $args
	 * @param array $instance
	 */

	public function widget( $args, $instance ) {
		// outputs the content of the widget
    echo 'recipe of the day';
	}
}
```

## Cron Jobs and Transients API

### Notes

- Cron jobs are automated taks that can perfom daily, monthly, etc.WordPress comes with it's own built-in task manager.
- It's important that you unscheduled you cron jobs after your plugin is deactivated or else a user's site might became bloated with unused code.
- The transients API allows you to store cached in the database. It allows you to set up an expiration time.
- The **widget()** method is passed in an **arg** array that contains values related to the theme's sidebr HTML. You can use this HTML to format your widget.

### Understainding Cron Jobs

- A cron job is a task or bit of code that runs at certain intervals.
- The intervals can be anything. Hourly, Daily, Monthly, etc.
- WordPress comes with its own built-in Cron Jobs.

### Transients API

- Temperarily caches your data.
- Similar to the options API.
- By default, transients are stored in the **wp_options** table.
- Can be overwritten.

### Storing Data in Memory

- Faster than storing it in the database.
- Is not persistent / can be lost if server turns off.

### recipe/index.php

```php
// register
nclude( 'includes/widgets/daily-recipe.php');
include( 'includes/cron.php');
include( 'includes/deactivate.php');
include( 'includes/utility.php');

// hooks
add_action( 'widgets_init', 'r_widgets_init' );
add_action( 'r_daily_recipe_hook', 'r_daily_generate_recipe' );
```

### includes/cron.php

```php
function r_daily_generate_recipe(){
  // cron job will run at the first traffic after scheduled time
  set_transient( 'r_daily_recipe', r_get_random_recipe, DAY_IN_SECONDS );
}
```

### includes/deactivate.php

```php
function r_deactivate_plugin(){
  wp_clear_scheduled_hook( 'r_daily_recipe_hook' );
}
```

### includes/utility.php

```php
function r_get_random_recipe(){
  global $wpdb;

  return $wpdb->get_var("SELECT `ID` from `" . $wpdb->posts . "`
    WHERE post_status='published' AND post_type='recipe'
    ORDER BY rand() LIMIT 1");
}
```

### includes/widgets/daily-recipe.php

```php
public function widget( $args, $instance ) {
		// outputs the content of the widget

		// extract($array): Import variables into the current symbol table from an array
    extract( $args );
    extract( $instance );

		$title = apply_filters( 'widget_title', $title );

		// from theme/includes/widgets
		echo $before_widget;
		echo $before_title . $title . $after_title;

		$recipe_id	= get_transient( 'r_daily_recipe' );

		if (!$recipe_id){
			$recipe_id = r_get_random_recipe();
			set_transient( 'r_daily_recipe', $recipe_id, DAY_IN_SECONDS );
		};

		?>

<div class="portfolio-image">
  <a href="<?php echo get_permalink( $recipe_id ); ?>">
    <?php echo get_the_post_thumbnail( $recipe_id, 'thumbnail' ); ?>
  </a>
</div>
<div class="portfolio-desc center nobottompadding">
  <h3>
    <a
      href="<?php echo get_permalink( $recipe_id ); ?>"><?php echo get_the_title( $recipe_id ); ?></a>
  </h3>
</div>

<?php

		echo $after_widget;
	}
```

## Creating a Shortcode for Frontend

### Notes

- Shortcodes allow you to add dynamic code into the editor that can be replaced with more code.
- The **wp_editor()** function will output the tinymce editor so you can use it in your plugins.
- It's important that you use an ID that only contain lowercase letters and no spaces/underscores.
- PHP output buffers help us grab content that would be otherwise outputted. Yuo can grab the cotent and store it in a variable for later use.

### Shortcodes

Pieces of text that will transform into dynamic HTML on the page

Blocks & Shortcodes

- Blocks are the recommended way of creating dynamic content.
- Shortcodes are still supported and relevant.
- Knowing how a shortcode works will help with projects that still use shortcodes.

### [The Shortcode API](https://codex.wordpress.org/Shortcode_API)

### [wp_editor](https://developer.wordpress.org/reference/functions/wp_editor/)

### recipe/index.php

```php
include( 'includes/shortcodes/creator.php')

// Shortcodes
add_shortcode('recipe_creator', 'r_recipe_creator_shortcode');
```

### includes/shortcodes/creator.php

```php
function r_recipe_creator_shortcode(){
  $creatorHTML = file_get_contents('creator-template.php', true);
  $editorHTML = r_generator_content_editor();
  $creatorHTML = str_replace( 'CONTENT_EDITOR', $editorHTML, $creatorHTML);
  return $creatorHTML;
}

function r_generator_content_editor(){
  ob_start(); // create buffer
  wp_editor('','recipecontenteditor');
  $editor_contents = ob_get_clean(); // store buffer & clean
  return $editor_contents;
}
```

### includes/shortcodes/creator-template.php

```php
<form>
  <div class="form-group">
    <label>Title</label>
    <input type="text" class="form-control" id="r_inputTitle">
  </div>
  <!-- <div class="form-group">
    <label>Content</label>
    <textarea class="form-control" id="recipecontenteditor"></textarea>
  </div> -->
  CONTENT_EDITOR
  <div class="form-group">
    <button type="submit" class="btn btn-primary">Submit Recipe</button>
  </div>
</form>
```

## Sanitizing HTML input and inserting a post

### Notes

- WordPress will load a javascript called **tinymce** which user can use to interact with it's advanced editor.
- You can filter HTML using the **wp_kse()** function. This function allows you set what tags, attributes and protocol are allowed.
- Alternatively, you can use the **wp_kses_post()** function to use the same settings WordPress uses for filtering it's posts.
- To intsert a post you need to call the **wp_insert_post()** function. Only the title and content are required, but you can set a plethora of opions to customize it.

### recipe/index.php

```php
// register
include( 'process/submit-user-recipe.php');

// hooks
add_action('wp_ajax_r_submit_user_recipe', 'r_submit_user_recipe');
add_action('wp_ajax_nopriv_r_submit_user_recipe', 'r_submit_user_recipe');
```

### process/submit-user-recipe.php

```php
function r_submit_user_recipe(){
  $output                         = [ 'status' => 1 ];

  if( empty($_POST['title']) ){
    wp_send_json( $output );
  }

  global $wpdb;
  $title                          =   sanitize_text_field( $_POST['title'] );
  $content                        =   wp_kses_post( $_POST['content'] );
  $recipe_data                    =   [];
  $recipe_data['rating']          =   0;
  $recipe_data['rating_count']    =   0;

  $post_id                        =   wp_insert_post([
    'post_content'                =>  $content,
    'post_name'                   =>  $title,
    'post_title'                  =>  $title,
    'post_status'                 =>  'pending',
    'post_type'                   =>  'recipe'
  ]);

  update_post_meta( $post_id, 'recipe_data', $recipe_data );

  $output['status']               =   2;
  wp_send_json($output);
}
```

### recipe/assets/js/main.js

```js
(function ($) {
  // form submition
  $("#recipe-form").on("submit", function (e) {
    e.preventDefault();

    $(this).hide();
    $("#recipe-status").html(
      '<div class="alert alert-info">Please wait! We are submitting your recipe.</div>'
    );

    var form = {
      action: "r_submit_user_recipe",
      title: $("#r_inputTitle").val(),
      content: tinymce.activeEditor.getContent(),
    };

    $.post(recipe_obj.ajax_url, form, function (data) {
      if (data.status == 2) {
        $("#recipe-status").html(
          '<div class="alert alert-success">Recipe submitted successfully!</div>'
        );
      } else {
        $("#recipe-status").html(
          '<div class="alert alert-danger">Unable to submit recipe. Please fill in all fields.</div>'
        );
        $("#recipe-form").show();
      }
    });
  });
})(jQuery);
```

## Custom Hooks with the Plugin API and sending E-mails

### Notes

- BBPress is a popular plugin that is extendable with even more plugins. It used the WordPress plugin API to do this.
- Call the **do_action()** function and pass it in a custom name to trigger a custom hook. WordPress will not throw any errors if the hook does not have any functions using it.
- Anonymous functions are special functions with no names. You can pass in anonymous functions to your hooks rather than passing in a string.
- The **wp_mail()** function will run the **mail** function except it'll call hooks to filter the data before sending out an email.

### [PluginAPI](https://codex.wordpress.org/Plugin_API)

### plugin/recipe/process/rate-recipe.php

```php
do_action( 'recipe_rated', [
    'post_id'   => $post_ID,
    'rating'    => $rating_count,
    'user_IP'   => $user_IP
]);
```

### plugin/email-recipe.php

```php
/**
 * Plugin Name: Recipe E-mail Rating
 * Description: This plugin extends the recipe plugin
 */

 // not work in local server
 add_action( 'recipe_rated', function($arr){
   $post  = get_post($arr['post_id']);
   $user_email  = get_the_author_meta('user_email', $post->post_author);
   $subject     ='Your recipe has received a new rating';
   $message = 'Your recipe ' . $post->post_title . ' has received a rating of ' . $arr['rating'] . '.';
   wp_mail( $user_email, $subject, $message );
 });
```

## Creating the Login & Registration Froms

### Notes

- Membership plugins can increase the value of your theme by including theme. Consifer intergreating one into your theme.
- Nonces (Numbers only once) are a way to create tokens that you can use to verify the credibility of a request.
- It's important that you manually authenticate the user if they're logging in for the first time. Using the **wp_signon** function bring back mixed results.
- Use the **is_wp_error()** function to verify if an object is a WordPress error object.

### index.php

```php
include( 'includes/shortcodes/auth-form.php');
add_shortcode('recipe_auth_form', 'r_recipe_auth_form_shortcode');
```

### auth-form.php

```php
function r_recipe_auth_form_shortcode(){
  $formHtml = file_get_contents('auth-form-template.php', true);
  $formHtml = str_replace( 'NONCE_FILED_PH', wp_nonce_field( 'recipe_auth', '_wpnonce', true, false ),
  $formHtml
);
  return $formHtml;
}
```

### auth-form-template.php

```php
NONCE_FILED_PH
<!--
  <input type="hidden" id="_wpnonce" name="_wpnonce" value="97d23c96ad">
  <input type="hidden" name="_wp_http_referer" value="/wp-udemy/my-account/?preview_id=147&amp;preview_nonce=09c025a87e&amp;preview=true">
-->

<div class="col_one_third nobottommargin">
  <div class="well well-lg nobottommargin">
    <div id="login-status"></div>
    <form id="login-form" class="nobottommargin">
    //
```

### main.js

```js
(function ($) {
  $(document).on("submit", "#register-form", function (e) {
    e.preventDefault();

    $("register-status").html(
      '<div class="alert alert-info">Please wait!</div>'
    );
    $(this).hide();

    var form = {
      _wpnonce: $("#_wpnonce").val(),
      action: "recipe_create_account",
      name: $("#register-form-name").val(),
      username: $("#register-form-username").val(),
      email: $("#register-form-email").val(),
      pass: $("#register-form-pass").val(),
      confirm_pass: $("#register-form-confirm_pass").val(),
    };

    $.post(recipe_obj.ajax_url, form).always(function (data) {
      if (data.status == 2) {
        if (data.status == 2) {
          $("#register-status").html(
            '<div class="alert alert-success">Account created!</div>'
          );
          location.href = recipe_obj.html_url;
        } else {
          $("#register-status").html(
            '<div class="alert alert-danger">Unable to create an account.</div>'
          );
          $("#register-form").show();
        }
      }
    });
  });
})(jQuery);
```

## User Registration

### Notes

- Be sure to check if user has registration turned on. This setting only applies to WordPress own registration form, but you should take advantage of it anyway.
- All options are stored inside the **options** table. Plugins and transients are also stored inside this table.
- It's always good practice to hild and display content depending if the user is logged in or not.

### index.js

```php
include( 'process/create-account.php');
add_action('wp_ajax_nopriv_recipe_create_account', 'recipe_create_account');
```

### create-account.php

```php
function recipe_create_account(){
  $output = ['status' => 1];
  $nonce = isset($_POST['_wpnonce']) ? $_POST['_wpnonce'] : '';

  if(!wp_verify_nonce( $nonce), 'recipe_auth' )){
    wp_send_json( $output );
  }

  if( !isset($_POST['username'], $_POST['email'], $_POST['pass'], $_POST['confirm_pass']) ){
    wp_send_json( $output );
  }

  $name = sanitize_text_field( $_POST['name'] );
  $username = sanitize_text_field( $_POST['username'] );
  $email = sanitize_email( $_POST['email'] );
  $pass = sanitize_text_field( $_POST['pass'] );
  $confirm_pass = sanitize_text_field( $_POST['confirm_pass'] );

  if(username_exists( $username ) || email_exists( $email ) || $pass != $confirm_pass || !is_email($email)){
    wp_send_json( $output );
  }

  $user_id = wp_insert_user([
    'user_login'    => $username,
    'user_pass'     => $pass,
    'user_email'    => $email,
    'user_nicename' => $name
  ]);

  if( is_wp_error($user_id)){
    wp_send_json($output);
  }

  wp_new_user_notification( $user_id, null, 'user' );

  $user = get_user_by( 'id', $user_id );
  wp_set_current_user( $user_id, $user->user_login );
  wp_set_auth_cookie( $user_id );
  do_action( 'wp_login', $user->user_login, $user);

  $output['status'] = 2;
  wp_send_json($output);
}
```

### enqueue.php

```php
wp_localize_script( 'r_main', 'recipe_obj', [
    'ajax_url'      =>  admin_url( 'admin-ajax.php' ),
    'home_url'      =>  home_url( '/' )
]);
```

## User Authentication

Use the **wp_signon()** function to authenticate a user with WordPress

### main.js

```js
$(document).on("submit", "#login-form", function (e) {
  e.preventDefault();
  $("#login-status").html(
    '<div class="alert alert-info">Please wait while we log you in.</div>'
  );
  $(this).hide();

  var form = {
    _wpnonce: $("#_wpnonce").val(),
    action: "recipe_user_login",
    username: $("#login-form-username").val(),
    pass: $("#login-form-password").val(),
  };

  $.post(recipe_obj.ajax_url, form).always(function (data) {
    if ((data.status = 2)) {
      $("#login-status").html(
        '<div class="alert alert-success">Success!</div>'
      );
      location.href;
    } else {
      $("#login-status").html(
        '<div class="alrt alrt-danger">Unable to login.</div>'
      );
      $("#login-form").show();
    }
  });
});
```

### index.pnp

```php
include('process/login.php');
add_action('wp_ajax_nopriv_recipe_user_login', 'recipe_user_login');
```

### process/login.php

```php
function recipe_user_login(){
  $output = ['status' => 1];
  $nonce = isset($_POST['_wpnonce']) ? $_POST['_wpnonce'] : '';

  if(!wp_verify_nonce( $nonce), 'recipe_auth' )){
    wp_send_json( $output );
  }

  if( !isset($_POST['username'], $_POST['pass']) ){
    wp_send_json( $output );
  }

  $user = wp_signon([
    'user_login'  => sanitize_text_field($_POST['username']),
    'user_password' => sanitize_text_field($_POST['pass']),
    'remember'  => true
  ], false);

  if(is_wp_error($user)){
    wp_send_json($output);
  }

  $output['status'] = 2;
  wp_send_json($output);
}
```

### auth-form-templage.php

```php
<div class="col_tow_third col_last nobottommargin" SHOW_REG_FORM>
/**/
</div>
```

## auth-form.php

users_can_register

- 0: close
- 1: open

```php
function r_recipe_auth_form_shortcode(){

  if(is_user_logged_in()){
    return '';
  }

  $formHTML = str_replace(
    'SHOW_REF_FORM', (!get_option('users_can_register') ? 'style="display:none"' : ''), $formHTML
  );
}
```

## Alternative User Authentication

### [wp_login_form()](https://developer.wordpress.org/reference/functions/wp_login_form/)

- WordPress provides a way to log users in that you're allowed to extend or override.
- It's good practice to find the hooks that WordPress uses and understand how WordPress functions. This gives you the opportunity to hook perfectly into the system to do what you desire.
- The **wp_loginform()** function will generate the form for logging a user in for you. It'll also set up any additional fileds WordPress will need to properly authenticate a user.

## Adding a Logout Link

### [wp_loginout](https://developer.wordpress.org/reference/functions/wp_loginout/)

All menus can have dynamic menu items created using hooks. Use the **wp_nav_menu_items** hook to do just that.

## Prepared Database Queries

The **wpdb** object has a **prepare** method that will sanitize queries. This is a great way to prevent SQL injections.

The **prepare** method has a similar functionality to PHP's PDO prepare statement or MySQL's prepare method.

```php
$rating_count = $wpdb->get_var($wpdb->prepare(
  "SELECT COUNT(*) FROM `" . $wpdb->prefix . "recipe_ratings`
  WHERE recipe_id=%d AND user_ip=%s", $post->ID, $user_IP
))
```

## Uninstalling a Plugin

WordPress provides 2 ways to hook into when a plugin is uninstalled from your site. The recommended way is to create a **unintall.php** file that will handle the uninstallation.

It's good practice to check if WordPress is the one calling the **uninstall.php** file and not some outside user.

It's good practice to clean up after yourself so a user doesn't have a bloated site which can potentially lead to performance and security issues.

```php
if( !defined( 'WP_UNINSTALL_PLUGIN' ) ){
  exit;
}

global $wpdb;
$wpdb->query("DROP TABLE IF EXISTS `" . $wpdb->prefix . "recipe_ratings`");
```

## Creating a WordPress Dashbord Widget

Wordpress admin dashboard widhets allow you to give web owners a glance at what's going on with your plugin. You can also use a dashboard widget to display news related to your plugin or software.

Call the **wp_add_dashboard_widget()** function to create a dashboard widget.

```php
function  r_dashboard_widgets(){
  wp_add_dashboard_widget(
    'r_latest_recipe_rating_widget',
    'Latest Recipe Ratings',
    'r_latest_recipe_rating_display'
  )
}

function r_latest_recipe_rating_display(){
  global $wpdb;
  $latest_ratings = $wpdb->get_results(
    "SELECT * FROM `" . $wpdb->prefix . "recipe_ratings` ORDER BY `ID` DESC LIMIT 5"
  );

  echo '<ul>';

  foreach ($latest_ratings as $rating){
    $title = get_the_title( $rating->recipe_id );
    $permalink = get_the_permalink( $rating->recipe_id );
    ?>
    <li>
      <a href="<?php echo $permalink; ?>"><?php echo $title; ?></a>
      received a rating of <?php echo $rating->rating; ?>
    </li>
    <?php
  }

  echo '</ul>';
}

add_action('wp_dashboard_setup', 'r_dashboard_widgets');
```

## Using the HTTP API to retrieve content from external services

[HTTP API](https://developer.wordpress.org/plugins/http-api/)

There are various methods and functions for retrieving content outside of your site. Some hosts will disable/enable these methods

Rather than checking width method is available, you can use the HTTP API to let WordPress decide which method is best and available

WordPress will return the results of most requests as an array with various pirces of information about the response.

A lot of this information can be parsed for you using a set of utility functions provided by WordPress.

### filter-content.php

```php
global $post, $wpdb;
$recipe_data = get_post_meta( $post->ID, 'recipe_data', true);
$recipe_tpl_res = wp_remote_get(
  plugin_url('process/recipe-template.php', RECIPE_PLUGIN_URL);
);
```

## Flushing the Rewrite Rules with the Rewrite API

The rewrite API is can potentially break your site if you are not careful

WordPress uses the **htaccess** file to help generate SEO friendly URLs

You need to flush the rule every time you plan on creating new rewrite rules. You can do this manually by updating the permalink settings or call the function **flush_rewrite_rules()**

### [Rewrite_API](https://codex.wordpress.org/Rewrite_API)

### [htaccess](https://wordpress.org/support/article/htaccess/)

## Shortcodes Explored In-Delpth

Shortcodes can have attributes just like HTML elements. You can use these attributes to generate a more dynamic shortcode.

Attributes are optional so be sure to have some default values. You can use the **shortcode_atts()** function to filter the values.

Shortcode can also be closed. Users can pass content in between and you can accept that as the second parameter to your shortcode function.

editor

```
[twitter_follow handle=""]follw me[/twitter_follow]
```

index.php

```php
add_shortcode('twitter_follow', 'r_twitter_follow_shortcode');
```

twitter-follow.php

```php
function r_twitter_follow_shortcode( $atts, $content = null){
  $atts = shortcode_atts([
    'handle' => 'udemy'
  ], $atts);

  return '<a href="https:/twitter.com/' . $atts['handle'] . '"
    class="" target=""><i class=""></i>' . do_shortcode($content) . '
    </a>';
}
```

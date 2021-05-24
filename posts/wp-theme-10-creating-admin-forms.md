---
title: "WP Theme - 10 Creating Admin Forms"
date: "2021-05-24"
---

# 10 Creating Admin Forms

## WordPress APIs

WordPress provides many APIs out of the box. APIs allow you to interact with WordPress easily without having to write a lot of the logic and queries your self.

You're already learned how to use most of the APIs throughout this course. There are some APIs we won't be going over as thet aren't commonly used.

## Options API

The options API allows you to store settings and options for your theme/plugin. WordPress use this API for it's own settings.

It's perfectly fine to create your own table as we did in the previous lecture. However, the APIs are meant to keep database fairly minimal and easy to manage. So consider using an API before creating table.

Make sure to check if certain options exist before creating it.

### activate.php

```php
$recipe_opts = get_option('r_opts');

if($recipe_opts){
  $opts = [
    'reating_login_required' => 1,
    'recipe_submission_login_required' => 1
  ];
  add_option('r_opts', $ops);
}
```

## Adding an Admin Menu and Page

The hook to add ad admin menu is **admin_menu** hook. It's important you do not run this hook inside a function using the **admin_init** hook.

Capabilities determine what a user can or can't do. Roles are a way to group capabilities together. It's important that you check a user's capabilities rather than a role as capabilities can be changed within a role.

WordPress provides a class called **wrap** which helps position the content of your admin page.

### index.php

```php
add_action('admin_menu', 'r_admin_menus');
// must not be plaged in an admin_init action fucntion
// admin_menu -> admin_init
```

### admin/menus.php

```php
function r_admin_menu(){
add_menu_page(
  'Recipe Options', // $page_title
  'Recipe Options',  // $menu_title
  'edit_theme_options', // $capability
  'r_plugin_opts', // $menu_slug
  'r_plugin_opts_page' // $callback
  );
}
```

### admin/options-page.php

```php
function r_plugin_opts_page(){
?>

<div class="wrap">
  <h3><?php _e('Recipe Settings', 'recipe'); ?></h3>
  <form method="POST" action="admin-post.php">
  <input type="hidden" name="action" value="r_save_options"> // for security
    <?php wp_nonce_field('r_options_verify'); ?> // for security
    <label><?php _e('User login required for rating recipes', 'recipe'); ?></label>
    <select class="form-control" name="r_rating_login_required">
      <option value="1">No</option>
      <option value="2">Yes</option>
    </select>
    <button type="submit"><?php _e('Update', 'recipe'); ?></button>
  </form>
</div>

  <?php
}
```

### admin/init.php

```php
function recipe_admin_init(){
  include('enqueue.php');

  add_action('admin_enqueue_scripts', 'r_admin_enqueue');
}
```

### admin/enqueue.php

```php
function r_admin_enqueue(){
  if( !isset($_GET['page']) || $_GET['page'] != "r_plugin_opts" ){
    return;
  }
  wp_register_style('r_bootstrap', plugins_url('/assets/css/bootstrap.css'), RECIPE_PLUGIN_URL) );
  wp_enqueue_style('r_bootstrap');
}
```

## Processing Admin Form Settings

The **admin_post** is a dynamic hook. The name of the action from a request will be appendended to the hook to determine what function will run.

It's always good practice to check the capability of a user before executing any more code. You can check a user capability by using the function **current_user_can()**.

You can redirect a user using the **wp_redirect()** function which accepts a URL

### `admin_post_{$action}`

options-page.php: `<input type="hidden" name="action" value="r_save_options">`

### admin/init/php

```php
add_action("admin_post_r_save_options", "r_save_options" );
```

### process/save-options.php

```php
function r_save_options(){
  // testing
  // echo "<pre>";
  // print_r($_POST);
  // echo "</pre>";
  // exit;

  if(current_user_can('edit_theme_options'){
    wp_die(__('You are not allowed to be on this page.', 'recipe'));
  })

  check_admin_referer("r_options_verify");

  $recipe_opts = get_option('r_opts');
  $recipe_opts['rating_login_required'] = absint($_POST['r_rating_login_required']);
  $recipe_opts['recipe_submission_login_required'] = absint($_POST['r_recipe_submission_login_required']);

  update_option('r_opts', $recipe_opts);
  wp_redirect(admin_url('admin.php?page=r_plugin_opts&status=1'));
}
```

### options-page.php

```php
<?php
function r_plugin_opts_page(){
  // for selected option
  $recipe_opts = get_option('r_opts');
  ?>
  // for message
  <?php
    if(isset($_GET['status']) && $_GET['status'] == 1){
      ?><div class="alert alert-success">Options updated successfully!</div>
      <?php
    }
  ?>
  <select>
    <option value="2"
      <?php echo $recipe_opts['rating_login_required'] === 2 ? 'SELECTED' : '' ?>
    >Yes</option>
  </select>
  <?php
}
```

## Settings API

The settings API will generate a from, process that form, and update your options for you. It's the preferred solution for developers who prefer to use pure PHP.

The setting API is completely optional to use. You care more than free and allowed to create your own UI and process your own data. There is no wrong or right answer here.

The settings API has about 3 layers. The first layer is the page. The second layer would be the sections related to a page. The third layer would be the input fields for a section.

### options-page.php

```php
// custom
// <form action="admin-post.php" method="POST">

// using settings api
<form action="options.php" method="POST">
<?php
  setting_fields('r_ops_group');
  do_settings_sections('r_opts_sections');
  submit_button();
?>
</form>
```

### settings-api.php

```php
function r_settings_api(){
  register_setting('r_opts_group', 'r_opts', 'r_opts_sanitize');
  add_settings_section(
    'recipe_settings',
    'Recipe Settings',
    'r_settings_section',
    'r_opts_section'
  );

  add_settings_field(
    'rating_login_required',
    'User login required for rating recipes',
    'rating_login_required_input_cb',
    'r_opts_sections',
    'recipe_settings'
  )
}

function r_settings_section(){
  echo '<p>You can change the recipe settings here.</p>';
}

function rating_login_required_input_cb(){
  $recipe_opts  = get_option('r_opts');
  ?>
  <select id="rating_login_required" name="r_opts[rating_login_required]">
    <option value="2"
      <?php echo $recipe_opts['rating_login_required'] === 2 ? 'SELECTED' : '' ?>
    >Yes</option>
  </select>
  <?php
}

function r_opts_sanitize( $input ){
  $input['rating_login_required'] = absint( $input['rating_login_required']);
  $input['recipe_submission_login_required'] = absint( $input['recipe_submission_login_required']);
  return $input;
}

```

## Featured Images using the WordPress Media Uploader

WordPRess provides an object called **wp** which provides a set of methods and properties for interacting with WordPress with JavaScript.

The WordPress media upload will handle uploading images while also providing a simple UI for browsing and selecting an image.

To associate an image with a post you need to use a function called **set_post_thumbnail()**

사용자가 로그인 한 경우에만 레시피를 제출할 수 있도록 설정

### rate_recipe.php

```php
$recipe_option = get_option('r_opts');
if(!is_user_logged_in() && $recipe_option['rating_login_required'] == 2){
  wp_send_json($output);
}
```

### creator.php

```php
function r_recipe_creator_shortcode(){
  $recipe_option = get_option('r_opts');
  if(!is_user_logged_in() && $recipe_option['rating_login_required'] == 2){
  return 'You must be logged in to submit a recipe.'
  }
}
```

media upload

### front/enqueue.php

```php
function r_enqueue_scripts(){
  wp_enqueue_media();

}
```

### creator-template.php

```php
<div id="recipe-status"></div>
<form id="recipe-form">
  <div class="form-group">
    <label>Title</label>
    <input type="text" class="form-control" id="r_inputTitle">
  </div>
  CONTENT_EDITTOR
  <hr>
  <div class="gorm-group">
    <label>Featured Image <a href="#" id="recipe-img-upload-button">Upload</a></label>
    <br>
    <img id="recipe-img-preview">
    <input type="hidden" id="r_inputImgID">
  </div>
  <div class="form-group">
    <button type="submit" class="btn btn-primary">Submit Recipe</button>
  </div>
</form>
```

### assets/js/main.js

```js
var featured_frame = wp.media([
  title: 'Select or Upload Media',
  button: {
    text: 'Use this media'
  },
  multiple: false
]);

featured_frame.on('select', function(){
  var attachment = featured_frame.state().get('selection').first().toJSON();
  $('#recipe-img-preview').attr('src', attachment.url);
  $('#r_inputImgID').val(attachment.id);
})

$(document).on('click', '#recipe-img-upload-btn', function(e){
  e.preventDefault();
  featured_frame.open();
})

$('#recipe-form').on('submit', function(e){
  var form = {
    attachment_id: $('#r_inputImgID').val()
  }
})

```

### subtmit-user-recipe.php

```php
if(isset($_POST['attachment_id'] && !empty($_POST['attachment_id'])){
  require_once( ABSPATH . 'wp-admin/includes/image.php' );
  set_post_thumbnail( $post_id, absint($_POST['attachment_id']));
})
```

### [Data Validation](https://codex.wordpress.org/Data_Validation)

## Custom User Roles and Capabilities

Roles are a way to group capabilities for a user. A capability determines what a user can or can't do.

Creating a role is very simple. You just call the **add_role()** function and pass in an array of capabilities you'd like a user to have.

To set the default role you need to go to the admin dashboard and navigation to **Settings > General**. From there you can set the default role for new users.

새로 가입한 사용자(Subscriber)는 read 권한만 가지고 있다. 새로운 등급 'recipe author'을 만들어 미디어를 업로드 하는 권한을 가지도록 한다.

### activate.php

```php
global $wp_roles;
add_role(
  'recipe author',
  __('Recipe Author', 'recipe'),
  [
    'read' => true,
    'edit_posts' => true,
    'upload_files' => true
  ]
);
```

## Custom Taxonomies

Taxonimies are a way to associate words or phrases with a single post

Each individual word or phrase is what WordPress calls a term

Taxonimies are a very simple concept, but they're very complex in design

### init.php

```php
function recipe_init(){
  register_taxonomy('origin', 'recipe', [
    'label' => __('Origin', 'recipe'),
    'rewrite' => ['slug' => 'origin' ],
    'show_in_rest' => true
  ])
}
```

## Custom Taxonomy Settings

Taxonomies can have meta data and be extended. There are 2 forms you need to account for which are the add and edit forms

The **wp_get_post_terms()** function will get the terms for a particular post and taxonomy.

### index.php

```php
// include/admin/origin-fileds
function r_origin_add_form_filed(){
  ?>
  <div class="form-field">
    <label><?php _e('More Info URL', 'recipe'); ?></label>
    <input type="text" name="r_more_info_url">
    <p class="description">
      <?php
        esc_html_e('A URL a user can click to learn more information about this origin.', 'recipe');
      ?>
    </p>
  </div>
  <?php
}

function r_origin_add_form_filed( $term ){
  $url = get_term_meta( $term->term_id, "more_info_url", true);
  ?>
    <tr class="form-field">
      <th scope="row" valign="top"><label><?php esc_html_e("More Info URL", 'recipe'); ?></label></th>
      <td>
        <input type="text" name="r_more_info_url" value="<?php echo esc_attr( $url ); ?>">
        <p class="description">
          <?php
            esc_html_e( 'A URL a user can click to learn more information about this origin.', 'recipe');
          ?>
    </tr>
  <?php
}

// process/save-origin
function r_save_origin_meta(){
  if(!isset($_POST['r_more_info_url'])){
    return;
  }
  update_term_meta($temr_id, 'more_info_url', esc_url($_POST['r_more_info_url']));
}

add_action('origin_add_form_fileds', 'r_origin_add_form_filed');
add_action('origin_edit_form_fields', 'r_origin_edit_form_field');
add_action('create_origin', 'r_save_origin_meta');
add_action('edited_origin', 'r_save_origin_meta');
```

### recipe-template.php

```html
<li><strong>ORININ_I18N: </strong> ORIGIN_PH MORE_INFO_URL_PH</li>
```

### filter-content.php

```php
$origin = wp_get_post_term($post->ID, 'origin');
$more_info_url = isset($origin[0]) ? get_term_meta($origin[0]->term_id, 'more_info_url', true);


$recipe_html = str_replace("ORIGIN_I18N", __("Origin", "recipe"), $recipe_html );
$recipe_html = str_replace("ORIGIN_PH", isset($origin[0]) ? $origin[0]->name : 'None' , $recipe_html );

if( !empty($more_info_url) ){
  $recipe_html = str_replace(
    "MORE_INFO_URL_PH", '<a href="' . $more_info_url . '">More Info</a>"', $recipe_html
  );
}else{
  $recip_html = str_replace("MORE_INFO_URL_PH", '', $recipe_html);
}

```

## Custom Post Type UI and Advanced Custom Fields

The custom post type UI plugin will help you with generating custom post types and taxanomies without having to write a single line of code.

The ACF (Advanced Custom Fields) plugin will help you generate custom fields for certain post types. It can even create fields that aren't normally possible with plain HTML

You're not limited to one option or the other. You can combine your knowledge with these plugins to rapidly build plugins/themes. These plugins use the same APIs and functions you would use.

### [CPY UI](https://wordpress.org/plugins/custom-post-type-ui/)

### [ACF](https://wordpress.org/plugins/acf-extended/)

### [Generate WP](https://generatewp.com/)

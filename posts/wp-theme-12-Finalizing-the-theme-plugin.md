---
title: "WP Theme - 12 Finalizing the theme & plugin"
date: "2021-05-24"
---

# 12 Finalizing the theme & plugin

## Custom Excerpts

WordPress defines a set of functions that you can use it your own themes abd plugins. You can check theme out in the **wp-includes/functions.php**

functions.php

```php
add_filter('exceprt_more', '__return_false' );
```

## Custom Author Fields and Avartars

WordPress provides 2 sets of hooks for editing and updating the user profiles. One set is for the user ot update their own profiles and anotehr set to allow users to modify other profiles

The URL must be a live HTTP URL for avartars. Otherwise you will not be able to use custom avartars

```php

// includes/admin/author-fields.php
function ju_custom_user_profile_fields(){
  ?>
    <table class="form-table">
      <tr>
        <th>
          <label for="ju_twitter"><?php _e('Twitter', 'udemy'); ?></label>
        </th>
        <td>
          <input
            type="text"
            name="ju_twitter"
            id="ju_twitter"
            class="regular-text"
            value="<?php echo esc_attr(get_the_author_meta('ju_twitter', $user->ID )); ?>"
          />
        </td>
      </tr>
  <?php
}

function ju_save_extra_profile_fileds($user_id){
  if(!current_user_can('edit_user')){
    return false;
  }
  update_user_meta( $user_id, 'ju_twitter', $_POST['ju_twitter']);
}

add_action('show_user_profile', 'ju_custom_user_profile_fields');
add_action('edit_user_profile', 'ju_custom_user_profile_fields');
add_action('personal_options_update', 'ju_save_extra_profile_fileds');
add_action('edit_user_profile_update', 'ju_save_extra_profile_fileds');
?>
```

### single.php

```php
$twitter = get_the_author_meta('ju_twitter', $author_ID);

<?php
  if( $twitter ){
    ?>
      <p>
        Twitter: @<a href="https://twitter.com/<?php echo $twitter; ?>"><?php echo $twitter; ?>
      </p>
    <?php
  }

?>
```

Custome Avartar

### functions.php

```php
// includes/avatart.php
function ju_new_avartar($defaults){
  $avartar_url = 'https://.../';
  $defaults[$avartar_url] = 'Default Udemy Avartar';
  return $defaults;
}

add_action('avartar_defualts', 'ju_new_avartar');
```

### plugin [wordpress-admin-style](https://github.com/bueltge/wordpress-admin-style)

## Image Cropping

An image that is soft cropped will be cropped to a specific dimension. However, if the image ratio can't be kept intact, then WordPress will try it's best to crop the image to the size you specified.

An image that is hard cropped will be cropped to an exact dimension. If the ratio can't be kept intact, WordPress will cut thr image so the size desired will be used.

If you decide to hard crop, then you have the ability to crop the image from certain position like the center or top right corner.

It's important that you regenerate all the thumbnails on an existing site because not all existing images will be resized.

하드 크롭: 정해진 사이즈에 맞게 자른다. (cover)

소프트 크롭: 정해진 사이즈에 들어가도록 자른다. (contain)

### [Guide to Cropping Thumbnails in WordPress](https://havecamerawilltravel.com/photographer/wordpress-thumbnail-crop/)

### [add_image_size](https://developer.wordpress.org/reference/functions/add_image_size/)

### setup.php

```php
function ju_setup_theme(){
  add_image_size('ju-post-image', 860, 575, false); // softcrop
}
```

### content-excerpt.php

```php
<div class="entry-image">
  <a href="<?php the_permalink(); ?>">
    <?php
    the_post_thumbnail('ju-post-image', [
      'class' => 'image_fade'
    ]);
    ?>
  </a>
</div>
```

### sinlge.php

```php
<div class="entry-image">
  <a href="<?php the_permalink(); ?>">
    <?php
    the_post_thumbnail('ju-post-image');
    ?>
  </a>
</div>
```

새로 이미지를 등록 할 때만, 리사이즈 된다.

plugin / Regenerate Thumbnails을 사용해서 기존 이미지의 사이즈를 변경한다.

### [Regenerate Thumbnails](https://wordpress.org/plugins/regenerate-thumbnails/)

## Main Query Home Page Modifications

You are allowed to modify the main query using a hook. The **WP_Query** class has a method called **set()** which allows you do to this.

Keep in mind that the hook will be applied to all pages and not just the home page. Make sure to perform checks to see what page you're currently on.

The **query_posts()** function will also allow you to modify the main query, but it's highly recommended you don't use it.

### functions.php

```php
// includes/home-query.php
function ju_modify_home_page_query( $query ){
  if( $query->is_home() && $query->is_main_query() ){
    $query->set( 'post_type', ['post', 'recipe']);
  }
}

add_action('pre_get_posts', 'ju_modify_home_page_query');
```

## Admin Notices

Admin notices are messages that appear on the top of every page to provide more information about anything you want.

Admin notices must be manage by you. You must take care of displaying them and removing theme

You can use the **notice** class to make your notice fit properly on the page. There are various other classes for changing the color.

Use JavaScript to listen for click events on the exit button to help determine if the notice shoud be removed or not.

### index.php

```php
// includes/notice.php
function r_admin_notices(){
  if(!get_option( 'r_peniing_recipe_notice' )){
    return;
  }
?>
  <div class="notice notice-warning is-dismissible" id="r-recipe-pending-notice">
    <p><?php _e('You have a couple of recipes waiting to be reviewed', 'recipe'); ?></p>
  </div>
<?php
}

add_action('admin_notices', 'r_admin_notices');
```

options

- notice-info = blue
- notice-success = green
- notice-warming = yellow
- notice-error = red

### process/subtmit-user-recipe.php

```php
// Update Recipe Pending Notice
$pending_recipe_count = $wpdb->get_var(
  "SELECT COUNT(*) FROM `" . $wpdb->posts . "`
  WHERE post_status='pending' AND post_type = 'recipe'"
);

if( $pending_recipe_count >= 5 ){
  update_option( 'r_pending_recipe_notice', 1);
}
```

### assets/js/admin-global.js

```js
(function ($) {
  $(document).on(
    "click",
    "#r-recipe-pening-notice .notice-dismiss",
    function (e) {
      e.preventDefault();
      $.post(ajaxurl, {
        action: "r_dismiss_pending_recipe_notice",
      });
    }
  );
})(jQuery);
```

### index.php

```php
// process/remove-notice.php
function r_dismiss_pending_recipe_notice(){
  update_option( 'r_pending_recipe_notice', 0);
}

add_action('wp_ajax_r_dismiss_pending_recipe_notice', 'wp_ajax_r_dismiss_pending_recipe_notice');
```

## Debugging Hooks, Queries and using Tools

There are many tools and techniques to debugging WordPress. Most of it is just preference

WordPress still store all hooks and their functions indixe the **wp_filter** global variables.

All queries are stored inside the **wpdb->queries** property. Only queries that have been executed will be stored.

The **Query Monitor** plugin will keep track of all queries, hooks, scripts, styles, requests and many more things for you.

### [Debugging](https://wordpress.org/support/article/debugging-in-wordpress/)

### [Query Monitor](https://wordpress.org/plugins/query-monitor/)

### index.php

```php
global $wp_filter;
echo <pre>;
var_dump( $wp_filter['wp_footer'] );
// var_dump( $wp_filter ); // output more info
// print_r( $wp_filter ); // more readable
echo </pre>;
```

### wp-config.php

```php
define('WP_DEBUG', true);
define('SAVEQUERIES', true);
```

### index.php

실행 되는 모든 쿼리가 출력 된다.

```php
global $wp_filter, $wpdb;
echo <pre>;
print_r( $wpdb->queires );
echo </pre>;
```

## Securing the wp-config file

WordPress will look for the config file inside the root installtion or up one directory. It's recommended you move it up one directory on a production server for extra security

## SEO, Schema and Microdata

Microdata are attributes that you can apply to your elements to tell bots/crawlers more about the content it's look at.

You are allowed to have types nested within each other. All types are children of the type **Thing**

You can test your microdata using the structured data testing tool provided by Google. This tool will give you insight on what google sees.

### [schema.org](https://schema.org/)

### [Google Structured Data Testing Tool(https://search.google.com/structured-data/testing-tool)

### Microdata

Microdata is just a fancy word for a few set of specific HTML attributes that specify what kind of content a bot or crawler is veiwing.

### Schema Properties

- Itemscope: Tells bots and crawlers that the HTML element contains important information
- Itemtype: a URL that provides more information about the kind of content to expect
- Itemprop: How a particular piece of information relates to the itemtype

### header.php

```php
<body itemscope itemtype="https://schema.org/WebPage" >
...
</body>
```

### single.php

```php
<div class="author-box" itemscope itemtype="https://schema.org/Person">
  <strong>Posted by<a href="" itemprop="name">..</a></strong>
</div>
```

## RTL Support

RTL stands for right-to-left. There are languages that read and written like this.

It's optional to add support for these languagages. You only need to check if the site is set to RTL using the **is_rtl()** function. If it is, then you'll need to use CSS to make everything appear RTL.

### enqueue.php

```php
if(is_rtl()){
  wp_enqueue_style('ju_bootstrap_rtl');
  wp_enqueue_style('ju_style_rtl');
  wp_enqueue_style('ju_dart_rtl');
  wp_enqueue_style('ju_font_icons_rtl');
  wp_enqueue_style('ju_responsive_rtl');
}

```

## Accesibility

Disabilities can be put into 4 categories which are visual, hearingm motor and cognitive.

HTML5 has a feature called ARIA. It's short for **accessible rich internet applications.** This will help make your theme/plugin more accessible.

The **aria-label** attribute will help make someone with a disability understand what that element does. Some elements don't need this as they have their own attributes for this sort of thing.

The **role** attribute allows you to describe a section on the page such as the content or footer

### [ARIA in HTML](https://www.w3.org/TR/html-aria/)

### Example

```html
<button type="submit" aria-label="Search"><i class="icon-search"></i></button>

<form role="search" method="get" class="search-form">...</form>

<!-- header -->
<header role="banner"></header>

<!-- only one main content -->
<div role="main"></div>

<!-- sidebar -->
<div role="complementary"></div>

<!-- footer -->
<footer role="contentinfo"></footer>
```

### [Accesibility Testing](https://wave.webaim.org/)

## Child Themes

Child themes allow you to modify a theme without having to modify the parent theme files. Your code will be safe from being overwritten as well.

To create a child theme you need to set the **Templage** property to the parent theme folder.

It's important that you correctly load both parent and child theme CSS files

### Structure

- mh-magazine-lite
- mh-magazine-lite-child
  - functions.php
  - style.css
  - screenshot.png

### functions.php

```php
<?php
add_action('wp_enqueue_scripts', function(){
  wp_register_style('parent_css', get_template_directory_uri() . 'style.css');
  wp_register_style('child_css', get_stylesheet_uri() );

  wp_enqueue_style('parent_css');
  wp_enqueue_style('child_css');
})
?>
```

### style.css

```css
/*
  Theme Name: MH Magazine lite Child Theme
  Template: mh-magazine-lite
*/
```

## Translation

The process for translating a plugin/theme is called internationalization. WordPress utilizes the GetText PHP extention for translation strings.

Translating WordPress can be time consuming. It's recommended you use a program like Po edit or Loco translate.

The **pot** file is template file translator can use as a start. The **po** file is the actual language file that will be compiled into **mo** file. The **mo** file is a server readable only file that contains all your translations.

### [Internationalization](https://developer.wordpress.org/themes/functionality/internationalization/)

### [Loco Translate](https://wordpress.org/plugins/loco-translate/)

### [poedit](https://poedit.net/)

### translation functions

```php
__('Returns a translated string', 'udemy');
_e('Outputs a translated string', 'udemy');
_x('Bass', 'Instrument', 'udemy');
_n('Singular Form', 'Plural From', 1, 'udemy'); // Singular
_n('Singular Form', 'Plural From', 2, 'udemy'); // Plural
_ex('Bass', 'Instrument', 'udemy');
_nx('Singular Form', 'Plural From', 2, 'Instrument', 'udemy');)

// HIGHTLY recommended translation function
esc_html__('Returns an escaped translated string', 'udemy');
esc_html_e('Outputs an escaped translated string', 'udemy');
esc_html_x('Bass (Escapted)', 'Fish', 'udemy');
wp_kses_post(__('Unescaped translated string', 'udemy'));
```

### index.php

```php
// includes/textdomain
function r_load_textdomain(){
  $plugin_dir = 'recipe/dir';
  load_plugin_textdomain('recipe', false, $plugin_dir);
}


add_sction('plugin_loaded', 'r_load_textdomain');
```

## Bundding Plugins with TGMPA

The TGM plugin activation class will help you with creating a UI and keeping track of what plugins the user should install

Plugins can come from anywhere. They can be hosted from WordPress or come bundled with your theme.

### [TGM Plugin Activation](http://tgmpluginactivation.com/)

libs/includes/class-tgm-plugin-activation.php

### functions.php

```php
// inlcudes/libs/register-plugins.php
function ju_register_required_plugins(){
  $plugins = [
    [
      'name' => 'Adsense WP Quads',
      'slug' =>'quick-adsense-reloaded',
      'required' => false
    ],
    [
      'name' => 'BuddyPress',
      'slug' =>'buddypress',
      'required' => false
    ],
    [
      'name' => 'Regenerate Thumbnails',
      'slug' =>'regenerate-thumbnails',
      'required' => false
    ],
    [
      'name' => 'recipe',
      'slug' => 'recipe',
      'source' => get_template_directory() . '/plugins/recipe.zip'
    ]
  ];

  $config = [
    'id' => 'udemy',
    'menu' => 'tgmpa-install-plugins',
    'parent-slug' => 'themes.php',
    'capability' => 'edit_them_options',
    'has_notices' => true,
    'dismissalbe' => true
  ];

  thmpa( $plugins, $config );
}

require_once( get_theme_file_path('/includes/libs/class-tgm-plugin-activation.php') );
add_action( 'thmaps_register', 'ju_register_required_plugins' );
```

## Licensing & Making money with your Plugin/Theme

### underscores

### understrap

### sage

### genesis framework

### canvas

## Theme Starter Alternatives

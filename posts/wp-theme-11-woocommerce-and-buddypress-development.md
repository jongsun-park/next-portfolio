---
title: "WP Theme - 11 WoCcommerce And Buddypress Development"
date: "2021-05-24"
---

# 11 WoCcommerce And Buddypress Development

## Overview

By default, all plugins and themes should be compatible with each other if they both adhere to the WordPress coding standards.

BuddyPress is a plugin that will convert your site into social network. (Profiles, Notifications, Groups, etc)

WooCommerce is a plugin that will convert your site in a store. (Payment Processing, Billing, Inventory Tracking, etc)

Be prepared to start switching from plugin to theme through the rest of this course.

## Getting Started with BuddyPress Theme Development

BuddyPress will automatically create pages and generate the content for you without having to configure a lot of its settings

BuddyPress uses the template hierachy system and builds on top of it for its own pages. The **buddypress.php** is considered the base template for all pages

To prevent your folder from getting cluttered with files; BuddyPress will store 99% of it's templates and template parts inside a folder structure.

### [BuddyPress Template Hierarchy](https://codex.buddypress.org/themes/theme-compatibility-1-7/template-hierarchy/)

### udemy/buddypress.php

```php
<?php get_header(); ?>

<section id="content">
  <div class="content-wrap">
    <div class="content clearfix">
      <?php
        while(have_posts()){
          the_post();
          the_content();
        }
      ?>
    </div>
  </div>
</section>

<?php get_footer(); ?>
```

### udemy/buddypress/members/single/index.php

```php
<?php
get_header();

while(have_posts()){
  the_post();
  the_content();
}

get_footer();
```

### BuddyPress Singgle Member Pages

BuddyPress will search for a template part inside your theme's folder. If it doesn't find a file, then it'll search for that template inside its own plugin folder.

You may be tempted to move every template inside your own theme folder, but this can make things complex and hard to manage. It's better to only include the files you plan on overwriting.

BuddyPress doesn't provide much information on the templates besided the basics. You'll have to study the HTML and PHP code to understand what each template does.

After finding the correct templates, you can then move them into your theme folder to the respective directory. You're free to modify the templates however you wish.

## BuddyPress Single Member Custom Profile Tabs

BuddyPress allows yo uto add user profile tabs and display your own content

There is a template specifically made for plugins to display their content. It calls important functions and hooks, so you don't have to.

If possible, you should take advantage of using action hooks rather than overriding templates, so you have less code to manage in the long run.

You can use ""The loop\*\* inside functions and not specifically in templates. Keep in mind that most WordPress APIs are available ofr use throughout WordPress including plugins.

### bp_core_new_nav_item(https://codex.buddypress.org/developer/function-examples/core/bp_core_new_nav_item/)

### functions.php

```php
add_action('bp_setup_nav', 'ju_buddypress_profile_tabs');
```

### include/buddypress/profile-tabs.php

```php
function ju_recent_recipes_tab(){
  add_action( 'bp_template_title', 'ju_buddypress_recent_posts_title' );
  add_action( 'bp_template_content', 'ju_buddypress_recent_posts_content' );

  bp_core_load_template(
    apply_filter('bp_core_templage_plugin', 'members/single/plugins' );
  );
}

function ju_buddypress_profile_tabs(){
  if( ju_plugin_activatred_check('recipe/index.php') ){
    return;
  }

  global $bp;

  bp_core_new_nav_item([
    'name' => esc_html__('Recipe', 'udemy');
    'slug' => 'recipe',
    'position' => 100, // appear in last
    'screen_function' => 'ju_recent_recipe_tab',
    'show_for_displayed_user' => true, // every one can see
    'item_css_id' => 'ju_user_recipes',
    'default_subnav_slug' => 'recipes' // actived menu items // don't need sub menu
  ])
}

function ju_buddypress_recent_posts_title(){
  ?>
    <div class="text-center">My Recipes</div>
  <?php
}

function ju_buddypress_recent_posts_content(){
  $profile_user_id = bp_displayed_user_id();

  if(!profile_user_id){
    return;
  }

  $posts = new WP_Query([
    'author' => $profile_user_id,
    'posts_per_page' => 10,
    'post_type' => 'recipe'
  ]);

  if( $posts->have_post() ){
    ?>
      <div id="posts" class="row justify-content-md-center">
        <div class="col-md-8">
          <?php
          while( $posts->have_post() ){
            $post->the_post();
            get_template_part('partials/post/content-excerpt' );
          }
          ?>
      </div>
    </div>
  <?php
    wp_reset_postdata();
  }
}
```

### include/utility.php

```php
if(!function_exists('ju_plugin_activatred_check')){
  function ju_plugin_activatred_check( $plugin_file_name ){
    include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
    return is_plugin_activate( $plugin_file_name );
  }
}
```

## Custom CSS for BuddyPress

BuddyPress CSS can be overridden by coping the CSS folder into your theme and then editing CSS files

Keeping track of updates for BuddyPress is easy as BuddyPress will provide notes on all it's updates.

### udemy/css/buddypress.css

## Getting started with Woocommerce Development

WooCommerce is a WordPress plugin like any other plugin. It uses the same functions and hooks. By default WooCommerce is compatible with most themes

However, it's always good practice to try your best to accomodate the most popular plugins to increase value and efficiency

WooCommerce provides a simple walk through to help you get started. You can also import dummy data so you can test plugin with your theme

### [Third party / custom / non-WC theme compatibility](https://docs.woocommerce.com/document/third-party-custom-theme-compatibility/#)

## WooCommerce Product Page Templates

Overriding a template is not the only way you can modify templates. WooCommerce is very efficient and organized. You can remove actions to prevent certain HTML elements from appearing.

All WooCommerce templates can be overriden by creating a **woocommerce** folder inside your theme folder.

If yout theme doesn't have a particular template, then WooCommerce will load its templates from it's default folder templates.

The **global** folder contains templates that apply globally to various WooCommerce page.

## Cart, E-mail, and Misc. Woocommerce Templates

### [WooCommerce Email Test](https://wordpress.org/plugins/woocommerce-email-test/)

### [Customizing checkout fields using actions and filters](https://docs.woocommerce.com/document/tutorial-customising-checkout-fields-using-actions-and-filters/)

Sometimes you'll want to apply changes to the aethetics of WooCommerce. In this case, you would usually just override the template and apply CSS/HTML chanegs to it.

E-mail templates can be difficult to modify as you may need a live server or SMTP to sent out and test emails. Use the plugin I showed in this course if you ever need to modify an email template.

Sometimes you'll want to make changes that aren't possible with template. You'll have to use filter hooks to make your changes

### process-to-checkout-button.php

```php
<a href="<?php echo esc_url( wc_get_checkout_url() ); ?>" class="btn btn-block btn-lg btn-primary">
  <?php esc_html_e('Process to checkout', 'woocommerce'); ?>
</a>
```

### form-billing.php

템플릿 내부 tag class 수정

```php
  $fields = $checkout->get_checkout_fileds('billing' );
  foreach( $fields as $key => $field ){
    $field['class'] = ['form-group'];
    $field['input_class'] = ['form-control'];

    woocommerce_form_field($key, $field, $checkout->get_value( $key ));
  }
```

### funtions.php

wc 기본 필터링 옵션 제외하기

```php
remove_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30);
```

## Custom Cart Menu Item for Woocommerce

It's completely allowed to use WooCommerce functions and code outside of the WooCommerce and its templating system.

The **WC()** function will retrn the **wc** class so you can use its method and properties.

The class provides all the functions and data you'll need to use WooCommerce anywhere on your site.

The class is initialized for you, so you do not need to do anything to set up when using it.

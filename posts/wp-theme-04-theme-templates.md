---
title: "WP Theme - 04 Theme Templates"
date: "2021-05-24"
---

# Theme Templates

## Template Tags Overview

### Notes

- There are 2 versions of template tags.
- The _get_ version will return a value while the _non get_ version will echo a value
- Most template tags have parameters that you can pass in to manipulate the way data is outputted.

### Templage Tags

Template tags are PHP functions that allow you to grab data/content without having to type the logic out yourself.

### Diffence between the\_ and get\_

the_title // Outputs the title

get_the_title // Returns the title

### Parameters

`<div><?php the_title(); ?></div>`

`<?php the_title('<div>', '</div>'); ?>`

### experimental.php

```php
<?php
/*
 * Template Name: Experimental
 */

<h1>Experimental Code</h1>
```

## General Tags (wp-includes/)

### Notes

- Not all tags are defined in the template WordPress provides. Functions can still be template tags if the're defined outside of the scope of these files.
- The **bloginfo()** functions will return/echo data about your site. This function is very old and still usable, but there are alternative solutions.
- A lot of funtions are called to retieve certain data such as the archive functions. WordPress code is really glued togetherm but there are improvements being made.

### General Tags

Tags that don't fit into any specific category so they end up here.

You can expect to find the following

- Includes
  - get_header()
  - get_footer()
  - get_sidebar()
  - get_template_part()
  - get_search_form()
  - comments_template()
- Login
  - wp_loginout(): link to login / logout url
  - wp_logout_url(): url
  - wp_login_url(): url
  - wp_login_form(): login from
  - wp_lostpassword_url(): link to page
  - wp_register(): link to page
  - is_user_logged_in(): true / false
- BlogInfo()
  - Returns information about your site.
  - Will output the data.
  - If you want to data **returned**, then need to use the **get_bloginfo()** function
  - bloginfo() & get_blogInfo() Parameter
    - name - returns the site title.
    - language - returns the language of WordPress.
    - rss_url - returns the URL to RSS feed.
- Archive
  - single_post_title()
  - post_type_archive_title()
  - single_cat_title(); // echo singgle_cat_title();
  - single_tag_title()
  - single_term_title()
  - single_month_title()
  - get_archives_link()
  - wp_get_archives()
- Calender
  - calendar_week_mod();
  - get_calendar();
  - delete_get_calendar_cache();
- Etc
  - wp_meta();
  - get_current_blog_id();
  - wp_title();
  - allowed_tags();
  - wp_enqueue_script();

```php
<?php echo wp_login_url(); ?>
// http://localhost/wp-udemy/wp-login.php

<?php wp_loginout(); ?>
// <a href="http://localhost/wp-udemy/wp-login.php?action=logout&amp;_wpnonce=15c879f148">Log out</a>
```

## Navigation Tags

### Notes

- If you're using a custom walker, then it's your responsibility to apply classes to the navigation menu.

### Navigation Menu Tags

- wp_nav_menu();
- walk_nav_menu_tree();

## Link Tags

### Notes

- There are 2 ways to access the search page. You can add a URL query and set the **s** key. Alternatively, you use the phrase **search** followed by the search term. Either method will generate the search template.

### wp-includes/link-template.php

- get_search_link()
- get_search_query()

```php
<?php
    echo get_search_link( 'Hello' );
    echo '<br>';
    the_search_query();
?>
```

```
Url(params): http://localhost/wp-udemy/?s=test
Url(query): http://localhost/wp-udemy/search/Hello/
test
```

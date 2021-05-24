---
title: "WP Theme - 01 Getting Started"
date: "2021-05-24"
---

# 01 Getting Started

## Getting to know WordPress

[wordpress.com](https://wordpress.com/)

- hosting platform for wordpress
- user friendly, but not developer friendly

[wordpress.org](https://wordpress.org/)

- official wordpress site
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

## PHP Refesher & WordPress Coding Standards

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

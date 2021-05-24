---
title: "WP Theme - 13 Advanced Concepts"
date: "2021-05-24"
---

# 13 Advanced Concepts

## [Composer](getcomposer.org)

Composer is a package manager that allows you to download various libraries them together and take care of managing thme for you

The **composer.json** file is used to contains your settings. It can also be present in package files. Other package files can have their own dependencies.

**Packagist** is a site where you can find packages. It'll show you a package's dependencies and requirements

Composer for windows comes with an installer. It'll also take the time to create the **composer** command necessary to use it

패키지 생성하기

```
composer // 명령어 출력

composer init // 초기화
Package name
Description
Author / n (skip)
Minimum Stability
Package Type
License

```

초기 패키지 / composer.json

```json
{
  "name": "jack/web-app",
  "require": {
    "monolog/monolog": "1.23.0"
  }
}
```

패키지 설치 하기

```
composer install
```

## Local by FlyWheel

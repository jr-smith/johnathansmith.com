---
title: 'Introducing xttp: A fluent wrapper for Guzzle'
subtitle: With typehints, return types, and oozing with syntactic sugar
date: 2020-02-17T22:42:00.000Z
draft: false
summary: >-
  An incredibly useful PHP package that makes working with Guzzle so simple. There's also a Laravel package too!
type: post
cover: /uploads/xttp-logo-white.png
featured: /uploads/xttp-logo-white.png
---

xttp provides an easy-to-use fluent interface for working with Guzzle in PHP. Requests can
have append data, cookies, headers, middleware, mocks, options, and more. It is very flexible
and allows for passing in different parameters. This way, you can create
overrides for when you are mocking and/or doing unit tests.

Regular use is simple and done like the following:

```php
use JohnathanSmith\Xttp\Xttp;

/** @var \JohnathanSmith\Xttp\XttpResponseWrapper $xttpResponse */

$xttpResponse = Xttp::post(
    'https://johnathansmith.com', 
    ['form_params' => ['foo' => 'bar'], 
    'headers' => ['Content-Type' => 'application/x-www-form-urlencoded']
]);

// You may also do get, put, patch, delete.
```

The `XttpPending` class has several fluent methods on it that
allow you to set: method, url, headers, content, body, mocks, clients, and more.
You just need to add finish it with the `process` method. 

```php
use JohnathanSmith\Xttp\XttpPending;

$response = XttpPending::new()
->setUrl(// url)
->setMethod(// method)
->withHeaders(['X-Foo' => 'Bar'])
->asJson()
->send();
```

It will return a `XttpResponse` class that allows you to retrieve data like: headers,
original responses, transfer statistics, JSON (with error checking), body strings,
and other items. This is done painlessly. 

```php
use JohnathanSmith\Xttp\XttpResponseWrapper;

/** @var \JohnathanSmith\Xttp\XttpResponseWrapper $xttpResponse */
$url = $xttpResponse->getUrl();
$json = $xttpResponse->json();
$bodyString = $xttpResponse->body();
$successBoolean = $xttpResponse->isSuccess();
$headersArray = $xttpResponse->headers();
$singleHeaderValue = $xttpResponse->header('X-Foo');
$statusCode200 = $xttpResponse->status();
$originalResponse = $xttpResponse->response();
```

The Laravel package uses the service container to inject automatically
into a Facade using the `LaravelXttp` class. This is macroable as well, so
you can add your own macros.

You can find [more on the documentation page](/xttp).

![](/uploads/xttp-logo-white.png)
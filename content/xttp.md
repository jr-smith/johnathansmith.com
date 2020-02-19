---
title: "xttp - A Guzzle PHP Package"
subtitle: "A guzzle wrapper with typehints and syntactic sugar."
date: 2019-02-17T03:03:18.687Z
draft: false
type: "page"
meta_description: xttp is a PHP package and wrapper for Guzzle. It has allows for easier request and response manipulation as well as testing capabilities.
---

### A guzzle wrapper with typehints and syntactic sugar. 

Xttp was inspired by Adam Wathan's [zttp](https://github.com/kitetail/zttp). A special thanks to the maintainers of Guzzle.


Regular use is simple:
```php
use JohnathanSmith\Xttp\Xttp;

/** @var \JohnathanSmith\Xttp\XttpResponseWrapper $xttpResponse */

$xttpResponse = Xttp::post('https://johnathansmith.com', ['form_params' => ['foo' => 'bar'], 'headers' => ['Content-Type' => 'application/x-www-form-urlencoded']]);

// You may also do get, put, patch, delete.
```

After making the request you will get an instance of `XttpResponse`. This
has a lot of syntactic sugar, for example:
- Getting header/s
- Getting response status and info
- Returning JSON or body
- Getting URL
- Cookies

One of the ways that this package shines
is that it is set up to be very friendly
with Unit testing. You can also easily
create a _longer_ version from above with an large amount of granular detail. You can do this on XttpPending the object. With this we can:
- Add Cookies/Headers/Options
- Add or prepend Request/Response/Retry/Other middleware
- Guzzle History and/or Mock handlers
- Authorization
- Guzzle Client Construction

```php
use JohnathanSmith\Xttp\XttpPending;

$response = XttpPending::new()
->setUrl(// url)
->setMethod(// method)
->withHeaders(['X-Foo' => 'Bar'])
->asJson()
->process();
```


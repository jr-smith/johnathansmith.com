---
title: "Laravel Exceptions - Forwarding on Errors"
subtitle: Automatically Redirect the User When Thrown
author: Johnathan Smith
cover: 
image: https://miro.medium.com/max/1200/1*TToqy6Hkf4ETiDvYALMiyg.png
images:
tags: ["laravel", "php", "exceptions", "tips and tricks"]
date: 2019-08-08T08:58:36-04:00
draft: false
summary: Did you know that you can auto-forward on exception? Laravel makes this process incredibly simple and easy. An extremely useful trick!
type: post
---

Did you know that you can auto-forward on exception? Laravel makes
this process incredibly simple. This is because requests now have a
`render` method. This method is what makes this all possible. Let's dive in!

First, we'll use artisan to make a
custom request.

```
php artisan make:exception UnauthorizedForwardingException
```

Now we need to add that `render` method inside this newly created Exception class. It
looks like this:

```php
<?php

namespace App\Exceptions;

use Exception;

class UnauthorizedForwardingException extends Exception
{
    /**
     * Render the exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function render($request)
    {
        return redirect('/login');
    }

}
```

I would recommend using `route()` or `action()` instead of a hard coded URL like `'/login'` above. 
It's not good practice to hard code anything. Better yet, set up a config value.

Now, whenever that exception is thrown, it will be _automatically_ forwarded. Awesome, right??

There is one caveat though. You must not try/catch it, otherwise you lose the forwarding
abilities. So the following will break it...
```php
try {
    $variable = $this->methodWithForwardingException();
} catch(\Exception $exception) {
       // uh oh, lost the forwarding abilities
}
```

Maybe you need to catch some exceptions. That's fine, just simply catch
specific exceptions and not the `UnauthorizedForwardingException`. The
following, however, will work:

```php
try {
    $variable = $this->methodWithForwardingException();
} catch(SpecificException $exception) {
       // do stuff with this custom exception.
}
```

This will retain the forwarding, but still be able to catch a different exception
if needed.

![](https://thumbs.gfycat.com/IncredibleGrouchyEarwig-size_restricted.gif)
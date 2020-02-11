---
title: "Stop Hardcoding Variables - Tricks to Avoid It"
subtitle: Avoid these beginner mistakes.
author: Johnathan Smith
cover: https://i.redd.it/6qyx7mlsa20z.jpg
image:
images:
tags: ["php", "tips and tricks", "laravel"]
date: 2019-08-08T10:18:21-04:00
draft: false
summary: A mistake I see in a lot of beginner devs is hardcoding variables inside your code.
         This is not a good practice, and I see it all too often. Let's fix that
         and make our code cleaner. 
description: 
meta_description:
type: post
---

A mistake I see in a lot of beginner devs is hardcoding variables inside your code.
This is *not* a good practice, and I see it all too often. Here's a few scenarios:

- Urls
- Environment variables
- "Magic Numbers"

### URLs

```php
function goBack() {
   return redirect('home');
}
```

Now let's talk about how to avoid this! Do you see where I have written `/home` as
the url to redirect to? A better way would be to use `route()` or `action()`
though I personally prefer the former. Route gets the route name from your routes
file (like `web.php` or `api.php`). [It's good practice to name your routes](https://laravel.com/docs/5.8/routing#named-routes).


### Environment Variables

```php
function goBack() {
   return redirect(env('APP_URL'));
}
```

Environment variables should _never_ be declared in your code, except in config files.
 Create a config file inside the config folder and name it appropriately. So place a file in
your Laravel project at `/config/urls.php` and the contents will be:

```php
return [
    'home_url' => env('APP_URL')
];
```

We can now modify the original function like so:

```php
function goBack() {
   return redirect(config('home_url));
}
```

This will keep our code clean and allow us caching of our environment 
variables.

### "Magic Numbers"

What are magic numbers? Notice the `5` in the following:

```php
function goBack(Request $request) {
    if ($request->get('user_status') == 5) {   
        return redirect(route('admin'));
    }
    return redirect(route('home'));
}
```

What is 5? What does 5 mean? Why is it there? Well, it's checking the 
user status, so 5 probably signifies an admin. Of course, it could
be anything, but I'm just choosing that for instance.

A way to fix this would be set items in your `.env` file and
then create a config file like we did above. Another option,
if it is class based, would be to declare a constant.

To do that, use the following:

```php
class UserController {
    public const ADMIN_STATUS = 5;
}
```

These constants can be arrays, integers, strings, etc. They simply cannot 
be something that needs to be evaluated, like an expression or function.
We could now use it like so.

```php
class UserController {
    public const ADMIN_STATUS = 5;

    public function show(Request $request) {
        if ($request->get('user_status') == static::ADMIN_STATUS) {   
            return redirect(route('admin'));
        }
        return redirect(route('home'));
    }

}
```

See how much cleaner and understandable that is! You have successfully
refactored the code so that it is far more easy to comprehend. 

Keep making good design decisions like this and you will really up 
your dev game! 

![](https://4.bp.blogspot.com/-vq1ict0dIQ8/ViQB1mZSoiI/AAAAAAAAA-4/6NlvJ7N3Jo0/s1600/55381710.jpg)

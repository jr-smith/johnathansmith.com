---
title: "Limit Code Evaluation and Expressions in Your Blade Templates and Files"
subtitle: Remove these mistakes from your view files
author: Johnathan Smith
cover: https://i0.wp.com/wp.laravel-news.com/wp-content/uploads/2017/07/blade-if.png
tags: ["laravel", "php", "blade", "tips and tricks"]
date: 2019-08-15T09:50:42-04:00
draft: false
summary: "Beginners often clog up their Laravel blade files with
unnecessary \"ifs\", functions, variable assignments, and a host of other issues.
We'll dive into why it's bad and how we can fix it."
meta_description: "Beginners often clog up their Laravel blade files with
                 unnecessary \"ifs\", functions, variable assignments, and a host of other issues.
                 We'll dive into why it's bad and how we can fix it."
type: post
---

Please note: In this article I refer to Laravel & Blade, but the principles 
remain the same no matter the template/view framework you're using.

![](https://i.stack.imgur.com/s3d6r.gif)  

Let's say we open a Blade file and glance at the following code:

```html
<div>
    @if($dude)
        <?php $greeting = 'Dear Sir'; ?>
    @else
        <?php $greeting = 'Dear Madam'; ?>
    @endif
    <h1>{{ $greeting }}</h1>
    <div>{{ $body }}</div>
    {{ $object->renderClickString($user) }}
</div>
```

See something awry? Do you notice all these assignments, functions, ifs,
 etc.? Well, they shouldn't be in the blade file. Yep, that's right. None
 of that should be in the view. Why? There's a few reasons.
 
### Things Change!

See the `$greeting` assignment? What happens if we want to change it. We
have to go in the view file and edit there. Ok, not bad if it is just 
an if/else. But what if we want to change the greeting based upon not just the `$dude` variable,
but upon a customer preference variable, or a customer profile function. 
Meaning, now it says 'Dear [User Member Level]' instead of just 'Sir/Madam'.
See how this can get out of hand _real_ quick? 


### It's Hard to Read

The view file should be the view file. There shouldn't be all this 
extraneous stuff. Sometimes we need loops or if statements, but they
should be kept to a minimum. Let's keep it clean.

And most importantly...

### Move it to a Controller

*NONE* of this belongs in the view. It should *all* be moved to a
controller. This make it so much easier to work with. Now there is
_one_ place and not two places (controller and view) where this all
resides.

Now, let's fix it step-by-step!

First we'll make sure our controller is set up right.

```php
class LetterController {
    public function show(Letter $letter, Request $request) 
    {
        return view('user-letter.blade.php')->with([
            'body' => $letter->body,
        ]);
    }
}
```

Let's get rid of that if statement for the greeting, 
and move it to the controller.

```html
@if($dude)
    <?php $greeting = 'Dear Sir'; ?>
@else
    <?php $greeting = 'Dear Madam'; ?>
@endif
```

```php
return view('user-letter.blade.php')->with([
    'body' => $letter->body,
    'greeting' => $letter->user->getGreeting(),
]);
```

And now for the $object function. We don't want to pass the whole 
object, that's too memory intensive. We just want the string output 
of that tracking URL.
Let's add it to the constructor of the Controller. It will
automatically be injected with Laravel's service container.

```php
{{ $object->renderClickString($user) }}
```

```php
class LetterController {

    /** @var ClickTracker **/
    private $clickTracker;

    public function __construct(ClickTracker $clickTracker)
    {
        $this->clickTracker = $clickTracker;
    }

    public function show(Letter $letter, Request $request) 
    {
        return view('user-letter.blade.php')->with([
            'body' => $letter->body,
            'greeting' => $letter->user->getGreeting(),
            'trackingLink' => $this->clickTracker->renderClickString($letter->user),
        ]);
    }
}
```

And now for our new and improved file after we moved the frivolities
to the controller...

```html
<div>
    <h1>{{ $greeting }}</h1>
    <div>{{ $body }}</div>
    {{ $trackingLink }}
</div>
```

Awesome!!! Everything is now centrally located in the controller and our
Blade file is so fresh and so clean, clean. This is a good practice,
so get in the habit :)

![](https://media1.tenor.com/images/49179ab8d7405dbdae6cc5e0413c5ca5/tenor.gif)
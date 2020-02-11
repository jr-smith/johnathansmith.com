---
title: "Level Up Your Arrays Using Objects"
subtitle:  "Objects as Containers for Easier Array Work" 
author: Johnathan Smith
cover: https://i.imgur.com/qgpcufH.gif
image:
images:
tags: ["php", "tips and tricks"]
date: 2019-08-17T10:32:19-04:00
draft: false
summary: This is an optional technique that comes in handy when doing 
         processing of arrays that may contain a lot of keys and is used for
         information storage or manipulation. We can refactor for better and
         easier understanding of code.
description: 
meta_description: This is an optional technique that comes in handy when doing 
                 processing of arrays that may contain a lot of keys and is used for
                 information storage or manipulation. We can refactor for better and
                 easier understanding of code.
type: post
---

This is an optional technique that comes in handy when doing 
processing of arrays that may contain a lot of keys and is used for
information storage or manipulation. We can refactor for better and
easier understanding of code.

Say we have a plain old array with a list of stuff. 

```php
$array = [
    'url' => 'https://johnathansmith.com',
    'user' => $user,
    'age' => 21,
    'is_subscriber' => true,
    'products' => ['book', 'food'],
    'price' => 12.31,
];
```

Now, what if we want to pass this information around to a lot of functions, or 
even through a lot of classes and methods?

For instance, we need to operate on each one before the user checks out in a cart. Maybe there
is age verification, or opts into a mailing list if they're not a subscriber, etc.

We could keep this as an array if we wanted, but a potentially better option
would be to refactor this out to a class. The class doesn't really do anything,
it just acts as a storage facility for variables. Isn't that what this array does? Yes,
that is certainly true, but an object allows us to type-hint and _remember_ what is in
an array. If this is being passed between several classes, it is much better
to pass an array with member variables, then to go back and see what the array keys
were by tracking down _where_ it was initialized. I _know_ we have *all* done that before.

Great, so let's change this into a class. In other languages like Go or C, this is called
a "struct" (short for _structure_). It's not editing, manipulating, it's just keeping
these variables stored.

So now, we can create the class. I will also be using variable type hinting that
many IDEs like PHPStorm can utilize.

```php
class CartVariables {
    /** @var string **/ 
    public $url;
    /** @var \App\User **/ 
    public $user;
    /** @var int **/ 
    public $age;
    /** @var bool **/
    public $isSubscriber;
    /** @var \App\Cart\Product[] **/ 
    public $products;
    /** @var float **/ 
    public $price;
}
```

Now we can pass this around to all the classes and services (or one of it's variables) 
and never have to go back and look up keys to the array. We can also type-hint
 all those other functions, so we know _exactly_ the data that we are dealing with.
 And remember, objects are passed _by reference_ not _by value_ like an array.
 
 I would _not_ do this in your initial code, but if you see yourself operating on or
 passing around an array often, then go for this refactor.
 
 ![](https://media3.giphy.com/media/l2R0dZTDEZ9rS2O6k/giphy.gif)

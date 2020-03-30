---
title: "PHP Array Destructuring - And its Cool Hidden Feature"
subtitle: "Assign returned variables and skip them too!"
author: Johnathan Smith
cover: "/uploads/array-destructuring.jpg"
image:
images:
tags: ["php", "array destructuring", "tips and tricks"]
date: 2020-03-29T09:21:09-04:00
draft: false
summary: Did you know that you can destructure arrays, just like you can in es6 JavaScript?
description: Did you know that you can destructure arrays, just like you can in es6 JavaScript?
meta_description: Did you know that you can destructure arrays, just like you can in es6 JavaScript?
type: post
---

![array destructuring in PHP](/uploads/array-destructuring.jpg)

Did you know that you can destructure arrays in PHP, just like you can in ES6 JavaScript?

Destructuring allows us to unpack the values from an array. So if you had code that
returned an array of values then you could assign those values to variables immediately.

So, let's see the difference. An explode function will separate a string into an
 array by a passed character.
 
 ```php
$array = explode('|', 'one|two');

echo $array[0]; // one
echo $array[1]; // two
```

_However_, with array destructuring we can get the values from the function
and assign it to variables right away. For example:


```php
[$one, $two] = explode('|', 'one|two');

echo $one; // one
echo $two; // two
```

Now, we can assign the values right away. How cool is that!

### EXTRA BONUS HIDDEN FEATURE TIME!

Now for something really cool. What if we want to *skip* a variable? Well,
we can do this! All you need is a _comma_! In the following example we will get the
first and third, but *skip* the second because we don't need it (for whatever reason).  

```php
[$one, , $three] = explode('|', 'one|two|three');

echo $one; // one
echo $three; // three
```

All we did was skip it. You can use the comma to skip variable assignments
in array destructuring as much as you want!

```php
[$one, , , $four] = explode('|', 'one|two|three|four');

echo $one; // one
echo $four; // four
```


![](/uploads/sweet-nd.gif)
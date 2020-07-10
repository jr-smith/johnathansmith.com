---
title: "Alternative to Named Params With Config Classes for PHP"
subtitle: "Taking a lesson from Go"
author: "Johnathan Smith"
cover: "/uploads/config.jpg"
tags: ["php", "named parameters", "rfc", "go", "golang"]
date: 2020-07-09T09:21:09-04:00
draft: false
summary: We can use some object oriented techniques to set configurations rather than arrays or endless constructor types.
description: We can use some object oriented techniques to set configurations rather than arrays or endless constructor types.
meta_description: We can use some object oriented techniques to set configurations rather than arrays or endless constructor types.
type: post
---

![Alternative to Named Params With Config Classes for PHP](/uploads/config.jpg)

There's so much debate about named parameters because of the [new PHP RFC](https://wiki.php.net/rfc/named_params) for named params/arguments. An option that
a lot of people are forgetting about is a plain old class! To be fair, I've been
writing some [Go](https://golang.org/) lately and this is how it's oftentimes done in more strict languages: it's
nothing new, but can be useful.

Example with a bunch of params...
```php
<?php

class CoolThing {
    public function __construct(
        $model, 
        string $title, 
        int $number, 
        string $action = "run", 
        string $type = null, 
        string $method = null,
        string $prefix = null
    ) {
        // set params
    }
}
```

Yikes! That's a lot of params. We could pass an array, but because PHP doesn't support
typed Lists/Arrays, there's no type inferences on it. You have to go look into the documentation,
instead of just using your editor.

We can fix this with a Config class (and PHP 8 will have union types, yay).

```php
<?php

class CoolThingConfig {
    /** @var string **/
    public $title;
    /** @var int **/
    public $number;
    /** @var string **/
    public $action = "run";
    /** @var string|null **/
    public $type = null;
    /** @var string|null **/
    public $method = null;
    /** @var string|null **/
    public $prefix = null;
}

class CoolThing {
    /** @var mixed **/
    private $model;
    
    /** @var CoolThingConfig **/
    private $config;

    public function __construct($model, CoolThingConfig $config) {
        // set params from config class.
        $this->model = $model;
        // maybe run some checks,initializations on the config first.
        $this->config = $config;
    }
}

// now set it up...
$config = new CoolThingConfig();
$config->method = 'GET';
$coolThing = new CoolThing($model, $config);
```

Now you've got all the config encapsulated inside the class in it's own class.
You can set the params how you want!

Is this useful in every case? No.
Is it useful in many cases? Yes.

Either way, the rfc will be extremely interesting if it passes.

![](/uploads/ferrell-yes-awesome.gif)
---
title: "Use Interfaces - Stop Extending Classes"
subtitle: "We need to rely on methods and drop using state."
author: Johnathan Smith
cover: "/uploads/class-vs-interface.png"
image:
images:
tags: ["PHP", "tips and tricks", "clean code", "programming"]
date: 2020-08-03T09:21:09-04:00
draft: false
summary: Using interfaces is easy and keeps your code clean. This will keep your code clean and extendable.
description: Using interfaces is easy and keeps your code clean. This will keep your code clean and extendable.
meta_description: Using interfaces is easy and keeps your code clean. This will keep your code clean and extendable.
type: post
---

![use interface - do not extend classes](/uploads/class-vs-interface.png)


In PHP, extending classes is cheap. So much so that we often neglect
building out something far more maintainable because it's too easy to
use the quick method. However, I'm here to help you move away from that.

I've got the following example to show you. Say we want to have different kinds of  "subscriptions". We have a email
 subscription, a text message one, etc.
 
 
 ```php
<?php

class Subscription {
    protected $title;
    protected $fields = [];
    
    public function process() {
        foreach($this->fields as $field) {  
            $this->doSomething($field, $this->title);
            // do something else with the field, etc.
        }
    }
}

class EmailSubscription extends Subscription {
    protected $title = 'email';
    protected $fields = [
        'body',
        'header',
    ];
}

$email = new EmailSubscription;
$email->process();
 
```

Now, if instead of relying on rewritten member variables, what if we relied upon a function that gets them for us? This does a couple things for us:
1) It allows us to test it so much easier. We have a public function, which is infinitely easier to mock and test.
2) It allows us to send the interface as the parameter to a function. Since we are no longer concerned about the
 state, all we need to be worried about is the interface type. We know that the interface, acting like a blueprint, *has* to have these methods.
 
 Let's see what this would look like with an interface.

```php
<?php

interface SubscribesToContent
{
    public function getFields(): array;

    public function getName(): string;
}

class EmailSubscription implements SubscribesToContent
{

    public function getFields(): array
    {
        return [
            'body',
            'header',
        ];
    }

    public function getName(): string
    {
        return 'email';
    }

}

class SubscribeService {
    
    public function process(SubscribesToContent $sub) {
        foreach($sub->getFields() as $field) {  
            $this->doSomething($field, $sub->getTitle());
            // do someething else with the field, etc.
        }
    }
}

```


See how much cleaner this is?! And if we have new subscriptions, we need merely use the exact same interface! We can
 also easily mock this in PHPUnit or Mockery, whereas it would be more difficult by using the member variables. You
  can even do an anonymous class for testing.
 
 ```php
 // in mockery

$mock = \Mockery::mock(SubscribesToContent::class);
$mock->shouldReceive([
    'getFields' => ['test', 'these', 'fields',],
    'getName' => 'hello',
]);

// here is the anonymous class

$interface = new class implements SubscribesToContent {
    public function getFields() { return ['fake', 'fields'];}
    public function getName() { return ['fake name'];}
}
``` 

#### Join the interface party!
![Interfaces know how to party](/uploads/know_how_to_party_waynes_world.gif)
---
title: Decorators and Laravel Pipelines with Multiple Parameters and Constructors
subtitle: An Alternative and Testable Way to Mutate Data with Laravel's Service Container
date: 2019-06-23T03:03:18.687Z
draft: false
type: post
tags: ["laravel", "PHP", "pipeline", "design pattern", "decorator", "tips and tricks"]
description:
  A Laravel specific trick sequentially manipulate data. Allows for testable
  pipelines that utilize the service container and multiple parameters and constructors.
image: 
cover: https://picsum.photos/id/137/1376/800
summary: A Laravel specific trick sequentially manipulate data. Allows for testable
                             pipelines that utilize the service container and multiple parameters and constructors.
---

Laravel's [service container](https://laravel.com/docs/5.8/container) is absolutely amazing. I love leveraging it to make building apps easier.

This is a cool Laravel specific trick I have created which may come in handy for a lot of use cases. It is a cross between the [Laravel pipeline](https://jeffochoa.me/understanding-laravel-pipelines) and the [decorator pattern](https://laracasts.com/series/design-patterns-in-php/episodes/1). For me, I had to continually edit data as if it were going through pipes or middleware, however there were some gotchas. I needed to:

- Pass multiple parameters
- Initialize certain objects
- Have it be testable (always)

Now, with Laravel pipelines, we can pass data amongst several objects and return it. However, we can only pass [one piece of data or object](https://github.com/illuminate/pipeline/blob/master/Pipeline.php#L59).

For this example, we'll be creating a series of classes that will edit a string, and each class will be responsible for _one function_ which will be contracted via an interface. We will need to pass a `Request` object as well as a `string`. 

The first thing we will want to do is create an interface that has a shared method amongst all these object. Just like the standard Laravel pipeline, but this time we will pass multiple parameters.

```php
use Illuminate\Http\Request;

interface EditsString {
    public function edit(Request $request, string $str): string;
}
```

Now let's create a couple object that transforms our data.

```php
class RemoveEmptyParagraphs implements EditsString {
    public function edit(Request $request, string $str): string 
    {
        // I'm breaking it apart for easier consumption. You can reduce the number of variable assignments.
        $str = str_replace('<p></p>', '', $str);
        $name = $request->get('name');
        $str .= $name;
        return $str;
    }
}
```

Awesome! Now we can edit the string and pass it back! But say we have another class that requires constructor parameters. Well, let's add that.

```php
class AddClosingStatements implements EditsString {

    private $object;
    
    public function __construct(TimeStampObject $object)
    {
        $this->object = $object;
    }
    
    public function edit(Request $request, string $str): string 
    {
        $str .= $request->get('byebye');
        $str .= $this->getSomething();
        return $str;
    }
    
    private function getTimestamp(): string
    {
        return $this->object->getTimestamp() ?? '';
    }
    
}
```

Now, let's structure our main object. We can do this by using a an array of class strings. We can technically do this by injecting the constructors, but imagine there were a _lot_ of steps. It can make things simpler this way. 

```php
class StringMutations {

    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }
    
    public function decorate(): string
    {
        $data = '';
        foreach($this->getPipes() as $pipe) {
            $data = app($pipe)->edit($this->request, $data);
        }
        return $data;
    }
    
    private function getPipes(): array
    {
        /** put in as many classes as you need **/
        return [
            RemoveEmptyParagraphs::class,
            AddClosingStatements::class,
        ];
    }
}
```

Please note in the `decorate` function, we are initializing the string outside the loop. We are then using `app()` to get the class from the service container. And since we are using the same interface, we just call the method on the initialized object. Anything inside the constructor of these objects will automatically be initialized too. 

So, pretty cool, right? This method also makes classes infinitely testable. We'll use unit tests. 

```php
class RemoveEmptyParagraphsTest extends TestCase
{
    public function testEdit()
    {
        $removeEmptyParagraphs = app(RemoveEmptyParagraphs::class);
        $request = request();
        $data = 'before<p></p>after';
        $data = $removeEmptyParagraphs->edit($request, $data);
        $this->assertEquals('beforeafter', $data);
    }
}
```

This will work with a series of steps, especially if you need something like a pipeline and/or decorator that has multiple parameters and constructors. I think this has _some_ advantages to the existing pipeline. This is merely an alternative for certain cases.

![](https://media.giphy.com/media/5txEwCBREwRJWJtvoI/giphy.gif)
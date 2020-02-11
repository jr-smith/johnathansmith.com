---
title: "Laravel Commands Different Output Methods and Styles"
subtitle: What Do They Each Look Like?
date: 2019-08-10T21:06:39-04:00
draft: false
type: "post"
tags: ["laravel", "PHP", "pipeline", "commands"]
cover: https://i1.wp.com/wp.laravel-news.com/wp-content/uploads/2017/08/custom-artisan-commands.png?resize=2200%2C1125
summary: There are five command output methods. What do they look like in the CLI?
---

There are five command output methods in a  [Laravel command](https://laravel.com/docs/5.8/artisan#writing-commands):

- `line`
- `info`
- `comment`
- `question`
- `error`

Now, let's set up a test command to output this information. Start by going
to the terminal and entering `php artisan make:command OutputStyles`. 
This will create an OutputStyles class in `app/Console/Commands`. 
Now let's fill out the `handle` method. Here's what it will look like 
for this test.

```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class OutputStyles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'output:styles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Call output methods to see what they look like.';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->line('This is the "line" method.');
        $this->info('This is the "info" method.');
        $this->comment('This is the "comment" method.');
        $this->question('This is the "question" method.');
        $this->error('This is the "error" method.');
    }
}
```


Alright! Now let's see what they look like, by running `php artisan output:styles`.

![Laravel Commands](https://johnathansmith.com/uploads/laravel-command-output-method-styles.png)


Very cool! But something interesting is happening underneath. The
methods are actually just shortcuts to `line($output, $style)`.
So the method `info()` is really just:
```php
    public function info($string, $verbosity = null)
    {
        $this->line($string, 'info', $verbosity);
    }
```

I would still use the shortcuts and not use line with the style passed.
It keeps things clearer.

![](https://i.giphy.com/media/3orieWHDxeoe27n6Vy/giphy.webp)
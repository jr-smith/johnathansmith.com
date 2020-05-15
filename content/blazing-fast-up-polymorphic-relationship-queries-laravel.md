---
title: "Blazing Fast polymorphic relationship database queries in Laravel"
subtitle: "For mysql, postgres, sqlite, and other relational databases"
author: Johnathan Smith
cover: "/uploads/mysql-fast.gif"
image:
images:
tags: ["php", "mysql", "tips and tricks", "laravel"]
date: 2020-05-14T09:21:09-04:00
draft: false
summary: Eloquent Trick to get amazing speeds with polymorphic relationship queries using compound indices.
description: Eloquent Trick to get amazing speeds with polymorphic relationship queries using compound indices.
meta_description: Eloquent Trick to get amazing speeds with polymorphic relationship queries using compound indices.
type: post
---

![laravel polymorphic fast queries for mysql](/uploads/mysql-fast.gif)

Trick based upon reading Jonathan Reinink's post on composite indices. This will
add a set of composite indices so that you're [polymorphic relationships](https://laravel.com/docs/7.x/eloquent-relationships#polymorphic-relationships)
load significantly faster.

<div class="clearfix"><blockquote class="twitter-tweet"><p lang="en" dir="ltr">It&#39;s Friday, so it&#39;s time to give away another free lesson from my upcoming Eloquent Performance Patterns course! 🍻<br><br>In this lesson I show how powerful compound indexes can be when ordering by multiple columns. 🔥<br><br>💌 Sign up here: <a href="https://t.co/hPUuzYtYBA">https://t.co/hPUuzYtYBA</a><br><br>Sending soon! ⏱ <a href="https://t.co/3mLJtNzFTl">pic.twitter.com/3mLJtNzFTl</a></p>&mdash; Jonathan Reinink (@reinink) <a href="https://twitter.com/reinink/status/1261270676171866112?ref_src=twsrc%5Etfw">May 15, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></div>

We want to take the techniques above and add them to our database.
For instance, say we have this setup with Brand and Product. We will make the assumption
that you have already added the appropriate keys in the db.

```php
<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Brand extends Model {
    public function product(): MorphTo
    {
        return $this->morphTo();
    }
}

class Toy extends Model {
    public function brand(): MorphOne
    {
        return $this->morphOne(Brand::class, 'product');
    }
}
```

Running this query will be extremely slow!
```mysql
select * from `toys` where exists (select * from `brands` where `toys`.`id` = `brands`.`product_id` and `brands`.`product_type` =  "toy"  and `brands`.`deleted_at` is null)
```


Now let's create a new migration where we add the composite keys. This will make
our lookups much faster when doing the polymorphic queries.

```php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterBrandsTableAddIndexToProduct extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('brands', function (Blueprint $table) {
            $table->index(['product_type', 'product_id'], 'product_index');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('brands', function (Blueprint $table) {
            $table->dropIndex('product_index');
        });
    }
}

```

Now let's run that query again...

```mysql
select * from `toys` where exists (select * from `brands` where `toys`.`id` = `brands`.`product_id` and `brands`.`product_type` =  "toy"  and `brands`.`deleted_at` is null)
```


So much faster! Joy!

![](/uploads/nd-dance.gif)
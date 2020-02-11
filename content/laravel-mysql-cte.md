---
title: "MySQL Common Table Expressions with Eloquent and Laravel"
subtitle: Using CTE in your Project
author: Johnathan Smith
cover: https://www.tutorialrepublic.com/lib/images/sql-illustration.png
image: https://www.tutorialrepublic.com/lib/images/sql-illustration.png
tags: ["laravel", "mysql", "php", "common table expressions"]
date: 2019-12-05T23:28:05-05:00
draft: false
summary: Common Table Expressions are incredibly useful in MySQL 8. However, Laravel does not support it out of the box. Let's see how we can use a package to support this.
description: 
meta_description: Laravel MySQL Common Table Expressions with Eloquent in Laravel.
type: post
---

Using Common Table Expressions with MySQL 8+ in Laravel isn't something
that comes baked-in. You must use the wonderful package
[Laravel CTE](https://github.com/staudenmeir/laravel-cte)
by the very talented Jonas Staudenmeir.

Install that via composer. Now let's envision a scenario. Say we have a database product
 and we have users we want to search for. We want them to search the name, then the email and
 rank those results according to the string placement (and if it exists in search). 
 To do that, we would have to write something
 like the following in MySQL:
 ```sql
WITH user_search AS (
    SELECT concat(name,email) AS search_string, id FROM users
), user_cte AS (
    SELECT id, instr(search_string, '<SEARCH_TERM>') as position FROM user_search
)
SELECT user_cte.position, users.id, users.name, users.email FROM users 
JOIN user_cte ON users.id = user_cte.id 
WHERE user_cte.position > 0 
ORDER BY user_cte.position ASC, users.id ASC LIMIT 50;
```

Ultimately, we want to replace that `<SEARCH_TERM>` with a string. We also have
 the `WHERE` statement have the position be above zero. Zero means the search term
 does not exist inside the string.  So now, we need to convert this into
Eloquent.

The CTE inside the `with` statements will be translated to the method `withExpression`.

```php
use Staudenmeir\LaravelCte\Query\Builder;

\App\User::withExpression('user_search', static function (Builder $query) {
        $query->from('users')
            ->select('id')
            ->selectRaw('concat(name, email) as search_string');
    })
    ->withExpression('user_cte', static function(Builder $query) {
        $query->from('user_search')
            ->select('id')
            ->selectRaw("instr(search_string, '<SEARCH_TERM>') as position");
    })
    ->select('user_cte.position', 'users.id', 'users.name', 'users.email')
    ->where('user_cte.position', '>', 0)
    ->orderBy('user_cte.position')
    ->orderBy('users.id')
    ->join('user_cte', 'users.id', '=', 'user_cte.id')
    ->limit(50)
    ->get();
```

And with that package, we now have the ability to use Common Table Expressions! 
You could then move this into a static method with the search term as a parameter
and call it as many times as you want. 
`public static function search(string $term = '')`


But that's just scratching the service. The package also allows for recursive CTE
and much more. 

<hr />

##### Reference
- [INSTR function](http://www.mysqltutorial.org/mysql-instr/)
- [CONCAT function](http://www.mysqltutorial.org/sql-concat-in-mysql.aspx)
- [Laravel CTE package](https://github.com/staudenmeir/laravel-cte)

![](https://i.gifer.com/origin/61/61056367e0cb311e36cdc4ad4c52c42e.gif)

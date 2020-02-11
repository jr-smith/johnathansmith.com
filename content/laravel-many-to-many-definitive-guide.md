---
title: "Laravel: Creating Many to Many Relationships - The Definitive Guide"
subtitle: "Taking full advantage of all the built-in functionality"
author: Johnathan Smith
cover: https://thumbs.gfycat.com/AggressiveFaintAmericankestrel-size_restricted.gif
image:
images:
tags: ["laravel", "php", "mysql", "tips and tricks"]
date: 2019-10-06T17:06:57-04:00
draft: false
summary: The article includes the best way to understand a many to many relationship and write a migration. 
meta_description: Creating Many to Many Relationships with Laravel | The Definitive Guide. Write the best migration scripts.
type: post
---

![Laravel many to many relationships](https://thumbs.gfycat.com/AggressiveFaintAmericankestrel-size_restricted.gif)

Laravel has [many to many relationships](https://laravel.com/docs/5.8/eloquent-relationships#many-to-many)
which allows for multiple models to be related. For instance,
think of a relationship between `roles` and `users`. Users can have
multiple roles, and likewise, a role can have multiple users. So,
a `many to many` relationship is formed. To make it so that
there is a relationship between the two, you will need an intermediate
table, often called a `pivot table`.

Well, how do we set this up. The code inside your Eloquent model
will look like this for the `Role`:
```php
use \Illuminate\Database\Eloquent\Relations\BelongsToMany;
     
class Role {
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }
}
```

And like this for the `User`:
```php
use \Illuminate\Database\Eloquent\Relations\BelongsToMany;
     
class User {
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }
}
```

So if we do `$user->roles` and likewise `$role->users` then we will
return the belongs to many relationship. For the former, it will return
a collection of roles and for the latter, it will return a collection of 
users.

Now, the next step that is the migration. This is crucial and also where 
I see a lot of missteps.  Laravel is smart enough to 
know when a many to many relationship exists *simply by the name
of the table*. How awesome is that? Thre are just two things to remember:
1) The tables name must use the _singular_ case of the model name. (e.g role, user not roles or users)
2) The tables must be in alphabetical order (role before user)

Therefore, the name of the table will be `role_user`. This is the singular
version of the model names, and they are in alphetical order. So now
we will make a PHP artisan migration command.

`php artisan make:migration create_role_user_table --create=role_user`

You've created the migration, now we need to finalize the code for it.
There are a couple things you need to note. There is not incrementing integer
nor a main ID column. This is because it is useless for this situation.
Also, the primary key will be an _array_ of the `user_id` and the `role_id`.
This is because we want the uniqueness of the table to be determined
by this relationship. It also assures that there will not be 
repeated relatioships. The cascade function also allows for the
relationship to be dropped from the database when a role or a user is deleted.

You'll see a lot of junk when it comes to this on stack overflow and searching
the web. But trust me on this one: this is the **BEST** way to write a 
migration for a many to many relationship.

```php
Schema::create('role_user', function (Blueprint $table) {
    
    $table->integer('role_id');
    
    $table->integer('user_id');
    
    $table->foreign('role_id')
        ->references('id')
        ->on('roles')
        ->onDelete('cascade');
    
    $table->foreign('user_id')
        ->references('id')
        ->on('users')
        ->onDelete('cascade');

    $table->timestamps(); // THIS IS OPTIONAL. I GENERALLY AVOID IT
    
    $table->primary(['user_id', 'role_id']);
});
```

**Please note** that in Laravel 6, the default data type for a table ID is a 
big integer and not an integer. In which case, this will change the code to 
`$table->bigInteger` in place of `$table->integer`.

One other note: You _may_ add additional data to the migration table.
Sometimes there are use cases for this. For the migration script,
you would add it as normal. However, for the Eloquent code you
would add the `withPivot` attribute to the model like so:

```php
return $this->belongsToMany('App\Role')->withPivot('column1', 'column2');
```

And if you wanted timestamps:
```php
return $this->belongsToMany('App\Role')->withTimestamps();
```

There's some additional functionality you can find at https://laravel.com/docs/5.8/eloquent-relationships#many-to-many.

Now, let's talk about how to interact and save
these relationships. 
1) Attach
2) Detach
3) Sync
4) Sync Without Detaching
5) Toggle

### Attach and Detach
When you hear "attach" simply think "append". This will add
the relationship to the model. Note that roles is in the method call format 
`->roles()` and _not_ in the relationship format `->roles`. You can pass in 
an array of ids, or as multiple parameters. So, if we want to add a role
to a particular user we do the following:
```php
// all of these are valid
$user->roles()->attach($roleId);
$user->roles()->attach([1,2,3,4]);
$user->roles()->attach(1,2,3,4);
```

 To save extra information, do the following:
```php
$user->roles()->attach($roleId, ['expires' => $expires]);

// as an array, the ID will act as the KEY for the array,
// and the value will be an array of the intermediate data
$user->roles()->attach([
    1 => ['expires' => $expires],
    2 => ['expires' => $expires]
]);
```

To remove relationships, use *detach* in the exact same manner: 
`$user->roles()->detach(1)`.

### Sync and Sync Without Detaching
Sync is like attach, but it removes any prior relationships. It operates
with the same parameters. Let's take a look:
```php
$user->roles()->attach(1,2,3,4);
$user->roles()->sync([1,2]);
$user->roles // outputs roles 1 & 2.
```

`syncWithoutDetaching` will append any that are not already attached, but
it will not remove any relationships. I find this method to be particularly
 helpful.
```php
$user->roles()->syncWithoutDetaching([1, 2, 3]);
```


### Toggle
From the documentation:

> The many-to-many relationship also provides a toggle method which "toggles" the attachment status of the given IDs. If the given ID is currently attached, it will be detached. Likewise, if it is currently detached, it will be attached:
  
```php
$user->roles()->toggle([1, 2, 3]);
```

There is infinitely more in the documentation, but this will give you
a lot of what you need to know.

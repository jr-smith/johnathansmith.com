---
title: "PHPUnit and Testing Specific Folders"
subtitle: The Less Stressful way to implement this technique
author: Johnathan Smith
cover: "https://buddy.works/blog/thumbnails/phpunit-cover.png"
image: "https://buddy.works/blog/thumbnails/phpunit-cover.png"
images:
tags: ["laravel", "php", "unit testing", "tips and tricks"]
date: 2019-09-26T13:48:52-04:00
draft: false
summary: Do you want to test a specific folder in PHPunit? I have found a way to implement this feature more easily.
description: 
meta_description:
type: post
---

Do you want to test a specific folder in PHPunit? When I do this, 
I usually
run the command very often. I have found a way to implement this 
feature more easily.

Go into your `phpunit.xml` file and search for the `<testsuites>` brackets.

Inside of this, place a new testsuite. You'll want to be sure to 
include the name and the path. Like so...

```xml
<testsuite name="Email">
    <directory suffix="Test.php">./tests/Unit/Emails</directory>
</testsuite>
```


Now, on the command line, run the command (and replace `Email` with
whatever your testsuite name is).

```bash
phpunit --testsuite Email
```

Now you can run a collections of tests in a folder, and have
it be a little bit easier in terms of remembering
and typing out the directory each time :)


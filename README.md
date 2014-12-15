# DEVit Conference Website Sources

> WEBit the 360° Web Development Conference
> http://webitconf.org 

[![Build Status](https://secure.travis-ci.org/skgtech/devit.png?branch=master)](http://travis-ci.org/skgtech/devit)

## Setup

Checkout and npm install:

```
git clone git@github.com:skgtech/devit.git
cd devit
npm install
```

## Build Commands

We use [Grunt](http://gruntjs.com) to manage the development workflow, build and deploy, if you don't have it installed: `npm install grunt-cli -g`.

* `grunt serve` Launch the website locally, a development workflow with livereloads and watches.
* `grunt build` Build the website, output will be in folder `dist/`.
* `grunt deploy` Build & Deploy the website using github pages.

## Directory Structure

Pretty straightforward stuff here, the whole website is under the folder `app/`.

## Release History

- **v0.0.1**, *15 Dec 2014*
    - Big Bang

## License

Copyright ©2015 SKGTech. Licensed under the MIT license.

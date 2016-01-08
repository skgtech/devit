# DEVit Conference Website Sources

> DEVit the 360° Web Development Conference
> http://devitconf.org

[![Build Status](https://secure.travis-ci.org/skgtech/devit.png?branch=master)](http://travis-ci.org/skgtech/devit)

## Setup

The site is made with [Jekyll](http://jekyllrb.com/).

You need `node`, `npm`, `bower`, `Ruby` and `bundler` gem installed in order to build the site.

### Build Environment

We use [Grunt](http://gruntjs.com) to manage the development workflow, build and deploy, if you don't have it installed:<br/> `npm install grunt-cli -g`

We use [Bower](http://bower.io/) to manage client side libraries and frameworks, if you don't have it installed:<br/> `npm install -g bower`

We use [Bundler](http://bundler.io/) to manage the [Jekyll](http://jekyllrb.com/) dependencies, if you don't have it installed:<br/> `gem install bundler`

### Setup Commands

* Clone
```
git clone git@github.com:skgtech/devit.git
cd devit
```
* Install Jekyll and its dependencies
```
bundle install
```
* Install node packages
```
npm install
```
* Install bower packages
```
bower install
```

## Build Commands

* `grunt serve`: Launch the website locally, a development workflow with livereloads and watches.
* `grunt build` Build the website, output will be in folder `dist/`.
* `grunt deploy`: Build & Deploy the website using github pages.
* `grunt --help`: See all available tasks.

## Directory Structure

Pretty straightforward stuff here, the whole website is under the folder `app/`.

## Troubleshooting

1. If you get an error like the following

  > Warning: Please install Jekyll before running this task. Use --force to continue.

  Please make sure you have the `jekyll` gem installed.

  You can `bundle install` to install this and its dependencies.

2. If you get an error like the following

  > Warning: Syntax error: File to import not found or unreadable: bootstrap-sass-official/assets/stylesheets/_bootstrap.scss.<br/>
                  Load paths:<br/>
            ...<br/>
            on line 6 of app/_scss/main.scss<br/>
      Use --trace for backtrace. Use --force to continue.

  Please make sure you run `bower install` to install the packages needed.

  If you don't have **bower** installed: `npm install -g bower`

## License

Copyright ©2015 SKGTech. Licensed under the MIT license.

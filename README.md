# DEVit Conference Website Sources

> DEVit the 360° Web Development Conference
> http://devitconf.org

[![Build Status](https://secure.travis-ci.org/skgtech/devit.png?branch=master)](http://travis-ci.org/skgtech/devit)

## Setup

The site is made with [Jekyll](http://jekyllrb.com/).

You need `node`, `yarn`, `Ruby` and `bundler` gem installed in order to build the site.

Please use Node v4 and above.

### Build Environment

We use [Gulp](http://gulpjs.com) to manage the development workflow, build and deploy, if you don't have it installed:<br/> `npm install gulp-cli -g`

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
yarn
```

## Build Commands

* `npm run develop`: Launch the website locally, a development workflow with livereloads and watches.
* `npm run deploy`: Build & Deploy the website using github pages.
* `npm run deploy:staging`: Build & Deploy the website to Heroku.

## Directory Structure

For the underscore prefixed (_*) directories, except `_js`, please refer to the Jekyll's documentation.

* `_js`: This is where we keep all the JavaScript source code.
* `assets`: Those are all our assets. `css` and `js` folders are auto-generated, DO NOT edit those files directly.
* `pages`: Separated Jekyll pages.
* `_layouts`: Layouts that templates in `pages` are using. Mostly the default one.
* `_includes`: Various components. `blocks` and `components` will be merged eventually.
* `_data`: All data of the site in YAML format.

## CSS

We write CSS using SASS but with not a specific methodology. Hence, it is known that our current code is a bit messed up.
First step is to clean our current CSS codebase and then find a proper methodology to use.

Step up if you think you can help!

### JS

We use webpack to compile our JavaScript. All assets/dependencies(except the critical ones, such as base CSS)
are being loading through JS files.

An example is the `_js/homepage.js` file, where:

* `utils/common.js` is common for every page, so include it in your file
* `require.ensure` will make sure that the dependencies are being load but not evaluated untill you say so.

Webpack will then do it's thing, based on the configuration provided in `gulpfile.js`.

Again, we could use some help from everyone, so step up!

## Troubleshooting

## rmagick

For this error:
> RMagick installation: Can't find MagickWand.h

try out [this solution](https://stackoverflow.com/a/43035892/1955940).

### nokogiri

nokogiri can be a big PITA, first try this:

```shell
bundle update nokogiri
```

And if that fails maybe try this:

```shell
brew unlink libxml2
brew unlink libxslt
brew unlink libiconv
sudo xcode-select --install
gem install nokogiri
```

## License

Copyright ©2016 SKGTech. Licensed under the MIT license.

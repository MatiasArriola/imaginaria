<big><h1 align="center">imaginaria</h1></big>

<p align="center">
  <a href="https://npmjs.org/package/imaginaria">
    <img src="https://img.shields.io/npm/v/imaginaria.svg?style=flat-square"
         alt="NPM Version">
  </a>

  <a href="https://coveralls.io/r/MatiasArriola/imaginaria">
    <img src="https://img.shields.io/coveralls/MatiasArriola/imaginaria.svg?style=flat-square"
         alt="Coverage Status">
  </a>

  <a href="https://travis-ci.org/MatiasArriola/imaginaria">
    <img src="https://img.shields.io/travis/MatiasArriola/imaginaria.svg?style=flat-square"
         alt="Build Status">
  </a>

  <a href="https://npmjs.org/package/imaginaria">
    <img src="http://img.shields.io/npm/dm/imaginaria.svg?style=flat-square"
         alt="Downloads">
  </a>

  <a href="https://david-dm.org/MatiasArriola/imaginaria.svg">
    <img src="https://david-dm.org/MatiasArriola/imaginaria.svg?style=flat-square"
         alt="Dependency Status">
  </a>

  <a href="https://github.com/MatiasArriola/imaginaria/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/imaginaria.svg?style=flat-square"
         alt="License">
  </a>
</p>

<p align="center"><big>
static site generator based on images and videos
</big></p>

**Beta Alert!** If you need something robust this is not for you.

## Dependencies

Needs [ImageMagick](http://www.imagemagick.org/script/index.php) and [FFmpeg](https://www.ffmpeg.org/).

## Install

```sh
npm i -g imaginaria
```

## Usage

```sh
imaginaria --help
imaginaria init myNewSite && cd myNewSite
# put some images into _files
imaginaria build
imaginaria serve
```

## Templating

[liquid](http://liquidmarkup.org/) is the default templating language, using [liquid-node](https://github.com/sirlantis/liquid-node).

*TODO: Variables available*

    files: []
    images: []
    videos: []

## Motivation
This project is born from the need to automate the process of sharing my Android Camera gallery as a webpage. That includes things like image and video optimization, access to metadata/gps info and html generation.

## Roadmap

* Paging support
* Album support
* Make ImageMagick and ffmpeg optional
* Tune video compression (takes too long, bad outcome)

## License

MIT © [Matias Arriola](http://github.com/MatiasArriola)

[npm-url]: https://npmjs.org/package/imaginaria
[npm-image]: https://img.shields.io/npm/v/imaginaria.svg?style=flat-square

[travis-url]: https://travis-ci.org/MatiasArriola/imaginaria
[travis-image]: https://img.shields.io/travis/MatiasArriola/imaginaria.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/MatiasArriola/imaginaria
[coveralls-image]: https://img.shields.io/coveralls/MatiasArriola/imaginaria.svg?style=flat-square

[depstat-url]: https://david-dm.org/MatiasArriola/imaginaria
[depstat-image]: https://david-dm.org/MatiasArriola/imaginaria.svg?style=flat-square

[download-badge]: http://img.shields.io/npm/dm/imaginaria.svg?style=flat-square

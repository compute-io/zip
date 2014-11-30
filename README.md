Zip
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Generates array tuples from input arrays.


## Installation

``` bash
$ npm install compute-zip
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var zip = require( 'compute-zip' );
```

#### zip( arr1, arr2,...[, opts] )

Returns an `array` of `arrays`, where the ith element (tuple) in the returned `array` contains the ith elements of the input `arrays`.

``` javascript
var zipped = zip( [1,2], ['a','b'] );
// returns [ [1,'a'], [2,'b'] ]
```

By default, the returned `array` length is the length of the shortest input `array`.

``` javascript
var zipped = zip( [1,2,3], ['a','b'] );
// returns [ [1,'a'], [2,'b'] ]
```

The function accepts an `options` object with optional properties:

*	__trunc__: `boolean` specifying whether the returned `array` should truncate `arrays` longer than the shortest `array`. Default: `true`.
*	__fill__: fill value used for unequal length `arrays`. Default: `null`.
*	__arrays__: `boolean` specifying whether, when provided a single input `array`, the function should interpret the argument as a list of `arrays` to be zipped (i.e., behavior similar to `zip.apply(null, arr)`). Default: `false`.

To turn off truncation,

``` javascript
var opts = {
	'trunc': false	
};

var zipped = zip( [1,2,3], ['a','b'], opts );
// returns [ [1,'a'], [2,'b'], [3,null] ]
```

A fill value is included in each tuple for each `array` which does not have an element at the ith index. By default, the fill value is `null`. To specify a different fill value, set the `fill` option.

``` javascript
var opts = {
	'trunc': false,
	'fill': ''
};

var zipped = zip( [1,2,3], ['a','b'], opts );
// returns [ [1,'a'], [2,'b'], [3,''] ]
```

If the function should interpret a single input `array` as an `array` of `arrays` to be zipped,

``` javascript
var arr = [[1,2], ['a','b']],
	zipped;

// Default behavior:
zipped = zip( arr );
// returns [ [[1,2]], [['a','b']] ]

// Array of arrays:
zipped = zip( arr, { 'arrays': true } );
// returns [ [1,'a'], [2,'b'] ]
```


## Examples

``` javascript
var zip = require( 'compute-zip' );

// Simulate some data...
var x = new Array( 100 ),
	len = x.length,
	y1 = new Array( len ),
	y2 = new Array( len ),
	y3 = new Array( len );

for ( var i = 0; i < len; i++ ) {
	x[ i ] = Date.now();
	y1[ i ] = Math.random() * 100;
	y2[ i ] = Math.random() * 100;
	y3[ i ] = Math.random();
}

var zipped = zip( x, y1, y2, y3 );

console.log( zipped.join( '\n' ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

This function is inspired by Python's [`zip`](https://docs.python.org/3.3/library/functions.html#zip) function.


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-zip.svg
[npm-url]: https://npmjs.org/package/compute-zip

[travis-image]: http://img.shields.io/travis/compute-io/zip/master.svg
[travis-url]: https://travis-ci.org/compute-io/zip

[coveralls-image]: https://img.shields.io/coveralls/compute-io/zip/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/zip?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/zip.svg
[dependencies-url]: https://david-dm.org/compute-io/zip

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/zip.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/zip

[github-issues-image]: http://img.shields.io/github/issues/compute-io/zip.svg
[github-issues-url]: https://github.com/compute-io/zip/issues

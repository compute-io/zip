/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	zip = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-zip', function tests() {

	it( 'should export a function', function test() {
		expect( zip ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided at least one array', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			true,
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				zip( value );
			};
		}
	});

	it( 'should throw an error if an invalid argument besides at least one array and the options argument', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			true,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				zip( [], value, {} );
			};
		}
	});

	it( 'should throw an error if provided an invalid options argument', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			true,
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				zip( [], value );
			};
		}
	});

	it( 'should throw an error if the `trunc` option is not a boolean', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				zip( [], {'trunc': value} );
			};
		}
	});

	it( 'should throw an error if the `arrays` option is not a boolean', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				zip( [], {'arrays': value} );
			};
		}
	});

	it( 'should allow any value for the fill option', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			true,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( okayValue( values[i] ) ).to.not.throw( Error );
		}

		function okayValue( value ) {
			return function() {
				zip( [], {'fill': value} );
			};
		}
	});

	it( 'should throw an error if options but no array', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			zip( {} );
		}
	});

	it( 'should zip arrays', function test() {
		var x, y, z, expected, actual;

		x = [ 1, 2 ];
		y = [ 'a', 'b' ];
		z = [ true, false ]

		expected = [ [1,'a'], [2,'b'] ];
		actual = zip( x, y );

		assert.deepEqual( actual, expected );

		expected = [ [1,'a',true], [2,'b',false] ];
		actual = zip( x, y, z );

		assert.deepEqual( actual, expected );
	});

	it( 'should zip arrays and, by default, output an array with length equal to the shortest input array', function test() {
		var x, y, expected, actual;

		x = [ 1, 2, 3 ];
		y = [ 'a', 'b' ];

		expected = [ [1,'a'], [2,'b'] ];
		actual = zip( x, y );

		assert.deepEqual( actual, expected );
	});

	it( 'should zip arrays and insert nulls into tuples for arrays shorter than the tuple index', function test() {
		var x, y, expected, actual;

		x = [ 1, 2, 3 ];
		y = [ 'a', 'b' ];

		expected = [ [1,'a'], [2,'b'], [ 3, null ] ];
		actual = zip( x, y, { 'trunc': false } );

		assert.deepEqual( actual, expected );

		x = [ 1, 2 ];
		y = [ 'a', 'b', 'c' ];

		expected = [ [1,'a'], [2,'b'], [ null, 'c' ] ];
		actual = zip( x, y, { 'trunc': false } );

		assert.deepEqual( actual, expected );
	});

	it( 'should allow arbitrary fill values', function test() {
		var x, y, expected, actual;

		x = [ 1, 2, 3 ];
		y = [ 'a', 'b' ];

		expected = [ [1,'a'], [2,'b'], [ 3, 'beep' ] ];
		actual = zip( x, y, { 'trunc': false, 'fill': 'beep' } );

		assert.deepEqual( actual, expected );

		x = [ 1, 2 ];
		y = [ 'a', 'b', 'c' ];

		expected = [ [1,'a'], [2,'b'], [ 0, 'c' ] ];
		actual = zip( x, y, { 'trunc': false, 'fill': 0 } );

		assert.deepEqual( actual, expected );
	});

	it( 'should zip an array of arrays', function test() {
		var x, expected, actual;

		x = [ [ 1, 2 ], [ 'a', 'b' ] ];

		expected = [ [1,'a'], [2,'b'] ];
		actual = zip( x, { 'arrays': true } );

		assert.deepEqual( actual, expected );
	});

});

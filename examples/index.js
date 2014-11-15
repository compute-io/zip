'use strict';

var zip = require( './../lib' );

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

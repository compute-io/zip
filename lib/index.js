/**
*
*	COMPUTE: zip
*
*
*	DESCRIPTION:
*		- Generates array tuples from input arrays.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014-2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isArray = require( 'validate.io-array' ),
	isBoolean = require( 'validate.io-boolean-primitive' );


// ZIP //

/**
* FUNCTION: zip( arr1, arr2,...[, opts] )
*	Generates array tuples from input arrays.
*
* @param {...Array} arr - input arrays to be zipped
* @param {Object} [opts] - function options
* @param {Boolean} [opts.trunc=true] - boolean indicating whether to truncate arrays longer than the shortest input array
* @param {*} [opts.fill=null] - fill value used for arrays of unequal length
* @param {Boolean} [opts.arrays=false] - boolean indicating whether an input array should be interpreted as an array of arrays to be zipped
*/
function zip() {
	var args = Array.prototype.slice.call( arguments ),
		numArgs = args.length,
		opts = {},
		fill = null,
		arg,
		flg,
		len,
		out,
		arr,
		val,
		i, j;

	for ( i = 0; i < numArgs-1; i++ ) {
		if ( !isArray( args[i] ) ) {
			throw new TypeError( 'zip()::invalid input argument. Must provide array arguments. Value: `' + args[i] + '`.' );
		}
	}
	arg = args[ numArgs-1 ];
	flg = isObject( arg );
	if ( !flg && !isArray( arg ) ) {
		throw new TypeError( 'zip()::invalid input argument. Last argument must be either an array or an options object. Value: `' + arg + '`.' );
	}
	if ( flg ) {
		opts = args.pop();
	}
	numArgs = args.length;
	if ( numArgs === 0 ) {
		throw new Error( 'zip()::insufficient input arguments. Must provide at least one array.' );
	}
	if ( opts.hasOwnProperty( 'trunc' ) ) {
		if ( !isBoolean( opts.trunc ) ) {
			throw new TypeError( 'zip()::invalid option. `trunc` option must be a boolean.  Value: `' + opts.trunc + '`.' );
		}
	} else {
		opts.trunc = true;
	}
	if ( opts.hasOwnProperty( 'fill' ) ) {
		fill = opts.fill;
	}
	if ( opts.hasOwnProperty( 'arrays' ) ) {
		if ( !isBoolean( opts.arrays ) ) {
			throw new TypeError( 'zip()::invalid option. `arrays` option must be a boolean. Value: `' + opts.arrays + '`.' );
		}
	} else {
		opts.arrays = false;
	}
	if ( numArgs === 1 && opts.arrays ) {
		// Treat the lone array argument as an array of arrays to be zipped...
		args = args[ 0 ];
		numArgs = args.length;
	}
	len = args[ 0 ].length;
	if ( opts.trunc ) {
		// Find the min array length...
		for ( i = 0; i < numArgs; i++ ) {
			val = args[ i ].length;
			if ( val < len ) {
				len = val;
			}
		}
	} else {
		// Find the max array length...
		for ( i = 0; i < numArgs; i++ ) {
			val = args[ i ].length;
			if ( val > len ) {
				len = val;
			}
		}
	}
	out = new Array( len );
	for ( j = 0; j < len; j++ ) {
		// Temporary array to store tuples...
		arr = new Array( numArgs );

		// Create the tuples...
		for ( i = 0; i < numArgs; i++ ) {
			arg = args[ i ];

			// If an array is too short, use a fill value...
			if ( arg.length <= j ) {
				arr[ i ] = fill;
				continue;
			}
			arr[ i ] = arg[ j ];
		}
		out[ j ] = arr;
	}
	return out;
} // end FUNCTION zip()


// EXPORTS //

module.exports = zip;

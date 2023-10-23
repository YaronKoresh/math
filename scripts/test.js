import { hex, base62, base64, Fibonacci, Zeros, GetBit, CountSetBits, CountDiffBits, MeasureBits, Bases, AnyToDecimal, ToDecimal, BinaryToAny, FromBinary, BinaryToDecimal, DecimalToAny, FromDecimal, StringToBytes, BytesToString, SecureRandom, Random, Xor, Bmi, RoundUp, RoundDown, Lcm, Gcd, RangedOperation, Greater, Multiply, Modulus, Mod, Divide, Root, Power, Add, Subtract, AddUnsignedBinary, AddBinary, SubtractUnsignedBinary, SubtractBinary } from "../dist/bundle.mjs";

let results = [];

/* 1 */ results.push( AddBinary( [ "1010", "001" ], "111", 10 ) === "10100" );
/* 2 */ results.push( Add( [ 2, -5.5 ], 3.9, 0.044 ) === "0.444" );
/* 3 */ results.push( Subtract( 12345.001 , 6789.0001 ) === "5556.0009" );
/* 4 */ results.push( Power( 450.89, 3 ) === "91666745.039969" );
/* 5 */ results.push( Root( -3, 3 ) === "-1.442" );
/* 6 */ results.push( Divide( -3, 4.6, 16 ) === "-0.6521739130434782" );
/* 7 */ results.push( Multiply( -3, 3.3 ) === "-9.9" );
/* 8 */ results.push( Greater( -99999, 0.1 ) === "0.1" );
/* 9 */ results.push( RangedOperation( 10, 3, 2, "add" ) === "24" );
/* 10 */ results.push( Add(-1.5,-0.8) === "-2.3" );
/* 11 */ results.push( Subtract(-0.7,0.4) === "-1.1" );
/* 12 */ results.push( SubtractBinary(-10,-1) === "-1" );
/* 13 */ results.push( SubtractBinary(100,2) === null );
/* 14 */ results.push( AddBinary(100,3) === null );
/* 15 */ results.push( AddBinary(-0,0,-1,0,-0) === "-1" );
/* 16 */ results.push( AddBinary(-0,0) === "0" );
/* 17 */ results.push( SubtractBinary( [ 0 ], 1, "1" ) === "-10" );
/* 18 */ results.push( FromDecimal("511","23456789") === "999" );
/* 19 */ results.push( Power( [2, "2"] ) === "4" );

console.log("\n\n\n");

results.map( function(result,index){
	if( result === true ){
		console.log(`\nTest ${index+1}:\nOK :)\n`);
	} else {
		console.log(`\nTest ${index+1}:\nFailed :(\n`);
	}
});

console.log("\n\n\n");
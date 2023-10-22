import { hex, base62, base64, Fibonacci, Zeros, GetBit, CountSetBits, CountDiffBits, MeasureBits, Bases, AnyToDecimal, ToDecimal, BinaryToAny, FromBinary, BinaryToDecimal, DecimalToAny, FromDecimal, StringToBytes, BytesToString, SecureRandom, Random, Xor, Bmi, RoundUp, RoundDown, Lcm, Gcd, RangedOperation, Greater, Multiply, Modulus, Mod, Divide, Root, Power, Add, Subtract, AddUnsignedBinary, AddBinary } from "./index.mjs";

// TEST 1

const test1 = AddBinary( [ "1010", "001" ], "111", 10 ) === "10100";
console.log( test1 );

// TEST 2

const test2 = Add( [ 2, -5.5 ], 3.9, 0.044 ) === "0.444";
console.log( test2 );

// TEST 3

const test3 = Subtract( 12345.001 , 6789.0001 ) === "5556.0009";
console.log( test3 );

// TEST 4

const test4 = Power( 450.89, 3 ) === "91666745.039969";
console.log( test4 );

// TEST 5

const test5 = Root( -3, 3 ) === "-1.442";
console.log( test5 );

// TEST 6

const test6 = Divide( -3, 4.6, 16 ) === "-0.6521739130434782";
console.log( test6 );

// TEST 7

const test7 = Multiply( -3, 3.3 ) === "-9.9";
console.log( test7 );

// TEST 8

const test8 = Greater( -99999, 0.1 ) === "0.1";
console.log( test8 );

// TEST 9

const test9 = RangedOperation( 10, 3, 2, "add" ) === "24";
console.log( test9 );

// TEST 10

const test10 = Add(-1.5,-0.8) === "-2.3";
console.log( test10 );

// TEST 11

const test11 = Subtract(-0.7,0.4) === "-1.1";
console.log( test11 );
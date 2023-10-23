### @yaronkoresh/math: Implements mathematical operations using String type only, to avoid 32/64 bit integers limits.

- - -

# About the project:

* The project was created by Yaron Koresh <aharonkoresh1@gmail.com>

* This project supports ESM/CJS & the browser.

* This project is licensed under the MIT open-source license.

- - -

# What it does?

* Executes mathematic operations using strings.

* Not limited by bits (32/64 or even more).

* Support for float & negative decimals.

- - -

# How it works?

1. To avoid errors, Any input is converted into string type, to ensure the string type.

2. Calculations are created and optimized, depend on the chosen operation & the type of the operands.

3. Returns a string with the final results.

- - -

# Basic installation:

* To install the npm package, run: `npm i @yaronkoresh/math`

* To use it inside the browser, add the following tag into the HTML head tag: `<script src="https://unpkg.com/@yaronkoresh/math@latest/dist/bundle.min.js"></script>`.

- - -

# Basic Usage:

* When using node & npm, import/require a module simply by the standard syntax. The npm package supports both of them.

* When using the browser, exports of this project are available under a global object, called `$math`.

# Do you need help?

* Before asking general support questions, please make sure you are using the [latest version](https://github.com/YaronKoresh/math/releases/latest).

* When looking for support, please first search for your question in [open or closed issues](https://github.com/YaronKoresh/math/issues?q=is%3Aissue).

* GitHub issues are a good way for tracking enhancements and bugs, but also for get some help.

* Feel free to open new issues, using one of the available templates, or create an issue from scratch.

- - -

# What exports are available?

#### Using "AddUnsignedBinary" / "AddBinary":

* Purpose: Addition of binary strings/Arrays.

* Parameters:

* * Binaries: Two binary strings/arrays or more (required).

* Examples:

* * `AddBinary( [ "1010", "001" ], "111", 10 )` , which returns "10100".

* * `AddBinary( 1, 10 )` , which returns "11".

- - -

#### Using "Add":

* Purpose: Addition of decimal strings/Arrays.

* Parameters:

* * Decimals: Two decimal strings/arrays or more (required).

* Examples:

* * `Add( [ 2, -5.5 ], 3.9, 0.044 )` , which returns "0.444".

* * `Add(11.98,-12.97)` , which returns "-0.99".

- - -

#### Using "Subtract":

* Purpose: Subtraction of decimal strings/Arrays.

* Parameters:

* * Decimals: Two decimal strings/arrays or more (required).

* Examples:

* * `Subtract( 12, 1, 1, 1 )` , which returns "9".

* * `Subtract( 12345.001 , 6789.0001 )` , which returns '5556.0009'.

- - -

#### Using "Power":

* Purpose: Power of decimal strings/Arrays.

* Parameters:

* * Decimals: Two decimal strings/arrays or more (required).

* Examples:

* * `Power( 450.89, 3 )` , which returns "91666745.039969".

* * `Power( 49.1, -3 )` , which returns "0.00000844803148236653793528133731594939091847260165".

- - -

#### Using "Root":

* Purpose: Finds the root of a decimal.

* Parameters:

* * Target: The decimal to get the root from it (required).

* * Power: The root's calculation factor (required).

* * Precision: The amount of digits below the decimal floating point (default = 3).

* Examples:

* * `Root( -3, 3 )` , which returns "-1.442".

* * `Root( 40, 3, 1 )` , which returns "3.4".

- - -

#### Using "Divide":

* Purpose: Division of two decimals, with removal of repeating patterns below the floating point (e.g. 0.666666 will become 0.6).

* Parameters:

* * NumberA: The divided number (required).

* * NumberB: The dividing number (required).

* * Precision: The amount of digits below the decimal floating point (default = 6).

* Examples:

* * `Divide( -3, 4.6, 16 )` , which returns "-0.6521739130434782".

* * `Divide( 5.5, 3.3)` , which returns "1.6".

- - -

#### Using "Multiply":

* Purpose: Multiplication of two or more decimals.

* Parameters:

* * Decimals: Two decimal strings/arrays or more (required).

* Examples:

* * `Multiply( -3, 3.3 )` , which returns "-9.9".

* * `Multiply( 22.2, 0, 44.1 )` , which returns "0".

- - -

#### Using "Greater":

* Purpose: A "greater than" logical expression between two numbers, which returns the greater number, or returns true when the numbers are equal.

* Parameters:

* * NumberA: First number (required).

* * NumberB: Second number (required).

* Examples:

* * `Greater( -0, 0.0 )` , which returns true.

* * `Greater( -99999, 0.1 )` , which returns "0.1".

- - -

#### Using "RangedOperation":

* Purpose: Apply an operation on a range of numbers. Can be use for "factorial" style operations.

* Parameters:

* * End: The maximum number to calculate (required).

* * Start: The minimum number to calculate (default = 1).

* * Step: The size for each jump between numbers (default = 1).

* * Action: The operation to be used on each number. Could be "mul", "pow" or "add" (default = "mul").

* Examples:

* * `RangedOperation( 5 )` , which returns "120".

* * `RangedOperation( 10, 3, 2, "add" )` , which returns "24".

- - -

#### Using "Mod" / "Modulus":

* Purpose: Get the remainder of a division operation. applied on two or more decimals.

* Parameters:

* * Decimals: Two decimal strings/arrays or more (required).

* Examples:

* * `Mod( 5, 2 )` , which returns "1".

* * `Modulus( -6.4, 4 )` , which returns "-2.4".

- - -

#### Using "Gcd":

* Purpose: Get the greatest common divisor of two decimals.

* Parameters:

* * NumberA: The first decimal (required).

* * NumberB: The second decimal (required).

* Examples:

* * `Gcd( 120, 90 )` , which returns "30".

* * `Gcd( 10, 7 )` , which returns "1".

- - -

#### Using "Lcm":

* Purpose: Get the least common multiply of two decimals.

* Parameters:

* * NumberA: The first decimal (required).

* * NumberB: The second decimal (required).

* Examples:

* * `Lcm( 10, 15 )` , which returns "30".

* * `Lcm( 35, 40 )` , which returns "280".

- - -

#### Using "RoundDown":

* Purpose: Round a decimal, down to the closest lower multiply of the selected factor.

* Parameters:

* * Number: The decimal to be rounded (required).

* * Factor: The factor to get the closest multiply (required).

* Examples:

* * `RoundDown(-8.9,0.4)` , which returns "-9.2".

* * `RoundDown(91573,17)` , which returns "91562".

- - -

#### Using "RoundUp":

* Purpose: Round a decimal, up to the closest higher multiply of the selected factor.

* Parameters:

* * Number: The decimal to be rounded (required).

* * Factor: The factor to get the closest multiply (required).

* Examples:

* * `RoundUp(8.9,0.4)` , which returns "9.2".

* * `RoundUp(91573,17)` , which returns "91579".

- - -

#### Using "Bmi":

* Purpose: Calculates the body mass index, using weight & height.

* Parameters:

* * Weight: The weight of a human - in kilos (required).

* * Height: The height of a human - in meters (required).

* Examples:

* * `Bmi(80,1.82)` , which returns "24.15".

* * `Bmi(130,1.8)` , which returns "40.12".

- - -

#### Using "Xor":

* Purpose: Apply an Exclusive-Or binary operation, on two decimals.

* Parameters:

* * NumberA: The first decimal (required).

* * NumberB: The second decimal (required).

* Examples:

* * `Xor(80,80)` , which returns "0".

* * `Xor(80,78)` , which returns "30".

- - -

#### Using "Random" / "SecureRandom":

* Purpose: Generate a cryptographic secure random number, between a minimum & a maximum.

* Parameters:

* * Minimum: The minimum for the random number (default = 0).

* * Maximum: The maximum for the random number (default = 100).

* Examples:

* * `SecureRandom(-1,1)` , which returns "-1".

* * `Random(-17,17)` , which returns "4".

- - -

#### Using "StringToBytes":

* Purpose: Encodes a string into Utf-8 bytes.

* Parameters:

* * String: The string to encode (required).

* Examples:

* * `StringToBytes("Hola! Shalom!")` , which returns [ 72, 111, 108, 97,  33, 32,  83, 104, 97, 108, 111, 109,  33 ].

* * `StringToBytes("Yum 😋")` , which returns [ 89, 117, 109,  32, 240, 159, 152, 139 ].

- - -

#### Using "BytesToString":

* Purpose: Decodes Utf-8 bytes back to a string.

* Parameters:

* * Bytes: The bytes to decode. Could be writen as numbers, strings - as single values or as arrays &  (required).

* Examples:

* * `BytesToString(72, 111, 108, 97,  33, 32,  83, 104, 97, 108, 111, 109,  33)` , which returns "Hola! Shalom!".

* * `BytesToString(89, 117, "109",  32, [240, 159, 152 ], "139")` , which returns "Yum 😋".

- - -

#### Using "FromDecimal" / "DecimalToAny":

* Purpose: Convert a decimal into other bases, or into a standard Utf-8 string.

* Parameters:

* * Number: The number to be converted (required).

* * Charset: The characters of the targeted base. `null` means a Utf-8 standard string (default = null).

* Examples:

* * `FromDecimal(65)` , which returns "A".

* * `FromDecimal(65,"01")` , which returns "1000001".

- - -

#### Using "BinaryToDecimal":

* Purpose: Convert binary digits into a decimal number.

* Parameters:

* * Binary: The binary digits to be converted (required).

* Examples:

* * `BinaryToDecimal(1000001)` , which returns "65".

* * `BinaryToDecimal(10)` , which returns "2".

- - -

#### Using "FromBinary" / "BinaryToAny":

* Purpose: Convert binary digits into other bases, or into a standard Utf-8 string.

* Parameters:

* * Binary: The binary to be converted (required).

* * Charset: The characters of the targeted base. `null` means a Utf-8 standard string (default = null).

* Examples:

* * `FromBinary(1000001)` , which returns "A".

* * `FromBinary(1010)` , which returns "\n".

- - -

#### Using "ToDecimal" / "AnyToDecimal":

* Purpose: Convert other bases / standard Utf-8 string, into a decimal number.

* Parameters:

* * Value: The value to be converted (required).

* * Charset: The characters of the original value. `null` means a Utf-8 standard string (default = null).

* Examples:

* * `AnyToDecimal("23AB")` , which returns "50516566".

* * `ToDecimal("101010101010101010","01")` , which returns "174762".

- - -

#### Using "Bases":

* Purpose: The master function for bases conversion. Support any base/Utf8 to any base/Utf8.

* Parameters:

* * String: The original string (required).

* * From: The characters of the original value. `null` means a Utf-8 standard string (default = null).

* * To: The characters of the target base. `null` means a Utf-8 standard string (default = null).

* * Padding: The character to be used for padding in the end of the new result. Use an empty string to disable (default = "").

* Examples:

* * `Bases("23AB","0123456789ABCDEF","0123")` , which returns "2032223".

* * `Bases("Meowwwwww!",null,"012abcZw@")` , which returns "bc212w11cZawbZZZcZwbbw11b".

- - -

#### Using "MeasureBits":

* Purpose: Counts the bits needed for a decimal binary representation.

* Parameters:

* * Number: The measured number (required).

* Examples:

* * `MeasureBits(9999)` , which returns "14".

* * `MeasureBits(0)` , which returns "1".

- - -

#### Using "CountDiffBits":

* Purpose: Counts the binary bits with the same index, between two decimals, that are different ("0" & "1").

* Parameters:

* * NumberA: The first number (required).

* * NumberB: The second number (required).

* Examples:

* * `CountDiffBits(0,3)` , which returns "2".

* * `MeasureBits(10,1)` , which returns "3".

- - -

#### Using "CountSetBits":

* Purpose: Counts the binary bits that are equal to "1".

* Parameters:

* * Number: The number to be counted (required).

* Examples:

* * `MeasureBits(8)` , which returns "1".

* * `CountSetBits(12)` , which returns "2".

- - -

#### Using "GetBit":

* Purpose: Get the value of a bit inside a specific index,  ordered from low to high.

* Parameters:

* * Number: The number to be binary searched (required).

* * Position: The steps to go higher from the lowest bit, until the targeted bit (required).

* Examples:

* * `GetBit(4,2)` , which returns "1".

* * `GetBit(4,0)` , which returns "0".

- - -

#### Using "Zeros":

* Purpose: Pad a number with zeros, tp the left, or, to the right side of it. Pad until the textual length equal or more to desired minimal textual length.

* Parameters:

* * Number: The number to be paded (required).

* * Length: The length that is enough for the padding process to stop (required).

* * Side: The side to get all the zeros. Could be "left" of "right" - case-insensitive (default = "left").

* Examples:

* * `Zeros(4,3)` , which returns "004".

* * `Zeros(4,3,"right")` , which returns "400".

- - -

#### Using "Split":

* Purpose: Split a string into several chunks. Used internally by some operations.

* Parameters:

* * String: The string to be splited (required).

* * Length: The maximum length for each chunk (required).

* Examples:

* * `Split( "hello", 3 )` , which returns ["hel","lo"].

* * `Split( "12345678", 3 )` , which returns ["123","456","78"].

- - -

#### Using "IsRepeatedPattern":

* Purpose: A detector for repeated pattern inside a number. Used by the divide operation to detect endless stream of digits below the decimal point.

* Parameters:

* * Digits: The digits to analyze (required).

* Examples:

* * `IsRepeatedPattern( "363636" )` , which returns true.

* * `IsRepeatedPattern( "033333" )` , which returns true.

- - -

#### Using "Fibonacci":

* Purpose: Generate a fibonacci sequence with a custom length.

* Parameters:

* * Count: The number of Fibonacci numbers to be generated (required).

* Examples:

* * `Fibonacci(0)` , which returns [ ].

* * `Fibonacci(7)` , which returns [ '0', '1', '1', '2', '3', '5', '8' ].

- - -

#### Using "hex":

* Purpose: The base16 standard characters, in uppercase: 0123456789ABCDEF.

- - -

#### Using "base62":

* Purpose: The standard characters for base62, which is numbers, then uppercase english, then lowercase english.

- - -

#### Using "base64":

* Purpose: The standard characters for base62, which is uppercase english, then lowercase english, then numbers, and finally, "+" and "/".
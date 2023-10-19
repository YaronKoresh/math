# @yaronkoresh/math: Implements mathematical operations using String type only, to avoid 32/64 bit integers limits.

## What it does?

* Executes mathematic operations using strings.

* Not limited by bits (32/64 or even more).

* Support for float & negative decimals.

- - -

## How it works?

1. To avoid errors, Any input is converted into string type, to ensure the string type.

2. Calculations are created and optimized, depend on the chosen operation & the type of the operands.

3. Returns a string with the final results.

- - -

## Using "AddUnsignedBinary" / "AddBinary":

* Purpose: Addition of binary strings/Arrays.

* Parameters:

* * Binaries: Two binary strings/arrays or more (required).

* Examples:

* * `AddBinary( [ "1010", "001" ], "111", 10 )` , which returns "10100".

* * `AddBinary( 1, 10 )` , which returns "11".

- - -

## Using "Add":

* Purpose: Addition of decimal strings/Arrays.

* Parameters:

* * Decimals: Two decimal strings/arrays or more (required).

* Examples:

* * `Add( [ 2, -5.5 ], 3.9, 0.044 )` , which returns "0.444".

* * `Add(11.98,-12.97)` , which returns "-0.99".

- - -

## Using "Subtract":

* Purpose: Subtraction of decimal strings/Arrays.

* Parameters:

* * Decimals: Two decimal strings/arrays or more (required).

* Examples:

* * `Subtract( 12, 1, 1, 1 )` , which returns "9".

* * `Subtract( 12345.001 , 6789.0001 )` , which returns '5556.0009'.

- - -

## Using "Power":

* Purpose: Power of decimal strings/Arrays.

* Parameters:

* * Decimals: Two decimal strings/arrays or more (required).

* Examples:

* * `Power( 450.89, 3 )` , which returns "91666745.039969".

* * `Power( 49.1, -3 )` , which returns "0.00000844803148236653793528133731594939091847260165".

- - -

## Using "Root":

* Purpose: Finds the root of a decimal.

* Parameters:

* * Target: The decimal to get the root from it (required).

* * Power: The root's calculation factor (required).

* * Precision: The amount of digits below the decimal floating point (default = 3).

* Examples:

* * `Root( -3, 3 )` , which returns "-1.442".

* * `Root( 40, 3, 1 )` , which returns "3.4".

- - -

## Using "Divide":

* Purpose: Division of two decimals, with removal of repeating patterns below the floating point (e.g. 0.666666 will become 0.6).

* Parameters:

* * NumberA: The divided number (required).

* * NumberB: The dividing number (required).

* * Precision: The amount of digits below the decimal floating point (default = 6).

* Examples:

* * `Divide( -3, 4.6, 16 )` , which returns "-0.6521739130434782".

* * `Divide( 5.5, 3.3)` , which returns "1.6".

- - -

## Using "Multiply":

* Purpose: Multiplication of two or more decimals.

* Parameters:

* * Decimals: Two decimal strings/arrays or more (required).

* Examples:

* * `Multiply( -3, 3.3 )` , which returns "-9.9".

* * `Multiply( 22.2, 0, 44.1 )` , which returns "0".

- - -

## Using "Greater":

* Purpose: A "greater than" logical expression between two numbers, which returns the greater number, or returns true when the numbers are equal.

* Parameters:

* * NumberA: First number (required).

* * NumberB: Second number (required).

* Examples:

* * `Greater( -0, 0.0 )` , which returns true.

* * `Greater( -99999, 0.1 )` , which returns "0.1".

- - -

## Using "RangedOperation":

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

## License:

### This project is licensed under the MIT open-source license.
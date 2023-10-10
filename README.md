# Package & version:

### @yaronkoresh/math v1.0.0

# Description:

### Implements mathematical operations using String type only, to avoid 32/64 bit integers limits.

# How the package works?

1. Inputs are converted into String type.

2. A text decimal base (0-9) is being used for operations, instead of standard Integer type calculation.

3. Returns a string with the final results.

# Example 1:

```
import { AddBinary } from "@yaronkoresh/math";
// or: const { AddBinary } = await import("@yaronkoresh/math");

// Step 1: Let's create some binary data! (ten & one)
const binArray = [ "1010", "001" ];

// Step 2: Let's create some more binary data! (seven)
const binString = "111";

// Step 3: And some more... (two)
const binInteger = 10;

// Step 4: Now, let's sum them all!
const sum = AddBinary( binArray, binString, binInteger );

// The results: "20"
console.log(sum);
```

# Example 2:

```
import { Add } from "@yaronkoresh/math";
// or: const { Add } = await import("@yaronkoresh/math");

// Step 1: Let's create some decimal data! (ten & one)
const decimalArray = [ "10", "1" ];

// Step 2: Let's create some more decimal data! (seven)
const decimalString = "7";

// Step 3: And some more... (two)
const decimalInteger = 2;

// Step 4: Now, let's sum them all!
const sum = Add( decimalArray, decimalString, decimalInteger );

// The results: "20"
console.log(sum);
```

# Example 3:

```
import { Multiply, Power } from "@yaronkoresh/math";
// or: const { Multiply, Power } = await import("@yaronkoresh/math");

// Step 1: Create some data.
const data = [ "2", "4", 2 ];

// Step 2: Now let's Multiply!
const mu = Multiply( data );

// Step 3: Or calculate the power!
const po = Power( data );

// Step 4: Now, let's power again!
const po2 = Power( po, po );

// The results (617 digits! about 2050bit! much longer than 20 digits 64bit maximal bigint!):
// "32317006071311007300714876688669951960444102669715484032130345427524655138867890893197201411522913463688717960921898019494119559150490921095088152386448283120630877367300996091750197750389652106796057638384067568276792218642619756161838094338476170470581645852036305042887575891541065808607552399123930385521914333389668342420684974786564569494856176035326322058077805659331026192708460314150258592864177116725943603718461857357598351152301645904403697613233287231227125684710820209725157101726931323469678542580656697935045997268352998638215525166389437335543602135433229604645318478604952148193555853611059596230656"
console.log(po2);
```

# Example 4:

```
import { Greater } from "@yaronkoresh/math";
// or: const { Greater } = await import("@yaronkoresh/math");

// Step 1: Number-A is...
const numA = "63055331425931356166653185391299891453122800006887791482400448714";

// Step 2: Number-B is...
const numB = "500000000000000000000000000000000000000000000000000000000";

// Step 3: Who is bigger?
const greater = Greater(numA,numB);

// The results: "63055331425931356166653185391299891453122800006887791482400448714"
console.log(greater);
```

# Example 5:

```
import { RangedOperation } from "@yaronkoresh/math";
// or: const { RangedOperation } = await import("@yaronkoresh/math");

// Step 1: Power all the numbers, from 3 to 7 (jumps of 2, just like using: Power(3,5,7) ) 
const po = RangedOperation(7,3,2,"pow");

// The results: "50031545098999707"
console.log(po);
// You also can use "add" & "mul" with a RangedOperation
```

# License:

### This project is licensed under MIT open-source license.
import { Add } from "./Add.js";
import { Subtract } from "./Subtract.js";
import { Greater } from "./Greater.js";
import { Divide } from "./Divide.js";
import { Power } from "./Power.js";
import { Zeros } from "../utils/Zeros.js";

export const Root = function( target, power, precision = "3" ){

	target = Add(target,0).toString();
	power = Add(power,0).toString();
	precision = Add(precision,0).toString();

	if( precision.includes(".") ){
		precision = precision.split(".")[0];
	}
	if( precision.includes("-") ){
		precision = precision.replace("-","");
	}

	if( target.includes("-") && !Divide(power,"2").includes(".") ){
		console.error( "Cannot make an even root of a negative number." );
		return null;
	}

	let negativeTarget = target.includes("-");
	let sign = negativeTarget ? "-" : "";
	target = target.replace("-","");

	let maximumForTesting = Add( Divide(target,power).replace("-","").split(".")[0], 1 );
	if( Greater( maximumForTesting, "2" ) === "2" ){
		maximumForTesting = "2";
	}
	maximumForTesting = maximumForTesting;
	let currentSteper = Zeros( "1", maximumForTesting.replace("-","").length - 1, "right" );
	let max = maximumForTesting;
	console.log(`Root: ${ target } ; Power: ${ power } ; Precision: ${ precision }`);
	while( true ){
		console.log(`Root: ${ target } ; Power: ${ power } ; Attempt: ${max}`);
		let _max = Power( max, power );
		if( _max === target ){
			console.log(`Yey! Found an exact match: ${max}`);
			return sign+max;
		}
		let currentPrecision = (currentSteper.split(".")[1] ?? "").length;
		if( Greater(_max,target) === target ){
			let condition = Greater(currentPrecision,precision);
			if( condition === true ){
				console.log(`Found: ${max} , but will not dive deeper than ${precision} digits.`);
				return sign+max;
			}
			console.log(`Yey! Found: ${max} , Now let's dive deeper...`);
			let nextSteper = Divide(currentSteper,"10");
			max = Add(max,currentSteper);
			max = Subtract(max,nextSteper);
			currentSteper = nextSteper;
		} else {
			console.log(`root ${max} was not matched, keep trying...`);
			max = Subtract(max,currentSteper);
		}
	}
}
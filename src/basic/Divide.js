import { Add } from "./Add.js";
import { Greater } from "./Greater.js";
import { Subtract } from "./Subtract.js";
import { Multiply } from "./Multiply.js";
import { IsRepeatedPattern } from "../utils/IsRepeatedPattern.js";

export const Divide = function( num1, num2, precision="6" ){

	precision = Add(precision,0);

	let nums = [num1,num2];

	if( nums.length < 2 ){
		return null;
	}

	let ret = nums[0].toString() ?? "0";
	nums = nums.slice(1);

	const _Divide = function(ret,num){

		num = num.toString();

		let negativeRet = ret.slice(0,1) === "-";
		let negativeNum = num.slice(0,1) === "-";
		let negative = (!negativeRet && negativeNum) || (negativeRet && !negativeNum);

		let _ret = ret;
		let _num = num;

		ret = ret.replace("-","");
		num = num.replace("-","");

		num = num.toString();
		if( Add(ret,"0") !== "0" && Add(num,"0") === "0" ){
			console.error( "A division of any negative/positive number by zero is invalid." );
			return null;
		}

		let loopValue = "0";
		let rounds = "0";

		let multi = Math.max( ret.split(".")[0].length - num.split(".")[0].length - 1, 0 );
		let floatLen = num.indexOf(".");
		let roundStepSize = "1"+("0").repeat(multi);
		floatLen = floatLen === -1 ? 0 : num.length - floatLen - 1;
		let valueStepSize = floatLen === 0 ? num+("0").repeat(multi) : floatLen <= multi ? num.replace(".","")+("0").repeat( multi - floatLen ) : num.replace(".","").slice( 0, num.replace(".","").length - floatLen + multi ) + "." + num.replace(".","").slice( num.replace(".","").length - floatLen + multi );

		while( true ){
			let nextStep = Add(loopValue,valueStepSize);
			let condition = Greater(nextStep,ret);
			if( condition === true ){
				loopValue = nextStep;
				rounds = Add(rounds,roundStepSize);
				break;
			} else if( condition === ret ){
				loopValue = nextStep;
				rounds = Add(rounds,roundStepSize);
			} else {
				if( multi === 0 ){
					break;
				}
				multi -= 1;
				roundStepSize = "1" + ("0").repeat(multi);
				floatLen = valueStepSize.indexOf(".");
				floatLen = floatLen === -1 ? 0 : valueStepSize.length - floatLen - 1;
				valueStepSize = floatLen === 1 && valueStepSize.slice(valueStepSize.length-1) === "0" ? valueStepSize.slice(0,valueStepSize.length-2) : valueStepSize.slice(valueStepSize.length-1) === "0" ? valueStepSize.slice(0,valueStepSize.length-1) : valueStepSize.replace(".","").slice( 0, valueStepSize.replace(".","").length - floatLen - 1 ) + "." + valueStepSize.replace(".","").slice( valueStepSize.replace(".","").length - floatLen - 1 );
			}
		}

		if( loopValue !== ret && Greater(precision,0) === precision ){

			let rest = Subtract(ret,loopValue);
			let numbersAfterDot = "";
			let isRepeatedPattern = false;

			while( isRepeatedPattern === false ){

				let value = "0";
				let counter = "0";
				let max = Multiply(rest,"10");
				let nextValue = Add(value,num);
				while( Greater(nextValue,max) !== nextValue ){
					value = nextValue;
					nextValue = Add(value,num);
					counter = Add(counter,"1");
				}

				numbersAfterDot += counter;
				if( rest === "0" || numbersAfterDot.length >= parseInt(precision) ){
					while( numbersAfterDot.slice(numbersAfterDot.length-1) === "0" ){
						numbersAfterDot = numbersAfterDot.slice(0,numbersAfterDot.length-1);
					}
					if( numbersAfterDot !== "" ){
						numbersAfterDot = "." + numbersAfterDot;
					}
					console.log(`Dividing ${ _ret  } by ${ _num } into ` + ( negative ? "-" : "" ) + `${ rounds }${ numbersAfterDot }`);
					return ( negative ? "-" : "" ) + `${ rounds }${ numbersAfterDot }`;
				}

				rest = Subtract(max,value);
				isRepeatedPattern = IsRepeatedPattern(numbersAfterDot);
			}
			return ( negative ? "-" : "" ) + `${ rounds }.${ numbersAfterDot.slice( 0, numbersAfterDot.length / 2 ) }`;
		}

		return ( negative ? "-" : "" ) + rounds;
	}

	while( ret.slice(".")[0].length > 1 && ret.slice(0,1) === "0" ){
		ret = ret.slice(1);
	}

	while( ret.includes(".") && ret.slice(ret.length-1) === "0" ){
		ret = ret.slice(0,ret.length-1);
	}

	const Calc = function(num){

		num = num.toString();

		while( num.slice(".")[0].length > 1 && num.slice(0,1) === "0" ){
			num = num.slice(1);
		}

		while( num.includes(".") && num.slice(num.length-1) === "0" ){
			num = num.slice(0,num.length-1);
		}

		ret = _Divide(ret,num);
	}

	nums.map( num => Calc(num) );

	let ret1 = ret.split(".")[0] ?? "0";
	let ret2 = ret.split(".")[1] ?? "0";

	while( ret2.length > 0 && ret2.slice(ret2.length-1) === "0" ){
		ret2 = ret2.slice(0,ret2.length-1);
	}

	if( ret2.length === 0 ){
		return ret1;
	}

	return [ret1,ret2].join(".");
};
import { Subtract } from "./Subtract.js";
import { Add } from "./Add.js";
import { Greater } from "./Greater.js";

export const Modulus = function( ...nums ){

	nums = nums.flat();

	if( nums.length < 2 ){
		return null;
	}

	let ret = nums[0].toString() ?? "0";
	nums = nums.slice(1);

	const _Modulus = function(ret,num){

		num = num.toString();

		let negativeRet = ret.slice(0,1) === "-";
		let negativeNum = num.slice(0,1) === "-";
		let negative = negativeRet;

		let _ret = ret;
		let _num = num;

		ret = ret.replace("-","");
		num = num.replace("-","");

		num = num.toString();
		if( Add(ret,"0") !== "0" && Add(num,"0") === "0" ){
			console.error( "A modulus of any negative/positive number by zero is invalid." );
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

		let rest = Subtract(ret,loopValue);

		return ( negative ? "-" : "" ) + rest;
	}

	const Calc = function(num){

		num = num.toString();

		while( num.slice(".")[0].length > 1 && num.slice(0,1) === "0" ){
			num = num.slice(1);
		}

		while( num.includes(".") && num.slice(num.length-1) === "0" ){
			num = num.slice(0,num.length-1);
		}

		ret = ret === "0" ? "0" : _Modulus(ret,num);
	}

	nums.map( num => Calc(num) );

	return ret;
}
import { Add } from "./Add.js";
import { Subtract } from "./Subtract.js";
import { Greater } from "./Greater.js";
import { MultiplyOptimizer } from "../optimizers/MultiplyOptimizer.js";
import { Zeros } from "../utils/Zeros.js";

export const Multiply = function(...nums) {

	nums = nums.flat();

	if( nums.length < 2 ){
		return null;
	}

	let ret1 = nums[0].toString().split(".")[0] ?? "0";
	let ret2 = nums[0].toString().split(".")[1] ?? "0";
	nums = nums.slice(1);

	const _Multiply = function(ret,num){
		num = Add(num,0);
		ret = Add(ret,0);
		if( Add(ret,0) === "0" || Add(num,0) === "0" ){
			return "0";
		}
		let greater = Greater(ret,num);
		if( greater === num ){
			let temp = num;
			num = ret;
			ret = temp;
		}
		let optimized = MultiplyOptimizer( ret, num );
		let sum = "0";
		while(true){
			if( Greater("0",optimized.low) !== optimized.low ){
				break;
			}
			sum = Add(sum,optimized.high);
			optimized.low = Subtract(optimized.low,1);
		}
		return sum;
	}

	const Calc = function(num){

		let a = num.toString().split(".")[0] ?? "0";
		let b = num.toString().split(".")[1] ?? "0";

		let negativeRet = ret1.slice(0,1) === "-";
		let negativeNum = a.slice(0,1) === "-";
		let negative = (!negativeRet && negativeNum) || (negativeRet && !negativeNum);

		ret1 = ret1.replace("-","");
		a = a.replace("-","");

		while( ret2.slice(ret2.length-1) === "0" && ret2.length > 0 ){
			ret2 = ret2.slice(0,ret2.length-1);
		}

		while( b.slice(b.length-1) === "0" && b.length > 0 ){
			b = b.slice(0,b.length-1);
		}

		ret2 = Zeros( ret2, b.length, "right" );
		b = Zeros( b, ret2.length, "right" );

		let floatLen = ret2.length * 2;	

		let ret3 = ret1 + ret2;
		let ab = a + b;

		let mul = _Multiply( ret3 , ab );

		if( mul === "0" ){
			ret1 = "0";
			ret2 = "0";
		} else {
			ret1 = mul.slice( 0 , mul.length - floatLen );
			ret1 = (ret1 === "" ? ( negative ? "-0" : "0" ) : ( negative ? "-" : "" )) + ret1;
			ret2 = mul.slice( mul.length - floatLen );
		}
	}

	nums.map( num => Calc(num) );

	while( ret2.slice(ret2.length-1) === "0" && ret2.length > 0 ){
		ret2 = ret2.slice(0,ret2.length-1);
	}

	if( ret2.length === 0 ){
		return ret1;
	}

	return [ret1,ret2].join(".");
};
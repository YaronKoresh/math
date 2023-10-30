import { Divide } from "./Divide.js";
import { Greater } from "./Greater.js";
import { Multiply } from "./Multiply.js";
import { Subtract } from "./Subtract.js";
import { Add } from "./Add.js";
import { DivisionOptimizer } from "../optimizers/DivisionOptimizer.js";

export const Power = function(...nums) {

	nums = nums.flat();

	if( nums.length < 2 ){
		return null;
	}

	let ret = nums[0].toString();
	nums = nums.slice(1);

	const _Power = function(ret,num){
		num = Add(num,0);
		ret = Add(ret,0);
		if( num === "0" && Add(ret,0) === "0" ){
			console.error( "Power of zeros, is invalid." );
			return null;
		} else if( num === "0" ){
			return "1";
		} else if( Add(ret,0) === "1" ){
			return "1";
		} else if( Add(ret,0) === "0" ){
			return "0";
		}

		let sign = "";
		if( ret.slice(0,1) === "-" ){
			ret = ret.slice(1);
			if( Divide( num, 2 ).includes(".") ){
				sign = "-";
			}
		}

		let floatLen = (ret.split(".")[1] ?? "").length * num;

		ret = ret.replace(".", "");
		num = Subtract(num, 1);

		let sum = ret;
		while (true) {
			if (Greater("0", num) !== num) {
				break;
			}
			sum = Multiply(sum, ret);
			num = Subtract(num, 1);
		}
		sum = sum.replace(".","");
		let n1 = sum.slice( 0, sum.length - floatLen );
		let n2 = "." + sum.slice( sum.length - floatLen );
		return sign + (n1 === "" ? "0" : n1)  + (n2 === "." ? "" : n2);
	}

	const Calc = function(num){

		let a = num.toString().split(".")[0] ?? "0";
		let b = num.toString().split(".")[1] ?? "0";

		let negativeNum = a.slice(0,1) === "-";
		a = a.replace("-","");

		if( b !== "0" ){

			if( ret.includes("-") ){
				console.log("A negative number, to the power of a float, is invalid.");
				return null;
			}

			let pow = _Power(ret, a);

			let n1 = "1" + "0".repeat(b.length);
			let n2 = b;

			let n = DivisionOptimizer(n1,n2);
			n1 = n.a;
			n2 = n.b;

			let root = Root( ret, n1 );

			let factor = Power( root, n2 );

			ret = Multiply( _Power(ret, a), factor );

		} else {
			ret = _Power(ret, a);
		}

		if( negativeNum ){
			let _ret = ret;
			ret = Divide(1,ret);
			console.log(`Transforming: ${ _ret } ==> ${ ret } (Reason: negative power)`);
		}
	}

	nums.map( num => Calc(num) );

	return ret;
};
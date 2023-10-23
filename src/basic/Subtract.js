import { Add } from "./Add.js";
import { Greater } from "./Greater.js";
import { Zeros } from "../utils/Zeros.js";

export const Subtract = function(...nums) {

	nums = nums.flat();

	if( nums.length < 2 ){
		return null;
	}

	let ret1 = nums[0].toString().split(".")[0] ?? "0";
	let ret2 = nums[0].toString().split(".")[1] ?? "0";
	nums = nums.slice(1);

	if( ret1.slice(0,1) === "-" ){
		ret2 = "-" + ret2;
	}

	const _Subtract = function( ret, num ){

		if( !Array.isArray( ret ) ){
			ret = [...ret.toString().split("")].reverse();
		}

		if( !Array.isArray( num ) ){
			num = [...num.toString().split("")].reverse();
		}

		let negativeResult = null;
		let retIsNegative = null;
		let numIsNegative = null;

		let greater = null;

		greater = Greater( [...ret].reverse().join(""), 0 );
		if( greater === "0" ){
			retIsNegative = true;
			ret = ret.slice( 0, ret.length-1 );
		} else {
			retIsNegative = false;
		}

		greater = Greater( [...num].reverse().join(""), 0 );
		if( greater === "0" ){
			numIsNegative = true;
			num = num.slice( 0, num.length-1 );
		} else {
			numIsNegative = false;
		}

		greater = Greater( [...ret].reverse().join(""), [...num].reverse().join("") );
		if(
			(
				retIsNegative && numIsNegative && greater !== [...num].reverse().join("")
			) || (
				retIsNegative && !numIsNegative
			) || (
				!retIsNegative && !numIsNegative && greater === [...num].reverse().join("")
			)
		){
			negativeResult = true;
		} else {
			negativeResult = false;
		}

		if( greater === [...num].reverse().join("") ){
			let _num = num;
			num = ret;
			ret = _num;
		}

		let carry = 0;
		for( let i = 0 ; i < Math.max(ret.length , num.length) ; i++ ){
			if(
				(!retIsNegative && numIsNegative) ||
				(retIsNegative && !numIsNegative)
			){
				ret = [...Add( [...ret].reverse().join(""), [...num].reverse().join("") ).split("")].reverse();
				break;
			} else {
				let diff = [...( parseInt(ret[i] ?? 0) - carry - parseInt(num[i] ?? 0) ).toString().split("")].reverse();
				ret[i] = diff.length === 3 ? "0" : diff.length === 2 ? 10 - +diff[0] : diff[0];
				carry = diff.length > 1 ? 1 : 0;
			}
		}
		while( ret[ret.length-1] === "0" && ret.length > 1 ){
			ret = ret.slice(0,ret.length-1);
		}
		if( negativeResult ){
			ret.push("-");
		}
		return [...ret].reverse().join("");
	}
	nums.map( function(num){

		let sign = ret1.slice(0,1) === "-" ? "-" : "";
		ret2 = ret2.replace("-","");

		let a = num.toString().split(".")[0] ?? "0";
		let b = num.toString().split(".")[1] ?? "0";

		ret2 = Zeros( ret2, b.length, "right" );
		b = Zeros( b, ret2.length, "right" );

		if( a.slice(0,1) === "-" && b !== 0 ){
			b = "-" + b;
		}

		ret1 = _Subtract( ret1, a );

		let floatLen = ret2.length;

		let test = _Subtract( sign + ret2, b );
		if( test.slice(0,1) !== "-" ){
			test = Zeros(test,floatLen);
		}

		if( test.replace("-","").length > ret2.length ){

			if( test.includes("-") ){
				ret1 = "-" + Add( ret1.replace("-","") , "1" );
				test = "-" + test.slice(2);
			} else {
				ret1 = Add( ret1, "1" );
				test = test.slice(1);
			}
		}

		if( test.slice(0,1) === "-" ){

			test = test.replace("-","");
			if( ret1.slice(0,1) !== "-" ){
				ret1 = Subtract( ret1 , "1" );
				test = Subtract( "1" + ("0").repeat( ret2.length ) , test );
			}

		} else if( ret1.slice(0,1) === "-" && Add(test,0) !== "0" ){

			ret1 = Add( ret1 , "1" );
			if( !ret1.includes("-") ){
				ret1 = "-" + ret1;
			}
			test = Subtract( "1" + ("0").repeat( ret2.length ) , test );
		}

		test = Zeros( test, ret2.length );

		ret2 = test;
	});

	while( ret2.slice(ret2.length-1) === "0" && ret2.length > 0 ){
		ret2 = ret2.slice(0,ret2.length-1);
	}

	if( ret2.length === 0 ){
		return ret1;
	}

	return [ret1,ret2].join(".");
};
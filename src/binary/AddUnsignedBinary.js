import { Greater } from "../basic/Greater.js";
import { SubtractBinary } from "./SubtractBinary.js";

export const AddUnsignedBinary = function(...bins) {

	bins = bins.flat();

	bins = bins.map( bin => bin.toString().split("").reverse() );

	for( let i = 0 ; i < bins.length ; i++ ){
		let test = bins[i];
		test = [...test].reverse().join("");
		if( test.length > 1 && test.slice(0,1) === "-" ){
			test = test.slice(1);
		}
		test = test.replaceAll("0","").replaceAll("1","");
		if( test.length !== 0 ){
			console.error(`Parameter ${i+1} is invalid.`);
			return null;
		}
	}

	let ret = bins[0];
	bins = bins.slice(1);

	const _AddBinary = function(num){

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
				retIsNegative && numIsNegative
			) || (
				retIsNegative && !numIsNegative && greater === [...ret].reverse().join("")
			) || (
				!retIsNegative && numIsNegative && greater === [...num].reverse().join("")
			)
		){
			negativeResult = true;
		} else {
			negativeResult = false;
		}

		let carry = 0;
		for( let i = 0 ; i < Math.max(ret.length , num.length) ; i++ ){
			if( !retIsNegative && numIsNegative ){
				ret = [...SubtractBinary( [...ret].reverse().join(""), [...num].reverse().join("") ).split("")].reverse();
				if( ret[ret.length-1] === "-" ){
					ret.pop();
				}
				break;
			} else if( retIsNegative && !numIsNegative ){
				ret = [...SubtractBinary( [...num].reverse().join(""), [...ret].reverse().join("") ).split("")].reverse();
				if( ret[ret.length-1] === "-" ){
					ret.pop();
				}
				break;
			} else {
				let sum = (carry + parseInt(num[i] ?? 0) + parseInt(ret[i] ?? 0)).toString(2).split("").reverse();
				ret[i] = sum[0];
				carry = sum[1] ? parseInt(sum.slice(1).reverse().join(""),2) : 0;
			}
		}
		if( carry === 1 ){
			ret.push("1");
		}
		while( ret[ret.length-1] === "0" && ret.length > 1 ){
			ret = ret.slice(0,ret.length-1);
		}
		if( negativeResult ){
			ret.push("-");
		}
	}

	bins.map( bin => _AddBinary(bin) );

	return ret.reverse().join("");
};
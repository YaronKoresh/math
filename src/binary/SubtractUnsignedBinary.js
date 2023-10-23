import { Greater } from "../basic/Greater.js";
import { AddBinary } from "./AddBinary.js";

export const SubtractUnsignedBinary = function(...bins) {

	bins = bins.flat();

	if( bins.length < 2 ){
		return null;
	}

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

	const _SubtractBinary = function(bin){

		let negativeResult = null;
		let retIsNegative = null;
		let binIsNegative = null;

		let greater = null;

		greater = Greater( [...ret].reverse().join(""), 0 );
		if( greater === "0" ){
			retIsNegative = true;
			ret = ret.slice( 0, ret.length-1 );
		} else {
			retIsNegative = false;
		}

		greater = Greater( [...bin].reverse().join(""), 0 );
		if( greater === "0" ){
			binIsNegative = true;
			bin = bin.slice( 0, bin.length-1 );
		} else {
			binIsNegative = false;
		}

		greater = Greater( [...ret].reverse().join(""), [...bin].reverse().join("") );
		if(
			(
				retIsNegative && binIsNegative && greater !== [...bin].reverse().join("")
			) || (
				retIsNegative && !binIsNegative
			) || (
				!retIsNegative && !binIsNegative && greater === [...bin].reverse().join("")
			)
		){
			negativeResult = true;
		} else {
			negativeResult = false;
		}

		if( greater === [...bin].reverse().join("") ){
			let _bin = bin;
			bin = ret;
			ret = _bin;
		}

		let carry = 0;
		for( let i = 0 ; i < Math.max(ret.length , bin.length) ; i++ ){
			if(
				(!retIsNegative && binIsNegative) ||
				(retIsNegative && !binIsNegative)
			){
				ret = [...AddBinary( [...ret].reverse().join(""), [...bin].reverse().join("") ).split("")].reverse();
				break;
			} else {
				let diff = [...( parseInt(ret[i] ?? 0) - carry - parseInt(bin[i] ?? 0) ).toString().split("")].reverse().join("");
				ret[i] = diff === "-2" ? "0" : diff === "-1" ? "1" : diff[0];
				carry = diff.includes("-") ? 1 : 0;
			}
		}
		while( ret[ret.length-1] === "0" && ret.length > 1 ){
			ret = ret.slice(0,ret.length-1);
		}
		if( negativeResult ){
			ret.push("-");
		}
	}
	bins.map( bin => _SubtractBinary(bin) );
	return ret.reverse().join("");
};
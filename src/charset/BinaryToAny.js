import { Split } from "../utils/Split.js";
import { Power } from "../basic/Power.js";
import { Add } from "../basic/Add.js";
import { FromDecimal } from "./FromDecimal.js";

export const BinaryToAny = function(bin,charset = null){

	bin = bin.toString();

	if( charset === null ){
		let bins = Split( bin, 16 );
		let decimals = bins.map( b => parseInt(b,2) );
		return String.fromCodePoint([...decimals].reverse()).toString();
	}

	while( bin.slice(0,1) === "0" && bin.length > 1 ){
		bin = bin.slice(1);
	}

	let decimal = "0";
	let bins = [...bin.split("")].reverse();

	for( let i = 0 ; i < bin.length ; i++ ){
		if( bins[i] === "1" ){
			let pow = Power(2,i);
			decimal = Add(decimal,pow);
		}
	}

	return FromDecimal(decimal,charset);
};
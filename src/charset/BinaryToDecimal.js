import { Power } from "../basic/Power.js";
import { Add } from "../basic/Add.js";

export const BinaryToDecimal = function(bin){
	bin = bin.toString();
	let decimal = "0";
	let bins = [...bin.split("")].reverse();

	for( let i = 0 ; i < bin.length ; i++ ){
		if( bins[i] === "1" ){
			let pow = Power(2,i);
			decimal = Add(decimal,pow);
		}
	}

	return decimal;
}
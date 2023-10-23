import { DecimalToAny } from "../charset/DecimalToAny.js";

export const GetBit = function(num, pos) {
	num = DecimalToAny(num,"01");
	num = [...num.split("")].reverse().join("");
	num = num.slice( +pos, +pos + 1 );
	if( num === "" ){
		num = "0";
	}
	return num;
}
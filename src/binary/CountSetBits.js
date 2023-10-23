import { DecimalToAny } from "../charset/DecimalToAny.js";

export const CountSetBits = function(num) {
	return DecimalToAny(num,"01").replaceAll("0","").length;
}
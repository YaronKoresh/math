import { DecimalToAny } from "../charset/DecimalToAny.js";

export const MeasureBits = function(num){
	return DecimalToAny(num,"01").length;
}
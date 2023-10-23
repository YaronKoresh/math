import { DecimalToAny } from "../charset/DecimalToAny.js";
import { BinaryToDecimal } from "../charset/BinaryToDecimal.js";
import { Zeros } from "../utils/Zeros.js";

export const Xor = function (a, b) {
	a = DecimalToAny(a,"01");
	b = DecimalToAny(b,"01");
	a = Zeros(a,b.length);
	b = Zeros(b,a.length);
	a = a.split("");
	b = b.split("");
	let res = "";
	for( let i = "0" ; i < Math.max(a.length,b.length) ; i++ ){
		res += ( +(a[i] ?? 0) ^ +(b[i] ?? 0) ).toString();
	}
	return BinaryToDecimal(res);
}
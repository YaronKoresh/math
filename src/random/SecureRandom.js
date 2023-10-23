import { Add } from "../basic/Add.js";
import { Subtract } from "../basic/Subtract.js";
import { Mod } from "../basic/Mod.js";

export const SecureRandom = function(min = "0",max = "100"){
	min = Add(min,0);
	max = Add(max,0);
	if( min === max ){
		return min;
	}
	let len = Add(Subtract(max,min),1);
	let num = "";
	while( num.length <= len.length + 1 ){
		let bytes = new Uint32Array(10);
		num += [...crypto.getRandomValues(bytes)];
	}
	num = num.slice(0,len.length+2);
	return Add(Mod(num,len),min);
}
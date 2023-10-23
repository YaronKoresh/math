import { Mod } from "../basic/Mod.js";
import { Subtract } from "../basic/Subtract.js";

export const RoundDown = function(input,factor){
	input = input.toString();
	factor = factor.toString().replace("-","");
	let mod = Mod(input,factor).replace("-","");
	if( input.includes("-") ){
		mod = Subtract(factor,mod)
	}
	return Subtract(input, mod);
}
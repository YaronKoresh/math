import { Mod } from "../basic/Mod.js";
import { Add } from "../basic/Add.js";
import { Subtract } from "../basic/Subtract.js";

export const RoundUp = function(input,factor){
	input = input.toString();
	factor = factor.toString().replace("-","");
	let mod = Mod(input,factor).replace("-","");
	if( input.includes("-") ){
		mod = Subtract(factor,mod)
	}
	if( Add(input,0) === Add(factor,0) ){
		return Add(input,0);
	}
	return Add( Subtract(input, mod), factor );
}
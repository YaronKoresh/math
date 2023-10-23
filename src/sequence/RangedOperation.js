import { Multiply } from "../basic/Multiply.js";
import { Power } from "../basic/Power.js";
import { Add } from "../basic/Add.js";
import { Greater } from "../basic/Greater.js";

export const RangedOperation = function( end, start = "1", step = "1", action = "mul" ){

	action = action.toString().toLowerCase();

	let ret = start.toString();

	let Func = null;
	if( action === "mul" ){
		Func = Multiply;
	} else if( action === "pow" ){
		Func = Power;
	} else if( action === "add" ){
		Func = Add;
	} else {
		console.error("Error: action was not specified for a ranged math operation!");
		return;
	}

	for( let i = Add(start,step) ; Greater(i,end) !== i.toString() ; i = Add(i,step) ){
		ret = Func(ret,i);
	}

	return ret;
}
import { Greater } from "../basic/Greater.js";
import { Subtract } from "../basic/Subtract.js";
import { Add } from "../basic/Add.js";

export const Fibonacci = function(loops){

	loops = Subtract(loops,2);

	let prev = "0";
	let current = "1";

	let ret = ["0","1"];
	for( let i = "0" ; Greater(i,loops) === loops ; i = Add(i,1) ){
		current = Add(current,prev);
		prev = Subtract(current,prev);
		ret.push(current);
	}

	if( loops.includes("-") ){
		ret =  ret.slice( 0, parseInt(loops) );
	};

	return ret;
};